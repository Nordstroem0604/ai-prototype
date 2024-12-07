import React from "react";

import "./Header.css";

export const Header: React.FC = () => {
  return (
    <div className="header-container">
      <h1 className="main-header">
        Welcome to <span className="highlight">AI-Prototype</span>
      </h1>
      <p className="description">
        Enter your query and a template below to generate a response using AI.
      </p>
    </div>
  );
};
