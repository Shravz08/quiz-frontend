import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SubjectPage from "./pages/SubjectPage";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./components/WelcomePage";
import SubjectPage from "./components/SubjectPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";

function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <Router>
      <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <SubjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subjects"
          element={
            isLoggedIn() ? <SubjectPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/quiz/:subject"
          element={
            isLoggedIn() ? <QuizPage /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/result"
          element={
            isLoggedIn() ? <ResultPage /> : <Navigate to="/login" />
          }
        />
           </Routes>
    </BrowserRouter>
    </Router>
  );
}

export default App;
