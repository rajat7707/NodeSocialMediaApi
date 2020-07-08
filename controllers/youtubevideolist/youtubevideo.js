const fetch = require('node-fetch');
const fs = require('fs');
const { youTubeUrl, youtubeKey } = require('../../config');

let dataChunk = [];

const getTopVideosByChannelId = async (req, res) => {

  //https://www.googleapis.com/youtube/v3/search?key=AIzaSyAI8bMiqBNylXRRufIQek1aDvhm9ouyhvI&channelId=UCqwUrj10mAEsqezcItqvwEw&part=snippet,id&order=date&maxResults=20

  try {

    let response = await fetch(
      `${youTubeUrl}/search?key=${youtubeKey}&channelId=UCqwUrj10mAEsqezcItqvwEw&part=snippet,id&order=date&maxResults=20`
    );
    let data = await response.json();
    console.log('inside getUserId', data.items);
    let youTubeData = data.items ;
    return youTubeData;
  } catch (err) {
    console.log('inside catch', err);
    res.status(400).send({ msg: 'Something went wrong !', err: err });
  }
};


module.exports = { getTopVideosByChannelId };
