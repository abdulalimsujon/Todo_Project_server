const express = require('express')
const ProfileController = require('../controller/profileController')
const authVerifyMiddleware = require('../middleware/authVerifymiddleware')

const router = express.Router()


router.post('/CreateProfile', ProfileController.CreateProfile)
router.post('/UserLogin', ProfileController.UserLogin)
router.get('/getprofile', authVerifyMiddleware, ProfileController.UserProfile)
router.post('/profileupdate', authVerifyMiddleware, ProfileController.UpdateProfile)

module.exports = router;