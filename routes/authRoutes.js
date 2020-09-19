const express = require('express');
const route = express.Router();
const authController = require('../controllers/authController');

route.get('/signup', authController.signup_get)
route.post('/signup', authController.signup_post)
route.get('/login', authController.login_get)
route.post('/login', authController.login_post)

module.exports = route;