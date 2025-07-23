import dotenv from 'dotenv'
import connectDB from "./db/index.js"
import { app } from '../src/app.js'

dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 3000

connectDB()
    .then(() => {
        app.on('error', (error) => {
            console.log('Error:', error)
            throw error
        })
        app.listen(port, () => {
            console.log(`server is listening at port : ${port}`)
        })
    })
    .catch((error) => {
        console.log('MONGOBD Connection Failed!!', error)
    })