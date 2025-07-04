import { useState } from 'react';
import { validateSolution } from '../utils/validation';
import MarkdownRenderer from '../components/MarkdownRenderer';

const TaskPage = ({ task, formData, onSubmitSolution, onBack }) => {
  const [solution, setSolution] = useState('');
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateSolution(solution);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await onSubmitSolution(solution, file);
    } catch (error) {
      setErrors({ general: 'Failed to submit solution. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Your Learning Task</h1>
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Start
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <span className="text-blue-600 font-semibold">📚</span>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">Topic: {formData.topic}</h2>
                <p className="text-sm text-gray-600">Level: {formData.level} • Time: {formData.timeLimit} minutes</p>
              </div>
            </div>
            <MarkdownRenderer markdownText={task} />
            {/*             
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {task}
              </div>
            </div>
          */}
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-600 text-sm">{errors.general}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Solution
              </label>
              <textarea
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                rows={8}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.solution ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Describe your solution, what you learned, or paste your code here..."
              />
              {errors.solution && (
                <p className="text-red-500 text-sm mt-1">{errors.solution}</p>
              )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File (Optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              {file && (
                <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>
              )}
            </div> */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Getting Feedback...' : 'Submit Solution'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;