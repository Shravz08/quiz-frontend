import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages (from /src/pages)
import Home from "./pages/Home";
import QuizPage from "./pages/QuizPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

// Components (from /src/components)
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import SubjectPage from "./components/SubjectPage";
import ResultPage from "./components/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  return (
    <Router basename="/quiz-frontend">
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <SubjectPage />
            </ProtectedRoute>
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

        {/* Admin */}
        <Route
          path="/admin"
          element={
            isLoggedIn() ? <AdminPage /> : <Navigate to="/login" />
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user"
          element={
            isLoggedIn() ? <UserPage /> : <Navigate to="/login" />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
