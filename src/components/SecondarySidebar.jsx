import React, { useState, useEffect } from 'react';
import { Monitor, ChevronDown, ArrowRight, Star } from 'lucide-react';

export default function SecondarySidebar({
  isSidebarOpen = true,
  activeNavTab = 'stack',
  activePage = 'businessAssets',
  setActivePage,
  isAdmin = localStorage.getItem('auth_user') === 'admin',
}) {
  const [isOsExpanded, setIsOsExpanded] = useState(true);

  const [hasFavorites, setHasFavorites] = useState(() => {
    const favs = JSON.parse(localStorage.getItem('favorite_items') || '{}');
    return Object.values(favs).some(val => val === true);
  });
  
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const favs = JSON.parse(localStorage.getItem('favorite_items') || '{}');
      setHasFavorites(Object.values(favs).some(val => val === true));
    };
    window.addEventListener('favorites-updated', handleFavoritesUpdate);
    return () => window.removeEventListener('favorites-updated', handleFavoritesUpdate);
  }, []);

  return (
    <aside className={`secondary-sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}>
      {(isAdmin || activeNavTab === 'stack') ? (
        <div
          className={`sidebar-item ${activePage === 'businessAssets' ? 'active' : ''}`}
          onClick={() => setActivePage && setActivePage('businessAssets')}
        >
          <img src="/stack_open.svg" alt="My Apps" className="sidebar-custom-icon" />
          <span className="sidebar-label">My Apps</span>
        </div>
      ) : (
        <div className="sidebar-menu-group">
          {/* Operating System Accordion Header */}
          <div
            className="sidebar-item active sidebar-item-dropdown"
            onClick={() => setIsOsExpanded(!isOsExpanded)}
          >
            <Monitor size={16} className="sidebar-icon" />
            <span className="sidebar-label">Operating System</span>
            <ChevronDown
              size={14}
              className={`chevron-icon sidebar-chevron ${isOsExpanded ? 'expanded' : ''}`}
            />
          </div>

          {/* Submenu Options when Expanded */}
          <div className={`sidebar-submenu-wrapper ${isOsExpanded ? 'expanded' : ''}`}>
            <div className="sidebar-submenu-list">
              <div
                className={`sidebar-submenu-item ${activePage === 'windows' ? 'active' : ''}`}
                onClick={() => setActivePage && setActivePage('windows')}
              >
                <span>Windows</span>
                {activePage === 'windows' && <ArrowRight size={14} className="submenu-arrow" />}
              </div>
              <div
                className={`sidebar-submenu-item ${activePage === 'linux' ? 'active' : ''}`}
                onClick={() => setActivePage && setActivePage('linux')}
              >
                <span>Linux Passwordbased</span>
                {activePage === 'linux' && <ArrowRight size={14} className="submenu-arrow" />}
              </div>
            </div>
          </div>
               {hasFavorites && (
            <div
              className={`sidebar-item ${activePage === 'favourite' ? 'active' : ''}`}
              onClick={() => setActivePage && setActivePage('favourite')}
            >
              <Star size={16} className="sidebar-icon" />
              <span className="sidebar-label">Favourite</span>
            </div>
          )}
          
        </div>
      )}
    </aside>
  );
}
