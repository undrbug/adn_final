import express from 'express'
import {userRegister, userLogin} from '../controllers/user.controller.js'

const router = express.Router()

router.post('/register', userRegister)
router.get('/login', userLogin)

export default router


