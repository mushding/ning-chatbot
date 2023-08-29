const express = require("express");
const line = require('@line/bot-sdk');
const OpenAI = require('openai');

const openai = new OpenAI.OpenAI({
  apiKey: process.env["OPENAI_KEY"]
});

const config = {
    channelAccessToken: "tG3RZG8g4r/DVXLbl7iu2n62qEb6yMs6MH7c1AiQS6WsRlSB8H/8iNDmanZn8/KkWDLTfsR6ktcL4ZRZlxZTng0ASDu6x3ScefOrwM+syNiteFuezI4+IKy1bMKakABIHioWbemODd96am6OBnuEYgdB04t89/1O/w1cDnyilFU=",
    channelSecret: 'ad9a0a6c1baf3024941d8c1e6452d7e2'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
const handleEvent = async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: event.message.text }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices);

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: completion.choices[0].message.content
  });
}

app.listen(8083);