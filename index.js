import express from 'express'
import http from 'http'
import cors from 'cors'
import { startBot } from './bot.js'
import { Server } from 'socket.io'
import bot from 'bot.route.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', bot)

const server = http.createServer(app)
const io = new Server(server, {
    cors: { origin: '*' },
    path: '/ws'
})

startBot(io)

server.listen(1717, () => {
    console.log('Server is running on port 1717')
})

// app.listen(1717, () => {
//     console.log('Server is running on port 1717')
// })

// app.listen(1717, '127.0.0.1', () => {
//     console.log('Server is running on http://127.0.0.1:1717')
// })