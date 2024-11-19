import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProblemStore } from '../store/problemStore';
import CodeEditor from '../components/CodeEditor';
import ProblemDescription from '../components/ProblemDescription';
import AIAnalysis from '../components/AIAnalysis';

export default function ProblemPage() {
  const { problemId } = useParams();
  const { currentProblem, problems, fetchProblems, setCurrentProblem } = useProblemStore();
  const [code, setCode] = useState('');

  useEffect(() => {
    if (problems.length === 0) {
      fetchProblems();
    }
  }, [fetchProblems, problems.length]);

  useEffect(() => {
    if (problems.length > 0 && problemId) {
      const problem = problems.find(p => p.id === problemId);
      if (problem) {
        setCurrentProblem(problem);
        setCode(problem.templateCode.javascript);
      }
    }
  }, [problemId, problems, setCurrentProblem]);

  if (!currentProblem) {
    return <div className="flex items-center justify-center h-screen">加载中...</div>;
  }

  const handleRunCode = (newCode: string) => {
    setCode(newCode);
    // TODO: Implement code execution logic
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 border-r overflow-auto">
        <ProblemDescription problem={currentProblem} />
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="flex-1">
          <CodeEditor
            defaultLanguage="javascript"
            defaultCode={currentProblem.templateCode.javascript}
            onRun={handleRunCode}
          />
        </div>
        <AIAnalysis problem={currentProblem} userCode={code} />
      </div>
    </div>
  );
}