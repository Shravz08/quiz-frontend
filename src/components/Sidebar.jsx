import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="hamburger"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* Sidebar Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="sidebar-logo">Quiz App</h2>

            <Link to="/" className="sidebar-link" onClick={() => setOpen(false)}>
              🏠 Home
            </Link>

            <Link to="/quizlist" className="sidebar-link" onClick={() => setOpen(false)}>
              📝 Quiz List
            </Link>

            <Link to="/profile" className="sidebar-link" onClick={() => setOpen(false)}>
              👤 Profile
            </Link>

            <button className="sidebar-link logout-btn" onClick={onLogout}>
              🚪 Logout
            </button>

            {/* Close button */}
            <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
