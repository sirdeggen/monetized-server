import express from 'express'
import dotenv from 'dotenv'
import { createAuthMiddleware } from '@bsv/auth-express-middleware'
import { createPaymentMiddleware } from '@bsv/payment-express-middleware'
import { ProtoWallet, PrivateKey } from '@bsv/sdk'
dotenv.config()

const { WEATHER_KEY, PRIVATE_KEY } = process.env

// 1. Create a BSV wallet that can manage transactions
const key = PrivateKey.fromWif(PRIVATE_KEY as string)
const wallet = new ProtoWallet(key)

// 2. Create the Auth middleware (BRC-103/104)
const auth = createAuthMiddleware({ wallet })

// 3. Create the Payment middleware
const monetization = createPaymentMiddleware({ 
  wallet,
  calculateRequestPrice: async (req) => {
    // e.g., 1 satoshis per request
    return 1
  }
})

const app = express()
const port = 3000

app.use(express.json())

app.use(auth)
// app.use(monetization)

app.get('/weather/:city', async (req, res) => {
    try {
        const city = req.params.city
        const data = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_KEY}`)).json()
        res.json(data)
    } catch (error) {
        console.log({ error })
        res.status(500).json({ error: 'Failed to fetch temperature' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})