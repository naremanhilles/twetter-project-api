const express = require('express');
const {
    sign_up, login, activate, logout
} = require('./auth');
const { createTweat, deleteTweat, viewTweat } = require('./tweat')
const {
    sign_up_schema,
    login_schema,
    tweat_schema
} = require('../validation/');
const {
    celebrate
} = require('celebrate');
const verifyToken = require('../middleware/verfiyToken')
const router = express.Router();

router.post('/signup', celebrate(sign_up_schema), sign_up);
router.post('/login', celebrate(login_schema), login);
router.get('/activate-user/:id', activate);
router.post('/tweat', verifyToken, celebrate(tweat_schema), createTweat)
router.get('/tweats', viewTweat);
router.delete('/tweat/:id', verifyToken, deleteTweat);
router.post('/logout', logout)


module.exports = router;