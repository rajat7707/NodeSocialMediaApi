const fetch = require('node-fetch');
const context = require('../config');

// Get the user access token
const userAccessToken = async (req, res) => {
  const { baseUrl } = context;
  const appId = process.env.APP_ID;
  const appSecret = process.env.APP_SECRET;
  // api endoint
  // https://graph.facebook.com/oauth/access_token?client_id={YOUR_APP_ID}&client_secret={YOUR_SECRET}&grant_type=client_credentials
  const response = await fetch(
    `${baseUrl}/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`
  );
  const accessToken = await response.json();
  res.send(accessToken);
};

module.exports = { userAccessToken };
