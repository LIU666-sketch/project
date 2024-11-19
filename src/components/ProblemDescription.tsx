import React from 'react';
import type { Problem } from '../types/problem';

interface ProblemDescriptionProps {
  problem: Problem;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'}`}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </span>
        </div>

        <div className="prose prose-indigo max-w-none">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">题目描述</h3>
            <p className="text-gray-700">{problem.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">示例</h3>
            {problem.examples.map((example, index) => (
              <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <span className="font-medium">输入：</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">{example.input}</code>
                </div>
                <div className="mb-2">
                  <span className="font-medium">输出：</span>
                  <code className="bg-gray-100 px-2 py-1 rounded">{example.output}</code>
                </div>
                {example.explanation && (
                  <div>
                    <span className="font-medium">解释：</span>
                    <span className="text-gray-700">{example.explanation}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">提示与约束</h3>
            <ul className="list-disc pl-5">
              {problem.constraints.map((constraint, index) => (
                <li key={index} className="text-gray-700">{constraint}</li>
              ))}
            </ul>
          </div>

          {problem.source && (
            <div>
              <h3 className="text-lg font-semibold mb-2">来源</h3>
              <p className="text-gray-700">{problem.source}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}