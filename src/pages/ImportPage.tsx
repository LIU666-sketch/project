import React from 'react';
import ProblemImport from '../components/ProblemImport';

export default function ImportPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">导入竞赛题目</h1>
        <div className="bg-white rounded-lg shadow-lg">
          <ProblemImport />
        </div>
      </div>
    </div>
  );
}