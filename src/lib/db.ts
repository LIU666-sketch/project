import Database from 'better-sqlite3';
import type { Problem, UserSubmission } from '../types/problem';

const db = new Database('algomentor.db');

// 初始化数据库表
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    skill_level INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS problems (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    examples TEXT NOT NULL,
    constraints TEXT NOT NULL,
    template_code TEXT NOT NULL,
    test_cases TEXT NOT NULL,
    source TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS submissions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    problem_id TEXT NOT NULL,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    status TEXT NOT NULL,
    execution_time INTEGER,
    memory_used INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
  );

  CREATE TABLE IF NOT EXISTS user_progress (
    user_id TEXT NOT NULL,
    problem_id TEXT NOT NULL,
    attempts INTEGER DEFAULT 0,
    solved BOOLEAN DEFAULT FALSE,
    last_attempt_at DATETIME,
    PRIMARY KEY (user_id, problem_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (problem_id) REFERENCES problems(id)
  );
`);

export const problemsDb = {
  create: db.prepare(`
    INSERT INTO problems (
      id, title, difficulty, category, description,
      examples, constraints, template_code, test_cases, source
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),

  getAll: db.prepare('SELECT * FROM problems'),
  
  getById: db.prepare('SELECT * FROM problems WHERE id = ?'),
  
  getByDifficulty: db.prepare('SELECT * FROM problems WHERE difficulty = ?'),
  
  getByCategory: db.prepare('SELECT * FROM problems WHERE category = ?')
};

export const submissionsDb = {
  create: db.prepare(`
    INSERT INTO submissions (
      id, user_id, problem_id, code, language,
      status, execution_time, memory_used
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `),

  getByUser: db.prepare('SELECT * FROM submissions WHERE user_id = ? ORDER BY created_at DESC'),
  
  getByProblem: db.prepare('SELECT * FROM submissions WHERE problem_id = ? ORDER BY created_at DESC')
};

export const userProgressDb = {
  update: db.prepare(`
    INSERT INTO user_progress (user_id, problem_id, attempts, solved, last_attempt_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(user_id, problem_id) DO UPDATE SET
    attempts = attempts + 1,
    solved = ?,
    last_attempt_at = CURRENT_TIMESTAMP
  `),

  getUserProgress: db.prepare(`
    SELECT p.*, up.attempts, up.solved, up.last_attempt_at
    FROM problems p
    LEFT JOIN user_progress up ON p.id = up.problem_id
    WHERE up.user_id = ?
    ORDER BY up.last_attempt_at DESC
  `)
};