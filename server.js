require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { WebClient } = require('@slack/web-api');
const slack = new WebClient(process.env.SLACK_AUTH_TOKEN)

const fetchChannels = async () => {
    console.log('fetchChannels')

    const response = await slack.channels.list()

    console.log('response.channels')
    console.log(response.channels)

    return response.channels
}

app.get('/testSlackBot', async (req, res) => {
    console.log('testSlackBot')

    const channels = await fetchChannels()

    res.json({
        message: 'Test success',
        data: channels
    })
})

app.listen(port, () => {
    console.log('Bot is listening on port ' + port);
    // fetchChannels()
});