import React from 'react';
import { Code, Cpu, BarChart, BookOpen, Award, Brain } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI智能推题",
      description: "根据你的答题表现，自动调整题目难度和类型"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "多语言支持",
      description: "支持C++、Java、Python等多种编程语言"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "在线编程",
      description: "集成代码编辑器，支持实时运行和测试"
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "进度追踪",
      description: "详细的学习数据分析和能力评估报告"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "知识图谱",
      description: "系统化的数据结构与算法知识体系"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "竞赛模拟",
      description: "真实竞赛环境模拟，备战蓝桥杯和CCF认证"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
          为什么选择我们的平台？
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
                <div className="text-indigo-600 mb-4 group-hover:scale-110 transition duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}