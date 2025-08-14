import express from 'express'
import cors from 'cors'
import { startBot } from './bot.js'
import bot_route from './bot.route.js'

const app = express()
app.use(express.json())

app.use('', bot_route)
app.use(cors())

let sock

(async () => {
    sock = await startBot()
})()

app.listen(1717, () => {
    console.log('Server is running on port 1717')
})

// app.listen(1717, '127.0.0.1', () => {
//     console.log('Server is running on http://127.0.0.1:1717')
// })