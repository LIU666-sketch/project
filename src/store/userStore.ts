import { create } from 'zustand';
import { storage } from '../lib/storage';
import { recommendProblems } from '../lib/ai';
import type { Problem, UserSubmission } from '../types/problem';

interface UserState {
  userId: string | null;
  submissions: UserSubmission[];
  recommendedProblems: Problem[];
  loading: boolean;
  fetchUserProgress: (userId: string) => Promise<void>;
  updateProgress: (submission: UserSubmission) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  userId: null,
  submissions: [],
  recommendedProblems: [],
  loading: false,

  fetchUserProgress: async (userId: string) => {
    set({ loading: true });
    try {
      const submissions = storage.getSubmissions();
      const recommended = await recommendProblems(userId, submissions);
      
      set({
        userId,
        submissions,
        recommendedProblems: recommended
      });
    } catch (error) {
      console.error('Error fetching user progress:', error);
    } finally {
      set({ loading: false });
    }
  },

  updateProgress: async (submission: UserSubmission) => {
    const { userId } = get();
    if (!userId) return;

    try {
      storage.addSubmission(submission);
      await get().fetchUserProgress(userId);
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }
}));