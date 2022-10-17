const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/register',userController.createUser)
router.get('/all',userController.getAllUsers)
router.post('/login',userController.getUserByEmail)
router.patch('/update/password/:uid',userController.updatePassword)
router.patch('/update/:uid',userController.updateUser)
router.delete('/delete/:uid',userController.deleteUser)
router.get('/:uid',userController.getUserById)


module.exports = router