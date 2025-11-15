import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Shravani");
  const [email, setEmail] = useState("shravani@example.com");
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      window.location.href = "/login"; // Redirect to login page
    }, 1500);
  };

  return (
    <div className="profile-wrapper">
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            Logged out successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="avatar">
          <span>{name.charAt(0).toUpperCase()}</span>
        </div>

        {!isEditing ? (
          <>
            <h2>{name}</h2>
            <p className="email">{email}</p>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <input
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
            <input
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
            />
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </>
        )}

        <div className="stats">
          <h3>Your Stats</h3>
          <p>Quizzes Taken: <strong>12</strong></p>
          <p>Highest Score: <strong>9/10</strong></p>
          <p>Average Score: <strong>7.4</strong></p>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
