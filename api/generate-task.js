import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
import { mockDataResponse } from './mockdata.js' //  mock data for development

export const generateTaskHandler = async (req, res) => {
  try {
     if (process.env.MODE === 'development') {
          let task = mockDataResponse.choices[0].message.content;
      res.json({ task }) // Use mock data in development mode
    } else {
    const { topic, level, timeLimit } = req.body;

    // Validate input
    if (!topic || !level || !timeLimit) {
      return res.status(400).json({ 
        error: 'Missing required fields: topic, level, timeLimit' 
      });
    }

    const response = await axios.post(OPENAI_API_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful learning assistant that creates engaging, practical learning tasks. Respond with a JSON object containing the task, instructions, and expected outcomes as fields.'
        },
        {
          role: 'user',
          content: `Create a learning task for the topic "${topic}" at ${level} level that can be completed in ${timeLimit} minutes. Include clear instructions and expected outcomes.`
        }
      ],
      max_tokens: 500,
      temperature: 0.4
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const task = response.data.choices[0].message.content;
    res.json({ task });
  }
  } catch (error) {
    console.error('Error generating task:', error);
    
    if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    res.status(500).json({ error: 'Failed to generate learning task' });
  }
};