import axios from 'axios';
import { mockDataResponse, mockDataFeedback } from '../utils/mockdata'; // Import mock data for development

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const generateLearningTask = async (topic, level, timeLimit) => {
  try {
    if (import.meta.env.MODE === 'development') {
      return mockDataResponse.choices[0].message.content; // Use mock data in development mode
    } else {
      const response = await axios.post(API_URL
        , {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful learning assistant that creates engaging, practical learning tasks. Respond with a JSON object containing the task, instructions, and expected outcomes as fields'
            },
            {
              role: 'user',
              content: `Create a learning task for the topic "${topic}" at ${level} level that can be completed in ${timeLimit} minutes. Include clear instructions and expected outcomes.`
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content;
    }
  } catch (error) {
    console.error('Error generating task:', error);
    throw new Error('Failed to generate learning task');
  }
};

export const provideFeedback = async (task, solution) => {
  try {
    if (import.meta.env.MODE === 'development') {
      return mockDataFeedback.choices[0].message.content
    } else {
    const response = await axios.post(API_URL, {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a supportive learning coach. Provide constructive feedback, encouragement, and suggest next learning steps. Always respond in valid JSON using double quotes for keys and string values. Do not include Markdown.'
        },
        {
          role: 'user',
          content: `Original task: "${task}"\n\nUser's solution: "${solution}"\n\nPlease provide feedback in **valid JSON** with the following keys:
          - "feedback": Constructive feedback on the solution
          - "motivation": A short, supportive message
          - "nextTopics": An array of 3 related topics to learn next`
        }
      ],
      max_tokens: 400,
      temperature: 0.4
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;}
  } catch (error) {
    console.error('Error providing feedback:', error);
    throw new Error('Failed to provide feedback');
  }
};