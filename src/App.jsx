import { useState } from 'react';
import StartPage from './pages/StartPage';
import TaskPage from './pages/TaskPage';
import FeedbackPage from './pages/FeedbackPage';
import { generateLearningTask, provideFeedback } from './services/openai';

function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [formData, setFormData] = useState(null);
  const [task, setTask] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleStartSubmit = async (data) => {
    setFormData(data);
    const generatedTask = await generateLearningTask(data.topic, data.level, data.timeLimit);
    setTask(generatedTask);
    setCurrentPage('task');
  };

  const handleSolutionSubmit = async (solution, file) => {
    const generatedFeedback = await provideFeedback(task, solution);
    console.log(generatedFeedback);
    
    setFeedback(generatedFeedback);
    setCurrentPage('feedback');
  };

  const handleStartNew = () => {
    setCurrentPage('start');
    setFormData(null);
    setTask('');
    setFeedback('');
  };

  const handleBack = () => {
    setCurrentPage('start');
  };

  return (
    <div className="App">
      {currentPage === 'start' && (
        <StartPage onSubmit={handleStartSubmit} />
      )}
      {currentPage === 'task' && (
        <TaskPage
          task={task}
          formData={formData}
          onSubmitSolution={handleSolutionSubmit}
          onBack={handleBack}
        />
      )}
      {currentPage === 'feedback' && (
        <FeedbackPage
          feedback={feedback}
          onStartNew={handleStartNew}
        />
      )}
    </div>
  );
}

export default App;