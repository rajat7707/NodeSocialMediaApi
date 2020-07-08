const router = require('express').Router();
const { userAccessToken } = require('../controllers');

router.get('/user', userAccessToken);

module.exports = router;
