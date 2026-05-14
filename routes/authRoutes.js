import express from 'express'
import { getAllUsers, getProfile, login, signUp } from '../controllers/usersController.js'


const router = express.Router()



// METHOD + PATH + HANDLER FUNCTION

router.post('/sign-up' , signUp)
router.post('/login' , login)

// Get All users
router.get('/users' , getAllUsers)
// Get user by Id
router.get('/users/:id' , getProfile)






export default router