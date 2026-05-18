import express from 'express'
import { getAllUsers, getProfile, login, signUp } from '../controllers/usersController.js'
import { protect } from '../middlewares/auth.js'

const router = express.Router()



// METHOD + PATH + HANDLER FUNCTION

// PUBLIC ROUTES
router.post('/sign-up' , signUp)
router.post('/login' , login)



// PRIVATE ROUTES (User need to be authenticated ====> jwt)
// Get All users
router.get('/users'  , getAllUsers)
// Get user by Id
router.get('/me' , protect ,  getProfile)






export default router