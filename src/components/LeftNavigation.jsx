import React from 'react';

export default function LeftNavigation({
  activeNavTab,
  setActiveNavTab,
  isSidebarOpen,
  setIsSidebarOpen,
  setActivePage,
  isAdmin = localStorage.getItem('auth_user') === 'admin',
}) {
  const handleStackClick = () => {
    if (activeNavTab === 'stack') {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveNavTab('stack');
      if (setActivePage) setActivePage('businessAssets');
      setIsSidebarOpen(true);
    }
  };

  const handleFileClick = () => {
    if (activeNavTab === 'file') {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      setActiveNavTab('file');
      if (setActivePage) setActivePage('windows');
      setIsSidebarOpen(true);
    }
  };

  return (
    <nav className="left-nav-rail">
      {/* Top Stack Icon Button */}
      <div
        className={`nav-item ${isSidebarOpen && activeNavTab === 'stack' ? 'active' : ''}`}
        title="Business Assets"
        onClick={handleStackClick}
      >
        <img
          src={isSidebarOpen && activeNavTab === 'stack' ? '/stack_open.svg' : '/stack_close.svg'}
          alt="Stack Icon"
          className="nav-custom-icon"
        />
      </div>

      {!isAdmin && (
        <div
          className={`nav-item ${isSidebarOpen && activeNavTab === 'file' ? 'active' : ''}`}
          title="Operating System"
          onClick={handleFileClick}
        >
          <img
            src={isSidebarOpen && activeNavTab === 'file' ? '/file_open.svg' : '/file_close.svg'}
            alt="File Icon"
            className="nav-custom-icon"
          />
        </div>
      )}
    </nav>
  );
}
