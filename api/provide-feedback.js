import axios from 'axios';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
import { mockDataFeedback } from './mockdata.js'
export const provideFeedbackHandler = async (req, res) => {
  try {
    if (process.env.MODE === 'development') {
      let feedback = mockDataFeedback.choices[0].message.content;
      res.json({ feedback }) 
    } else {
      const { task, solution } = req.body;

      // Validate input
      if (!task || !solution) {
        return res.status(400).json({
          error: 'Missing required fields: task, solution'
        });
      }

      const response = await axios.post(OPENAI_API_URL, {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a supportive learning coach. Provide constructive feedback, encouragement, and suggest next learning steps. Always respond in valid JSON using double quotes for keys and string values. Do not include Markdown.'
          },
          {
            role: 'user',
            content:  `Original task: "${task}"\n\nUser's solution: "${solution}"\n\nPlease provide feedback in **valid JSON** with the following keys:
          - "feedback": Constructive feedback on the solution
          - "motivation": A short, supportive message
          - "nextTopics": An array of 3 related topics to learn next`
          }
        ],
        max_tokens: 400,
        temperature: 0.4
      }, {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const feedback = response.data.choices[0].message.content;
      res.json({ feedback });
    }
  } catch (error) {
    console.error('Error providing feedback:', error);

    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }

    res.status(500).json({ error: 'Failed to provide feedback' });
  }
};