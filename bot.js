import pkg from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"
const { default: makeWASocket, useMultiFileAuthState } = pkg

let lastQR = null
let lastStatus = { connected: false }

export async function startBot(io) {
    console.log('Starting bot...')
    const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    })

    sock.ev.on('creds.update', saveCreds)

    io.on('connection', (socket) => {
        console.log('Frontend connected via socket')
        if (lastQR) socket.emit('qr', lastQR)
        socket.emit('status', lastStatus)
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr) {
            lastQR = qr
            io.emit('qr', qr)
        }

        if (connection === 'open') {
            lastStatus = { connected: true }
            io.emit('status', lastStatus)
            lastQR = null // hapus qr karena sudah connect
        } else if (connection === 'close') {
            lastStatus = { connected: false }
            io.emit('status', lastStatus)
            startBot(io)
        }
    })

    return sock
}