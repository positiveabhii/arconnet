import React, { useState, useEffect } from 'react';
import { LogOut, X, Globe, ChevronDown, GraduationCap, Settings, Search } from 'lucide-react';

export default function ProfileDrawer({ onClose }) {
  const isAdmin = localStorage.getItem('auth_user') === 'admin';
  // Countdown timer starting from 30 minutes (1800 seconds) downwards to 0
  const INITIAL_SECONDS = 30 * 60;
  const [sessionSeconds, setSessionSeconds] = useState(INITIAL_SECONDS);

  // Language selector state
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [langSearch, setLangSearch] = useState('');

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'ar', label: 'العربية' }
  ];

  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(langSearch.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => {
        if (prev <= 1) {
          return INITIAL_SECONDS; // Restart from 30 minutes when reaching 0
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (totalSecs) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours} hrs ${minutes} mins ${secs} secs`;
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_user');
    window.history.replaceState({}, '', '/login');
    window.location.reload();
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container profile-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header Area with Light Lavender Tint */}
        <div className="profile-drawer-header">
          <div className="profile-header-top">
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
            <button className="close-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* User Details */}
          <div className="user-profile-summary">
            <div className="profile-avatar">{isAdmin ? 'AD' : 'RO'}</div>
            <div className="profile-info">
              <h2 className="user-name">{isAdmin ? 'ADMIN' : 'ROHITH'}</h2>
              <p className="session-info">Last Session : 2026-09-09 23:55:28</p>
              <p className="session-info">Current Session :{formatSessionTime(sessionSeconds)}</p>
            </div>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="profile-drawer-body">
          {/* Language Selector */}
          <div className="language-selector-wrapper">
            <div
              className={`language-selector ${isLangDropdownOpen ? 'active' : ''}`}
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <Globe size={16} className="item-icon" />
              <span className="language-label">{selectedLang}</span>
              <ChevronDown size={14} className="chevron-icon" />
            </div>

            {/* Language Options Dropdown Menu */}
            {isLangDropdownOpen && (
              <div className="language-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-search-wrapper">
                  <input
                    type="text"
                    placeholder="Search"
                    className="dropdown-search-input"
                    value={langSearch}
                    onChange={(e) => setLangSearch(e.target.value)}
                    autoFocus
                  />
                  <Search size={14} className="dropdown-search-icon" />
                </div>
                <div className="dropdown-menu-list">
                  {filteredLanguages.map((lang) => (
                    <div
                      key={lang.id}
                      className={`dropdown-menu-item ${selectedLang === lang.label ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLang(lang.label);
                        setIsLangDropdownOpen(false);
                      }}
                    >
                      {lang.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className="drawer-menu-item">
            <GraduationCap size={16} className="item-icon" />
            <span>Arcon Learning Center</span>
          </div>

          <div className="drawer-menu-item">
            <Settings size={16} className="item-icon" />
            <span>General Configuration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
