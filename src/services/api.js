import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const generateLearningTask = async (topic, level, timeLimit) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/generate-task`, {
      topic,
      level,
      timeLimit
    });

    return response.data.task;
  } catch (error) {
    console.error('Error generating task:', error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error('Failed to generate learning task');
  }
};

export const provideFeedback = async (task, solution) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/provide-feedback`, {
      task,
      solution
    });

    return response.data.feedback;
  } catch (error) {
    console.error('Error providing feedback:', error);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error('Failed to provide feedback');
  }
};