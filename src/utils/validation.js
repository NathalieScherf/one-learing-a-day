import validator from 'validator';

export const validateStartPageInput = (topic, level, timeLimit) => {
  const errors = {};
  topic = topic ? validator.escape(topic).trim() : '';

  if (topic.length === 0) {
    errors.topic = 'Topic is required';
  } else if (topic.length < 3) {
    errors.topic = 'Topic must be at least 3 characters';
  } else if (topic.length > 100) {
    errors.topic = 'Topic must be less than 100 characters';
  }

  if (!level) {
    errors.level = 'Level is required';
  }

  if (!timeLimit || !validator.isInt(timeLimit.toString(), { min: 5, max: 120 })) {
    errors.timeLimit = 'Time limit must be between 5 and 120 minutes';
  }

  return {
    topic,
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateSolution = (solution) => {
  const errors = {};
  solution = solution ? solution.trim() : '';

  if (solution.length === 0) {
    errors.solution = 'Solution is required';
  } else if (solution.length < 10) {
    errors.solution = 'Solution must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};