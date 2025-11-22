import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";   // <-- your axios instance

function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user info + completed quizzes on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get("/user/me");
        setUser(userResponse.data);

        const quizResponse = await api.get("/user/completed-quizzes");
        setQuizzes(quizResponse.data);

      } catch (error) {
        console.error("Error fetching user info", error);
        navigate("/login"); // redirect if user not logged in
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    return <div>No user found.</div>;
  }

  return (
    <div className="user-page-container">

      <div className="profile-card">
        <h2>Welcome, {user.username} 👋</h2>
        <p>Email: {user.email}</p>
      </div>

      <div className="quiz-history-section">
        <h3>Your Completed Quizzes</h3>

        {quizzes.length === 0 ? (
          <p>You haven't completed any quizzes yet.</p>
        ) : (
          <ul className="quiz-list">
            {quizzes.map((quiz, index) => (
              <li key={index} className="quiz-item">
                <strong>{quiz.title}</strong>
                <span>Score: {quiz.score}%</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default UserPage;
