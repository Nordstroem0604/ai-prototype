import React from "react";

import "./Header.css";

interface HeaderProps {
  signOut?: (data?: any) => void; // Allow undefined or a function with optional data
  user?: any; // Optionally display user info
}

export const Header: React.FC<HeaderProps> = ({ signOut, user }) => {
  return (
    <div className="header-container">
      <h1 className="main-header">
        Welcome to <span className="highlight">AI-Prototype</span>
      </h1>
      {user && <p className="user-info">Hello, {user.username}!</p>}
      <p className="description">
        Enter your query and a template below to generate a response using AI.
      </p>
      {signOut && (
        <button className="logout-button" onClick={() => signOut()}>
          Log Out
        </button>
      )}
    </div>
  );
};


