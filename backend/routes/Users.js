const express = require('express');
const cors = require('cors');
const router = express.Router();
const authCtrl = require('../controllers/authController');

router.use(cors());

// Register
router.post('/register', authCtrl.register);

// Login
router.post('/login', authCtrl.login);

// Profile
router.get('/profile', authCtrl.profile);

module.exports = router;