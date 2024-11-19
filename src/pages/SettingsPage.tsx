import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Save, AlertCircle } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { apiKey, setApiKey } = useSettingsStore();
  const [key, setKey] = useState(apiKey || '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      setError('请输入API密钥');
      return;
    }

    try {
      setApiKey(key.trim());
      navigate('/practice');
    } catch (err) {
      setError('保存设置失败，请重试');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 flex items-center">
            <Key className="w-6 h-6 mr-2" />
            API设置
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                OpenAI API密钥
              </label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="sk-..."
              />
              <p className="mt-2 text-sm text-gray-500">
                你的API密钥将安全地存储在本地，不会上传到服务器
              </p>
            </div>

            {error && (
              <div className="mb-4 flex items-center text-red-600">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              保存设置
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">如何获取API密钥？</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>访问 OpenAI 的API密钥页面</li>
              <li>登录或注册OpenAI账号</li>
              <li>在API设置中创建新的密钥</li>
              <li>复制密钥并粘贴到上面的输入框中</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}