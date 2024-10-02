const express=require('express');
const router=express.Router();
const users=require('../controllers/users')
const User=require('../models/User')

router.route('/')
    .get(users.renderHome)

router.route('/register')
    .get(users.renderSignInForm)
    .post(users.register)

router.route('/login')
    .get(users.renderLoginForm)
    .post(users.login)

router.route('/logout')
    .get(users.logout)

module.exports=router