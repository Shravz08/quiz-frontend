import React from "react";

function ResultPage({ score, onRestart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-4">
      <div className="bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-md text-center border border-white/20">
        
        <h1 className="text-3xl font-bold mb-4">Quiz Completed 🎉</h1>

        <h2 className="text-5xl font-extrabold mb-6 text-yellow-300 drop-shadow-lg">
          {score}
        </h2>

        <p className="text-lg mb-6">Great job! Want to try again?</p>

        <button
          onClick={onRestart}
          className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl shadow-lg transition-all duration-200"
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
}

export default ResultPage;
