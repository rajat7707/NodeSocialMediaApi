const express = require('express');
const cors = require('cors');

require('dotenv/config');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/accessToken', require('./routes'));
app.use('/facebook', require('./routes/facebook/user'));
app.use('/instagram', require('./routes/instagram/creator'));
app.use('/twitter', require('./routes/twitter'));
app.use('/youtube', require('./routes/youtube/youtubevideolist'));

// PORT
const PORT = 5000 | process.env.PORT;

app.listen(PORT, () => console.log(`Process running on port ${PORT}`));
