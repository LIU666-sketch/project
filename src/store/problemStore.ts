import { create } from 'zustand';
import type { Problem } from '../types/problem';
import { storage } from '../lib/storage';

interface ProblemState {
  currentProblem: Problem | null;
  problems: Problem[];
  loading: boolean;
  setCurrentProblem: (problem: Problem) => void;
  fetchProblems: () => Promise<void>;
  importProblems: (newProblems: Problem[]) => void;
}

const sampleProblems: Problem[] = [
  {
    id: "1",
    title: "两数之和",
    difficulty: "easy",
    category: "数组",
    description: "给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "因为 nums[0] + nums[1] == 9 ，返回 [0, 1]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 104",
      "-109 <= nums[i] <= 109",
      "-109 <= target <= 109",
      "只会存在一个有效答案"
    ],
    templateCode: {
      python: "def twoSum(nums: List[int], target: int) -> List[int]:\n    # 在这里写下你的代码\n    pass",
      javascript: "function twoSum(nums, target) {\n    // 在这里写下你的代码\n}",
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // 在这里写下你的代码\n}"
    },
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]"
      }
    ]
  }
];

export const useProblemStore = create<ProblemState>((set) => ({
  currentProblem: null,
  problems: [],
  loading: false,
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  fetchProblems: async () => {
    set({ loading: true });
    try {
      let problems = storage.getProblems();
      if (problems.length === 0) {
        problems = sampleProblems;
        storage.setProblems(problems);
      }
      set({ problems });
    } finally {
      set({ loading: false });
    }
  },
  importProblems: (newProblems) => {
    set((state) => {
      const problems = [...state.problems, ...newProblems];
      storage.setProblems(problems);
      return { problems };
    });
  }
}));