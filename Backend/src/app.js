import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { Transaction } from './models/transaction.model.js'
import { User } from './models/user.model.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

// Router
app.use("/api/v1", Transaction);
app.use("/api/auth", User);

export { app }

