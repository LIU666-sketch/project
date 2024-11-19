import OpenAI from 'openai';
import type { Problem, UserSubmission } from '../types/problem';
import { useSettingsStore } from '../store/settingsStore';

function getOpenAIClient() {
  const apiKey = useSettingsStore.getState().apiKey;
  if (!apiKey) {
    throw new Error('OpenAI API key not configured');
  }

  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
}

export async function analyzeCode(problem: Problem, code: string): Promise<string> {
  const openai = getOpenAIClient();
  
  const prompt = `
分析以下代码解决方案：

问题：${problem.title}
描述：${problem.description}

代码：
${code}

请提供以下分析：
1. 解题思路是否正确
2. 代码质量评估
3. 时间复杂度和空间复杂度
4. 具体改进建议
5. 性能优化建议
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1000
  });

  return response.choices[0].message.content || "无法生成分析结果";
}

export async function recommendProblems(
  userId: string,
  submissions: UserSubmission[]
): Promise<Problem[]> {
  const openai = getOpenAIClient();
  
  const submissionHistory = submissions.map(s => ({
    problemId: s.problemId,
    status: s.status,
    timestamp: s.timestamp
  }));

  const prompt = `
基于用户的提交历史，推荐下一步应该练习的题目类型和难度：

提交历史：
${JSON.stringify(submissionHistory, null, 2)}

请分析用户的做题模式和表现，并推荐：
1. 最适合的题目难度
2. 需要加强的知识点
3. 下一步学习建议
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500
  });

  // 这里需要根据AI的建议从数据库中筛选合适的题目
  // 实际实现时需要解析AI响应并匹配题目
  return [];
}

export async function generateHints(problem: Problem, code: string): Promise<string> {
  const openai = getOpenAIClient();
  
  const prompt = `
用户在解决以下问题时遇到困难：

问题：${problem.title}
描述：${problem.description}

当前代码：
${code}

请提供循序渐进的提示，帮助用户理解问题并改进解决方案，但不要直接给出答案。
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500
  });

  return response.choices[0].message.content || "暂时无法生成提示";
}