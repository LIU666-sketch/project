import React from 'react';
import { Brain } from 'lucide-react';
import { useProblemStore } from '../store/problemStore';

export default function PracticePage() {
  const { problems, loading } = useProblemStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-2 text-indigo-600" />
            智能练习
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">加载题目中...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {problems.map((problem) => (
              <div key={problem.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{problem.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                    {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{problem.description.slice(0, 200)}...</p>
                <button 
                  onClick={() => window.location.href = `/problem/${problem.id}`}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  开始解题
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}