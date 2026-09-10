import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';

export default function WindowsTerminalPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show the Windows login loading screen with PIP loader for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="windows-terminal-container">
        <div className="windows-login-avatar">
          <User size={80} />
        </div>
        <h1 className="windows-login-name">Other user</h1>
        <div className="windows-login-welcome">
          <div className="windows-login-spinner"></div>
          <span>Welcome</span>
        </div>

        {/* PIP Loader at bottom right */}
        <div className="connector-pip">
          <div className="connector-spinner"></div>
          <span className="connector-pip-title">We're setting up connector workspace</span>
        </div>
      </div>
    );
  }

  // After 2 seconds, show the full Windows screenshot
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <img src="/WINDOWS.png" alt="Windows Desktop" className="windows-screenshot" />
    </div>
  );
}
