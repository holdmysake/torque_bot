import express from 'express'
import { startBot } from './bot.js'
import bot_route from './bot.route.js'

const app = express()
app.use(express.json())

app.use('', bot_route)

let sock

(async () => {
    sock = await startBot()
})()

app.listen(1717, () => {
    console.log('Server is running on port 1717')
})