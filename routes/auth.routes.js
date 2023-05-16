const express = require('express');
const router = express.Router();

// Controllers
const authControllers = require('../controllers/auth.controller');

router.post('/login',authControllers.login);
router.post('/register',authControllers.register)
router.post('/token',authControllers.resetToken)
router.get('/login',authControllers.isLogged)
router.delete('/logout/:id',authControllers.logout)

module.exports = router;