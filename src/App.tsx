import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProblemPage from './pages/ProblemPage';
import ImportPage from './pages/ImportPage';
import SettingsPage from './pages/SettingsPage';
import PracticePage from './pages/PracticePage';
import CompetitionsPage from './pages/CompetitionsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
            </>
          } />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/problem/:problemId" element={<ProblemPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;