const router = require('express').Router();
const {
  getTopVideosByChannelId,
} = require('../../controllers/youtubevideolist/youtubevideo.js');


router.get('/getTopVideosByChannelId', getTopVideosByChannelId);

module.exports = router;
