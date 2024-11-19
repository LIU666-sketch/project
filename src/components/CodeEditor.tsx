import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw } from 'lucide-react';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultCode?: string;
  onRun?: (code: string) => void;
}

export default function CodeEditor({
  defaultLanguage = 'javascript',
  defaultCode = '// 在这里写下你的代码',
  onRun
}: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode);

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const handleRun = () => {
    onRun?.(code);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <select 
            className="bg-gray-700 text-white px-3 py-1 rounded"
            defaultValue={defaultLanguage}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCode(defaultCode)}
            className="p-2 hover:bg-gray-700 rounded"
            title="重置代码"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleRun}
            className="bg-green-600 text-white px-4 py-1 rounded flex items-center space-x-2 hover:bg-green-700"
          >
            <Play className="w-4 h-4" />
            <span>运行</span>
          </button>
        </div>
      </div>
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage={defaultLanguage}
          value={code}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}