import React from 'react';
import { Award, Upload } from 'lucide-react';

export default function CompetitionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Award className="w-8 h-8 mr-2 text-indigo-600" />
            竞赛真题
          </h1>
          <button 
            onClick={() => window.location.href = '/import'}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            导入题目
          </button>
        </div>

        <div className="grid gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">蓝桥杯</h2>
            <div className="grid gap-4">
              <CompetitionCard 
                title="第十四届蓝桥杯省赛" 
                count={10}
                difficulty="中等"
              />
              <CompetitionCard 
                title="第十四届蓝桥杯国赛" 
                count={5}
                difficulty="困难"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">CCF认证</h2>
            <div className="grid gap-4">
              <CompetitionCard 
                title="2023年CCF认证第一次考试" 
                count={8}
                difficulty="中等"
              />
              <CompetitionCard 
                title="2023年CCF认证第二次考试" 
                count={8}
                difficulty="困难"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CompetitionCardProps {
  title: string;
  count: number;
  difficulty: string;
}

function CompetitionCard({ title, count, difficulty }: CompetitionCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:border-indigo-500 transition cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">{count}题</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">难度：{difficulty}</span>
        <span className="text-indigo-600">开始练习 →</span>
      </div>
    </div>
  );
}