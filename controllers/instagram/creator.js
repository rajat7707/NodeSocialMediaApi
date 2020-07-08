const fetch = require('node-fetch');
const fs = require('fs');
const { baseUrl } = require('../../config');

let dataChunk = [];

const getUserId = async (accessToken) => {
  try {
    //   @api endpoint to get instagram account ID
    //  "https://graph.facebook.com/v7.0/me/accounts?access_token={ACCESS_TOKEN}"
    let response = await fetch(
      `${baseUrl}/me/accounts?fields=connected_instagram_account&access_token=${accessToken}`
    );
    let data = await response.json();
    const accountId = data.data[0].connected_instagram_account.id;
    console.log('inside getUserId', accountId);
    return accountId;
  } catch (err) {
    console.log('inside catch', err);
    res.status(400).send({ msg: 'Something went wrong !', err: err });
  }
};

// get data related to that business/creator
const businessCreator = async (req, res) => {
  const { accessToken } = req.body;

  const fields =
    'biography,followers_count,follows_count,id,ig_id,media_count,name,profile_picture_url,username,website,media,recently_searched_hashtags,stories';

  try {
    const accountId = await getUserId(accessToken);

    // @api endpoint to get data using instagram user id
    // graph.facebook.com/v7.0/{INSTAGRAM_ID}?fields={DATA_FIELDS}&access_token={ACCESS_TOKEN}
    response = await fetch(
      `${baseUrl}/${accountId}?fields=${fields}&access_token=${accessToken}`
    );
    data = await response.json();

    fs.writeFile(
      'data/instagram/user.json',
      JSON.stringify(data, null, 2),
      (err) => {
        if (err) console.log(err);
        else console.log('Written to file !');
      }
    );

    res.send(data);
  } catch (err) {
    res.status(400).send({ msg: 'Something went wrong !', err: err });
  }
};

// get data about other businesses
const businessDiscovery = async (req, res) => {
  const { accessToken, businessName } = req.body;

  const fields = `business_discovery.username(${businessName}){biography,followers_count,follows_count,id,ig_id,media_count,name,profile_picture_url,username,website,media{caption,media_url,media_type,like_count,comments_count,timestamp,owner,permalink,id},recently_searched_hashtags}`;

  try {
    const accountId = await getUserId(accessToken);

    // @api endpoint to get data for other business
    // graph.facebook.com/v7.0/{INSTAGRAM_USER_ID}?fields=business_discovery.username({BUSINESS_NAME}){FIELDS}&access_token={ACCESS_TOKEN}
    let response = await fetch(
      `${baseUrl}/${accountId}?fields=${fields}&access_token=${accessToken}`
    );
    let data = await response.json();

    // if (data.error.message) {
    //   res.send(data.error.message);
    //   return;
    // }

    const file = fs.readFileSync(
      'data/instagram/businessDiscovery.json',
      'utf-8'
    );

    if (file) dataChunk.push(file);

    data = JSON.stringify(data, null, 2);
    dataChunk.push(data);

    fs.writeFile('data/instagram/businessDiscovery.json', dataChunk, (err) => {
      if (err) console.log(err);
      else console.log('Written to file !');
    });

    res.send(dataChunk);
  } catch (err) {
    res.status(400).send({ msg: 'Something went wrong !', err: err });
  }
};

module.exports = { businessCreator, businessDiscovery };
