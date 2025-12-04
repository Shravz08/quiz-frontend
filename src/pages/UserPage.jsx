import UserDashboard from "../components/UserDashboard";

// Inside return
return (
  <UserDashboard 
    user={user} 
    quizzes={quizzes} 
    onLogout={handleLogout} 
  />
);
