import express from 'express'
import { getLatestQR } from './bot.js'

const router = express.Router()

router.post('/scanQR', async (req, res) => {
    try {
        const qr = getLatestQR()
        if (!qr) {
            return res.status(404).json({ message: 'No QR available' })
        }
        res.json({ qr })
    } catch (error) {
        console.error({ message: error.message })
    }
})

export default router