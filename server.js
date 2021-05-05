import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bootcampRoute from './routes/bootcamps.route.js'

dotenv.config({ path: './config/config.env' })
const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/bootcamps', bootcampRoute)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
