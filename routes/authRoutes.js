const {Router} = require('express')
const authController = require('../controllers/authController')

const router = Router();

// routes
router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.post('/logout', authController.logout_get);

// router.post('/forgot-password', forgotPassword);

module.exports= router;
