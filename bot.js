import pkg from "@whiskeysockets/baileys"
import qrcode from "qrcode-terminal"

const { default: makeWASocket, useMultiFileAuthState } = pkg

let latestQR = null

export async function startBot() {
    console.log('Starting bot...')
    const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth')

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update
        if (qr) {
            latestQR = qr
            // qrcode.generate(qr, { small: true })
        }

        if (connection === 'open') {
            latestQR = null
            console.log('Bot is connected')
        } else if (connection === 'close') {
            console.log('Connection closed:', lastDisconnect?.error)
            startBot()
        }
    })

    return sock
}

export function getLatestQR() {
    return latestQR
}