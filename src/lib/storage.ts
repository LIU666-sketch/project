import type { Problem, UserSubmission } from '../types/problem';

const PROBLEMS_KEY = 'algomentor_problems';
const SUBMISSIONS_KEY = 'algomentor_submissions';

export const storage = {
  getProblems(): Problem[] {
    const data = localStorage.getItem(PROBLEMS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setProblems(problems: Problem[]) {
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(problems));
  },

  getSubmissions(): UserSubmission[] {
    const data = localStorage.getItem(SUBMISSIONS_KEY);
    return data ? JSON.parse(data) : [];
  },

  setSubmissions(submissions: UserSubmission[]) {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  },

  addSubmission(submission: UserSubmission) {
    const submissions = this.getSubmissions();
    submissions.unshift(submission);
    this.setSubmissions(submissions);
  }
};