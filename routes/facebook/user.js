const router = require('express').Router();
const { userPages } = require('../../controllers/facebook/user');

router.get('/pages', userPages);

module.exports = router;
