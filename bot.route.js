import express from 'express'
import { disconnectBot } from './bot.js'

const router = express.Router()

router.post('/stop', async (req, res) => {
    await disconnectBot()
    res.json({ message: 'Bot disconnected' })
})

export default router