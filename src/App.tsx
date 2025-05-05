import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserSettingsProvider } from './context/UserSettingsContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ExercisesPage from './pages/ExercisesPage';
import ReaderPage from './pages/ReaderPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

// Add global styles for dark mode and animations
import './styles/globals.css';

function App() {
  return (
    <UserSettingsProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/exercises" element={<ExercisesPage />} />
              <Route path="/reader/:id" element={<ReaderPage />} />
              <Route path="/reader" element={<ReaderPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserSettingsProvider>
  );
}

export default App;