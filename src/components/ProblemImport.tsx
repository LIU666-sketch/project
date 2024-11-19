import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { useProblemStore } from '../store/problemStore';

export default function ProblemImport() {
  const { importProblems } = useProblemStore();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = async () => {
        const text = reader.result as string;
        try {
          // 解析题目内容
          const problemData = await analyzeProblemContent(text);
          importProblems([problemData]);
        } catch (error) {
          console.error('Error parsing problem:', error);
        }
      };
      reader.readAsText(file);
    });
  }, [importProblems]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  return (
    <div className="p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
        <p className="text-lg mb-2">拖放题目文件到这里，或点击选择文件</p>
        <p className="text-sm text-gray-500">支持 TXT、PDF、DOC、DOCX 格式</p>
      </div>

      {acceptedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">已上传的文件</h3>
          <div className="space-y-2">
            {acceptedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-500" />
                <span className="flex-1">{file.name}</span>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

async function analyzeProblemContent(content: string) {
  // 这里是示例的题目解析逻辑
  // 实际项目中，你需要调用后端API来处理文件内容
  const problem = {
    id: Date.now().toString(),
    title: "导入的题目",
    difficulty: "medium" as const,
    category: "导入题目",
    description: content.substring(0, 500), // 简单示例：取前500个字符作为描述
    examples: [
      {
        input: "示例输入",
        output: "示例输出",
        explanation: "解释"
      }
    ],
    constraints: ["约束条件1", "约束条件2"],
    templateCode: {
      javascript: "// 请在这里实现你的解决方案\n",
      python: "# 请在这里实现你的解决方案\n",
      cpp: "// 请在这里实现你的解决方案\n"
    },
    testCases: [
      {
        input: "测试输入",
        expectedOutput: "期望输出"
      }
    ]
  };

  return problem;
}