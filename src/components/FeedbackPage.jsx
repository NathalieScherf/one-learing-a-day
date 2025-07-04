const FeedbackPage = ({ feedback, onStartNew }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Great Work!</h1>
            <p className="text-gray-600">Here's your personalized feedback</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6 mb-8">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                <p>
                {feedback.feedback}</p>
                <p>{feedback.motivation}</p>
                <p>Next topics:</p>
                <ul>{feedback.nextTopics.map((topic, index) => <li key={index}>{topic}</li>)}</ul>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={onStartNew}
              className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              Start New Learning Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;