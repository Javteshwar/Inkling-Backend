const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/api/signup', authController.signUpPost);

router.post('/api/login', authController.loginPost);

router.get('/api/user-details', authController.userDetailsGet);

router.post('/api/upgrade-account', authController.upgradeAccountPost);

router.get('/api/logout', authController.logoutGet);

module.exports = router;