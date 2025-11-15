import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "./components/WelcomePage";
import SubjectPage from "./components/SubjectPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import QuizList from "./components/QuizList";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import QuizListPage from "./components/QuizListPage";

import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser } from "./services/AuthService";
import "./App.css";

function App() {
  // current logged-in user (from localStorage via AuthService)
  const [user, setUser] = useState(getCurrentUser());

  // quizzes loaded from backend (array)
  const [quizzes, setQuizzes] = useState(null);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  // Fetch quiz list once (used by QuizListPage and SubjectPage grouping)
  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:8082/api/quizzes");
        if (!res.ok) throw new Error("Failed to load quizzes");
        const data = await res.json();
        setQuizzes(data); // expected array of quiz objects: { id, title, subject, description, ... }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setQuizzes([]); // fallback to empty array to avoid crashes
      } finally {
        setLoadingQuizzes(false);
      }
    };

    loadQuizzes();
  }, []);

  // Build a subject->quiz mapping to pass into SubjectPage (safe even when quizzes is null)
  const quizData = React.useMemo(() => {
    if (!quizzes) return null;
    const map = {};
    quizzes.forEach((q) => {
      const subj = q.subject || "General";
      if (!map[subj]) map[subj] = [];
      map[subj].push(q);
    });
    return map;
  }, [quizzes]);

  return (
    <Router>
      <Routes>
        {/* Public routes (no sidebar) */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/forgot" element={<LoginPage />} />

        {/* Routes that require auth — these render inside MainLayout (Sidebar visible) */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout /> {/* MainLayout renders Sidebar and an <Outlet /> for nested routes */}
            </ProtectedRoute>
          }
        >
          {/* These nested routes will show the sidebar */}
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route
            path="/subjects"
            element={
              // pass quizData and a simple onSelect that navigates inside SubjectPage if needed
              <SubjectPage quizData={quizData} loading={loadingQuizzes} />
            }
          />
          <Route path="/quizlist" element={<QuizListPage quizzes={quizzes} loading={loadingQuizzes} />} />
          <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Route>

        {/* Fallback: any unknown route -> redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
