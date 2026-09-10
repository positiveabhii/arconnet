import React from 'react';

export default function LeftNavigation({
  activeNavTab,
  isSidebarOpen,
  setIsSidebarOpen,
  isAdmin = localStorage.getItem('auth_user') === 'admin',
}) {
  const handleStackClick = (event) => {
    if (activeNavTab === 'stack') {
      event.preventDefault();
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleFileClick = (event) => {
    if (activeNavTab === 'file') {
      event.preventDefault();
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <nav className="left-nav-rail">
      {/* Top Stack Icon Button */}
      <a
        href={isAdmin ? '/admin' : '/user'}
        className={`nav-item ${isSidebarOpen && activeNavTab === 'stack' ? 'active' : ''}`}
        title="Business Assets"
        onClick={handleStackClick}
      >
        <img
          src={isSidebarOpen && activeNavTab === 'stack' ? '/stack_open.svg' : '/stack_close.svg'}
          alt="Stack Icon"
          className="nav-custom-icon"
        />
      </a>

      {!isAdmin && (
        <a
          href="/user/windows"
          className={`nav-item ${isSidebarOpen && activeNavTab === 'file' ? 'active' : ''}`}
          title="Operating System"
          onClick={handleFileClick}
        >
          <img
            src={isSidebarOpen && activeNavTab === 'file' ? '/file_open.svg' : '/file_close.svg'}
            alt="File Icon"
            className="nav-custom-icon"
          />
        </a>
      )}
    </nav>
  );
}
