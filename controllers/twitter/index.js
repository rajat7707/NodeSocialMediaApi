const fetch = require('node-fetch');
const fs = require('fs');
var Twit = require('twit');

var T = new Twit({
  consumer_key: 'Uv4yDilY0JYMRuCPb0I3pWH8H', // Repartee
  consumer_secret: 'YPPdRGXg0E9ARVu24DlLACamcpSFyEWu9ohsRjAi4mG4Qgs7yo',
  access_token: '1275290800931262464-xszQ1MFgUbZdWjaI6rv8GHYD1tIeYj',
  access_token_secret: 'qgDo5Ujb16NGfAkFOB3I9274hpsU9iJPjORpO8HGrVbjE',
});

let dataChunk = [];

const tweets = (req, res) => {
  T.get('search/tweets', { q: 'ambani', count: 100 }, function (
    err,
    data,
    response
  ) {
    res.send(data);
  });
};

module.exports = { tweets };
