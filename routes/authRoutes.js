import express from 'express'
import { deactivate, getAllUsers, getProfile, login, signUp } from '../controllers/usersController.js'
import { protect } from '../middlewares/auth.js'
import { roleCheck } from '../middlewares/access.js'

const router = express.Router()



// METHOD + PATH + HANDLER FUNCTION

// PRIVATE ROUTES (User need to be authenticated ====> jwt)
// Get All users
router.get('/users', protect , roleCheck  , getAllUsers) // protect for authentication / roleCheck for authorization
// Get user by Id
router.get('/me' , protect ,  getProfile)

router.put('/users/:id/deactivate', protect , roleCheck , deactivate)

// PUBLIC ROUTES
router.post('/sign-up' , signUp)
router.post('/login' , login)

export default router