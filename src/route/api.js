const express = require('express')
const ProfileController = require('../controller/profileController')
const authVerifyMiddleware = require('../middleware/authVerifymiddleware')
const todoListController = require('../controller/todoListController')

const router = express.Router()


router.post('/CreateProfile', ProfileController.CreateProfile)
router.post('/UserLogin', ProfileController.UserLogin)
router.get('/getprofile', authVerifyMiddleware, ProfileController.UserProfile)
router.post('/profileupdate', authVerifyMiddleware, ProfileController.UpdateProfile)



// todo api

router.post('/createtodo', authVerifyMiddleware, todoListController.createTodo)
router.get('/selectTodo', authVerifyMiddleware, todoListController.selectTodo)
router.post('/updateTodo/:id', authVerifyMiddleware, todoListController.updateTodo)
router.post('/updateTodoStatus/:id', authVerifyMiddleware, todoListController.updateTodoStatus)
router.get('/selectTodobydate', authVerifyMiddleware, todoListController.selectTodobydate)
router.post('/deleteTodo/:id', authVerifyMiddleware, todoListController.RemoveTodo)




module.exports = router;