import React from 'react';

export default function StateSwitcherBar({
  activeOverlay,
  setActiveOverlay,
  isExpanded,
  setIsExpanded,
  isSidebarOpen,
  setIsSidebarOpen,
  activePage,
  setActivePage,
  setActiveNavTab,
}) {
  const selectState = (stateNum) => {
    switch (stateNum) {
      case 1: // Image 1: Launcher popup open
        setActiveOverlay('launcher');
        setIsExpanded(false);
        break;
      case 2: // Image 2: Notification drawer open
        setActiveOverlay('notifications');
        setIsExpanded(false);
        break;
      case 3: // Image 3: Default Business Assets (Clean main page)
        setActiveOverlay(null);
        setIsExpanded(false);
        if (setActivePage) setActivePage('businessAssets');
        if (setActiveNavTab) setActiveNavTab('stack');
        break;
      case 4: // Image 4: Empty Business Assets State (Expanded with illustration)
        setActiveOverlay(null);
        setIsExpanded(true);
        if (setActivePage) setActivePage('businessAssets');
        if (setActiveNavTab) setActiveNavTab('stack');
        break;
      case 5: // Image 5: User Profile drawer open
        setActiveOverlay('profile');
        setIsExpanded(false);
        break;
      case 6: // New Image: Windows Assets Page
        setActiveOverlay(null);
        setIsExpanded(false);
        if (setActivePage) setActivePage('windows');
        if (setActiveNavTab) setActiveNavTab('file');
        break;
      default:
        break;
    }
  };

  return (
    <div className="state-switcher-bar" title="Quick Switch Visual States">
      <span className="switcher-label">View Screenshot States:</span>
      <button
        className={`switcher-btn ${activePage === 'windows' ? 'active' : ''}`}
        onClick={() => selectState(6)}
      >
        ★ Windows Page
      </button>
      <button
        className={`switcher-btn ${activeOverlay === null && !isExpanded && activePage === 'businessAssets' ? 'active' : ''}`}
        onClick={() => selectState(3)}
      >
        Default Page (Img 3)
      </button>
      <button
        className={`switcher-btn ${activeOverlay === 'launcher' ? 'active' : ''}`}
        onClick={() => selectState(1)}
      >
        App Launcher (Img 1)
      </button>
      <button
        className={`switcher-btn ${activeOverlay === 'notifications' ? 'active' : ''}`}
        onClick={() => selectState(2)}
      >
        Notifications (Img 2)
      </button>
      <button
        className={`switcher-btn ${activeOverlay === null && isExpanded && activePage === 'businessAssets' ? 'active' : ''}`}
        onClick={() => selectState(4)}
      >
        Empty State (Img 4)
      </button>
      <button
        className={`switcher-btn ${activeOverlay === 'profile' ? 'active' : ''}`}
        onClick={() => selectState(5)}
      >
        Profile (Img 5)
      </button>

      <span className="switcher-divider" style={{ color: '#64748b', margin: '0 4px' }}>|</span>

      <button
        className={`switcher-btn ${isSidebarOpen ? 'active' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? 'Sidebar: Open' : 'Sidebar: Collapsed'}
      </button>
    </div>
  );
}
