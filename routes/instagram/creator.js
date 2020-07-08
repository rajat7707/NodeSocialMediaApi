const router = require('express').Router();
const {
  businessCreator,
  businessDiscovery,
} = require('../../controllers/instagram/creator');

// get data for logged in business/creator profile
// pass - accessToken
router.post('/creator', businessCreator);

// get data for other business/creator profiles
// pass - accessToken, businessName
router.post('/businessDiscovery', businessDiscovery);

module.exports = router;
