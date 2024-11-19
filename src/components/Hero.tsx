import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Target, Trophy, BookOpen } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

export default function Hero() {
  const navigate = useNavigate();
  const { apiKey } = useSettingsStore();

  const handleStart = () => {
    if (!apiKey) {
      navigate('/settings');
    } else {
      navigate('/practice');
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI驱动的算法学习平台
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            根据你的编程水平智能推荐题目，从入门到精通的个性化学习之旅
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-indigo-600 mb-4">
                <Sparkles className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI智能出题</h3>
              <p className="text-gray-600">根据你的水平动态调整题目难度</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-indigo-600 mb-4">
                <Target className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">竞赛真题</h3>
              <p className="text-gray-600">蓝桥杯、CCF认证等真题练习</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-indigo-600 mb-4">
                <Trophy className="w-8 h-8 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold mb-2">能力评估</h3>
              <p className="text-gray-600">实时追踪学习进度和能力提升</p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleStart}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 transition flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              {apiKey ? '开始练习' : '设置API密钥'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}