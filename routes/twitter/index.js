const router = require('express').Router();
const { tweets } = require('../../controllers/twitter');

router.get('/', tweets);

module.exports = router;
