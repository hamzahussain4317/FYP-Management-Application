const express=require('express');
const router = express.Router()
const authControllers = require('../controllers/authController.js')


router.post('/signup',authControllers.signUp);

router.post('/signin',authControllers.signIn);

module.exports = router;
