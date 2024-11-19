import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Brain, Award, History, Settings } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

export default function Header() {
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
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="w-8 h-8" />
            <span className="text-xl font-bold">AlgoMentor</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/practice" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <Brain className="w-5 h-5" />
              <span>智能练习</span>
            </Link>
            <Link to="/competitions" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <Award className="w-5 h-5" />
              <span>竞赛真题</span>
            </Link>
            <Link to="/history" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <History className="w-5 h-5" />
              <span>学习记录</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-2 hover:text-indigo-200 transition">
              <Settings className="w-5 h-5" />
              <span>设置</span>
            </Link>
          </div>
          
          <button 
            onClick={handleStart}
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-50 transition"
          >
            {apiKey ? '开始学习' : '设置API密钥'}
          </button>
        </div>
      </nav>
    </header>
  );
}