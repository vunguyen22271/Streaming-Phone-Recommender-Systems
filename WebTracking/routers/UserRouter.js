const router = require('express').Router();
const UserController = require('../controllers/UserControl');
const Auth = require('../middleware/Auth');
const AuthAdmin = require('../middleware/AuthAdmin')


router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/refresh_token', UserController.refreshToken)

router.get('/logout', UserController.logout)

router.get('/infor',Auth, UserController.getUser)

router.patch('/addCart', Auth, UserController.addCart)

router.get('/history', Auth, UserController.history)

router.get('/get_user', Auth, AuthAdmin, UserController.getAllUser)

module.exports = router;