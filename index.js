import express from 'express'
import connectDB from './config/db.js'
import authRouter from './routes/authRoutes.js'


const app = express()


// Middlewares

app.use(express.json()) // Built in middleware to parse JSON body


// Routes

app.use(authRouter)




// Connect to Database

connectDB()


app.listen(process.env.PORT , () => {
    console.log('Server running on port 5000')
})