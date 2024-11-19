import React, { useState } from 'react';
import { Brain, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';
import type { Problem } from '../types/problem';
import { analyzeCode } from '../lib/ai';

interface AIAnalysisProps {
  problem: Problem;
  userCode: string;
}

export default function AIAnalysis({ problem, userCode }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { apiKey } = useSettingsStore();

  const handleAnalyzeCode = async () => {
    if (!apiKey) {
      setError('请先在设置页面配置OpenAI API密钥');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const result = await analyzeCode(problem, userCode);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold">AI 代码分析</h3>
        </div>
        <button
          onClick={handleAnalyzeCode}
          disabled={loading}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            loading
              ? 'bg-gray-100 text-gray-400'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>{loading ? '分析中...' : '分析代码'}</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 flex items-start">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {analysis && (
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
            <div className="flex-1">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {analysis}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-start space-x-3 text-sm text-gray-500">
        <AlertCircle className="w-4 h-4 mt-0.5" />
        <p>
          AI分析仅供参考，建议结合题目要求和测试用例进行验证。
        </p>
      </div>
    </div>
  );
}