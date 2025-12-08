import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages from Components folder
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import QuizListPage from "./components/QuizListPage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";
import SubjectPage from "./components/SubjectPage";
import ForgotPassword from "./components/ForgotPassword";
import WelcomePage from "./components/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import AdminQuizCRUD from "./pages/AdminQuizCRUD";

// Pages folder
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <Router basename="/">   {/* << FIXED HERE */}
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/quizzes" element={<AdminQuizCRUD />} />
        <Route path="/admin/quizzes" element={<QuizList />} />
        <Route path="/admin/quizzes/create" element={<CreateQuiz />} />
        <Route path="/admin/quizzes/edit/:id" element={<EditQuiz />} />
        <Route path="/admin/quizzes/delete/:id" element={<DeleteQuiz />} />


        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
        />

        <Route
          path="/subjects"
          element={<ProtectedRoute><SubjectPage /></ProtectedRoute>}
        />

        <Route
          path="/quiz-list"
          element={<ProtectedRoute><QuizListPage /></ProtectedRoute>}
        />

        <Route
          path="/quiz/:id"
          element={<ProtectedRoute><QuizPage /></ProtectedRoute>}
        />

        <Route
          path="/results"
          element={<ProtectedRoute><ResultPage /></ProtectedRoute>}
        />

        {/* Extra pages in pages folder */}
        <Route
          path="/home"
          element={<ProtectedRoute><Home /></ProtectedRoute>}
        />
        <Route
          path="/user"
          element={<ProtectedRoute><UserPage /></ProtectedRoute>}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute><AdminPage /></ProtectedRoute>}
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="quizzes" element={<AdminQuizCRUD />} />
        </Route>

      </Routes>
    </Router>
  );
}
