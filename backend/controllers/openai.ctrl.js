const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.API_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);

const chat = async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: 'gpt-4',
    prompt: prompt,
  });
  res.send(completion.data.choices[0].text);
};

module.exports = { chat };
