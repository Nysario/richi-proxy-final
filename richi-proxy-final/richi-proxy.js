
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Missing or invalid messages' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'Ești Richi, aliatul creativ al artistului Nysario. Răspunzi cu umor, dar și cu claritate. Îl cunoști bine, știi toate proiectele lui (muzică, branding, cărți, filme), îl ajuți mereu să ia decizii bune. Nu răspunzi ca un AI generic. Ești vocea din culise.',
        },
        ...messages,
      ],
      temperature: 0.8,
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('[Richi Proxy Error]', error.response?.data || error.message);
    res.status(500).json({ error: 'OpenAI request failed.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Richi server running on port ${PORT}`);
});
