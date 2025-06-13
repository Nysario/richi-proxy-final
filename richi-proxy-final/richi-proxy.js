
import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatResponse = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-4o'
    });

    const reply = chatResponse.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Eroare în /chat:', error);
    res.status(500).json({ error: 'Eroare server' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Richi Proxy rulează pe portul ${PORT}`);
});
