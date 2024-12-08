"use client";

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from 'aws-amplify/auth';
import outputs from "../../amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

// Configure Amplify with your settings
Amplify.configure(outputs);

const BetaContent: React.FC<{ signOut?: () => void; user?: any }> = ({ signOut, user }) => {
  const [isDark, setIsDark] = useState(true);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { username, userId, signInDetails } = await getCurrentUser();

        console.log("username", username);
        console.log("user id", userId);
        console.log("sign-in details", signInDetails);
        // console.log("email", signInDetails.loginId);

        setUsername(username);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-white'} flex flex-col justify-center items-center relative transition-colors duration-300`}>
      {/* Theme toggle and sign out button */}
      <div className="absolute top-8 right-8 flex items-center gap-4">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-opacity-10 hover:bg-gray-500"
        >
          {isDark ? (
            <Sun className="w-6 h-6 text-white" />
          ) : (
            <Moon className="w-6 h-6 text-black" />
          )}
        </button>
        {signOut && (
          <button
            onClick={signOut}
            className={`px-4 py-2 rounded-md ${
              isDark 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            } transition-colors duration-300`}
          >
            Sign Out
          </button>
        )}
      </div>

      {/* Main content container */}
      <div className="max-w-2xl px-6 text-center">
        <div className={`${isDark ? 'text-white' : 'text-black'} text-6xl font-sans mb-8 transition-colors duration-300`}>
          Welcome to the Beta
        </div>
        {username && (
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-xl mb-4 transition-colors duration-300`}>
            Hello, {username}!
          </p>
        )}
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} text-xl mb-12 transition-colors duration-300`}>
          Thank you for your interest in freyai. We're excited to have you join our beta testing community.
        </p>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg transition-colors duration-300`}>
          We'll be in touch soon with your access details.
        </p>
      </div>

      {/* Bottom text container */}
      <div className="absolute bottom-8 w-full px-8">
        <div className={`flex justify-between ${isDark ? 'text-white' : 'text-black'} text-sm transition-colors duration-300`}>
          <a href="/" className="hover:underline">← back home</a>
          <span>#VCFO</span>
        </div>
      </div>
    </div>
  );
};

const BetaPage: React.FC = () => {
  return (
    <Authenticator>
      {(props) => <BetaContent {...props} />}
    </Authenticator>
  );
};

export default BetaPage;