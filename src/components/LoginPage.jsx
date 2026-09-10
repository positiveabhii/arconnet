import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, User, LockKeyhole, Eye, EyeOff, X } from 'lucide-react';

const logo = '/logo.svg';

export default function LoginPage({ onLogin }) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authType, setAuthType] = useState('ARCOSAUTH');
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleNext = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    setError('');
    setIsButtonLoading(true);
    setTimeout(() => {
      setIsButtonLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Password is required');
      return;
    }

    if (
      (username === 'Rohith' && password === 'ARCOS@arcon@2027') ||
      (username === 'admin' && password === 'ARCOS@arcon@2027')
    ) {
      setError('');
      setStep(3);
    } else {
      setError('Invalid credentials');
    }
  };

  useEffect(() => {
    if (step !== 3) {
      return undefined;
    }

    const redirectPath = username === 'admin' ? '/admin' : '/user/windows';
    const timer = setTimeout(() => {
      onLogin(username);
      window.location.href = redirectPath;
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLogin, step, username]);

  return (
    <div className="login-page-wrapper">
      {step === 3 ? (
        <div className="login-loading-screen">
          <div className="loading-icon-wrapper">
            <div className="loading-doc-shape"></div>
            <div className="loading-clock-badge">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
          </div>
          <h2>We're working on your request now.</h2>
          <p>It won't take long, and we appreciate you waiting.</p>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="login-container">
          <div className="login-cont-img">
            <img src={logo} alt="arcon" className="logo-img" />
          </div>
          
          {step === 1 && (
            <div className="login-step-1">
              <h1 className="sign-title">Sign In</h1>
              <h5 className="mb-4 sign-text">Enter your details to sign in to your account</h5>
              
              <form onSubmit={handleNext}>
                <div className="input-container">
                  <div className="input-icon-outer d-flex align-items-center login-input-group">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      placeholder="Username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                
                <div className="input-container login-auth-dropdown-wrapper">
                  <div 
                    className={`input-icon-outer d-flex align-items-center login-input-group auth-select ${isAuthDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  >
                    <Globe size={18} className="input-icon" />
                    <span className="auth-value">{authType}</span>
                    <div className="auth-select-actions">
                      <X size={14} className="clear-auth" onClick={(e) => { e.stopPropagation(); setAuthType(''); }}/>
                      <ChevronDown size={14} className="chevron-icon" />
                    </div>
                  </div>
                  
                  {isAuthDropdownOpen && (
                    <div className="login-dropdown-menu">
                      <div 
                        className={`login-dropdown-item ${authType === 'ARCOSAUTH' ? 'active' : ''}`}
                        onClick={() => { setAuthType('ARCOSAUTH'); setIsAuthDropdownOpen(false); }}
                      >
                        ARCOSAUTH
                      </div>
                      <div 
                        className={`login-dropdown-item ${authType === 'ARCONSEDEMO' ? 'active' : ''}`}
                        onClick={() => { setAuthType('ARCONSEDEMO'); setIsAuthDropdownOpen(false); }}
                      >
                        ARCONSEDEMO
                      </div>
                    </div>
                  )}
                </div>

                {error && <p className="login-error">{error}</p>}
                
                <div className="buttons-outer">
                  <button type="submit" className="login-primary-btn next-btn" disabled={isButtonLoading}>
                    {isButtonLoading ? <div className="btn-spinner"></div> : 'Next'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="login-step-2">
              <h1 className="sign-title">Enter your password</h1>
              
              <form onSubmit={handleLogin}>
                <div className="input-container">
                  <div className="input-icon-outer d-flex align-items-center login-input-group readonly">
                    <User size={18} className="input-icon" />
                    <input 
                      type="text" 
                      value={username}
                      readOnly
                    />
                  </div>
                </div>

                <div className="input-container">
                  <div className="input-icon-outer d-flex align-items-center login-input-group active-bg">
                    <LockKeyhole size={18} className="input-icon" />
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoFocus
                    />
                    <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>

                {error && <p className="login-error">{error}</p>}
                
                <div className="buttons-outer">
                  <button type="submit" className="login-primary-btn">Login</button>
                </div>
                
                <a href="/login" className="forgot-password-link">Forgot Password</a>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
