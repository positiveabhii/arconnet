import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Pin,
  Star,
  ArrowRight,
  Link as LinkIcon,
  Lock,
  Terminal,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  Info,
  X
} from 'lucide-react';

export default function LinuxAssetsPage({ onOpenDetails, isFavouriteView = false, showHeader = true, isWrapper = false }) {
  const [activeTab, setActiveTab] = useState('all');
  const [isAssetExpanded, setIsAssetExpanded] = useState(true);
  
  const [isPinned, setIsPinned] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem('is_pinned') === 'true';
  });
  
  const [favoriteItems, setFavoriteItems] = useState(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    return JSON.parse(localStorage.getItem('favorite_items') || '{}');
  });
  
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isRdpOpen, setIsRdpOpen] = useState(false);
  const connectMenuRef = useRef(null);

  const [hasRohithCredentials, setHasRohithCredentials] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage.getItem('rohith_credentials') === 'true';
  });
  const [isConnectOpen2, setIsConnectOpen2] = useState(false);
  const [isRdpOpen2, setIsRdpOpen2] = useState(false);
  const connectMenuRef2 = useRef(null);

  const [toasts, setToasts] = useState([]);

  const addToast = (title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const closeConnectMenu = (event) => {
      if (connectMenuRef.current && !connectMenuRef.current.contains(event.target)) {
        setIsConnectOpen(false);
        setIsRdpOpen(false);
      }
      if (connectMenuRef2.current && !connectMenuRef2.current.contains(event.target)) {
        setIsConnectOpen2(false);
        setIsRdpOpen2(false);
      }
    };

    const handleCredentialsSaved = () => {
      setHasRohithCredentials(true);
    };

    document.addEventListener('mousedown', closeConnectMenu);
    window.addEventListener('credentials-saved', handleCredentialsSaved);
    
    return () => {
      document.removeEventListener('mousedown', closeConnectMenu);
      window.removeEventListener('credentials-saved', handleCredentialsSaved);
    };
  }, []);

  const toggleFavorite = (id) => {
    let newFavorites;
    const isFavoriting = !favoriteItems[id];
    
    if (id === 'linux_header') {
      newFavorites = {
        ...favoriteItems,
        linux_header: isFavoriting,
        linux_row1: isFavoriting,
      };
    } else {
      newFavorites = {
        ...favoriteItems,
        [id]: isFavoriting
      };
    }
    
    setFavoriteItems(newFavorites);
    localStorage.setItem('favorite_items', JSON.stringify(newFavorites));
    window.dispatchEvent(new Event('favorites-updated'));
    
    if (isFavoriting) {
      addToast('Info', 'Digital Identity successfully marked as favorite.');
    }
  };

  const handlePin = () => {
    const newState = !isPinned;
    setIsPinned(newState);
    localStorage.setItem('is_pinned', newState.toString());
    if (newState) {
      addToast('Info', 'Asset successfully Pinned!!');
    }
  };

  const Container = isWrapper ? React.Fragment : 'div';
  const containerProps = isWrapper ? {} : { className: 'windows-assets-container' };

  return (
    <Container {...containerProps}>
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className="toast-notification">
            <div className="toast-header-row">
              <div className="toast-title-area">
                <Info size={16} className="toast-info-icon" />
                <span className="toast-title">{toast.title}</span>
              </div>
              <button className="toast-close-btn" onClick={() => removeToast(toast.id)}>
                <X size={16} />
              </button>
            </div>
            <div className="toast-message">{toast.message}</div>
          </div>
        ))}
      </div>

      {showHeader && (
        <>
          {/* Breadcrumb Header */}
          <div className="breadcrumb-header">
            <h1 className="breadcrumb-title">
              Welcome to Infrastructure Assets <span className="breadcrumb-separator">&gt;</span> <span className="breadcrumb-current">{isFavouriteView ? 'Favourite' : 'Linux PasswordBased'}</span>
            </h1>
          </div>

          <div className="filter-tab-row">
            <button
              className={`tab-pill-btn ${activeTab === 'all' ? '' : 'outline'}`}
              onClick={() => setActiveTab('all')}
            >
              <img src="/all_icon.svg" alt="" className={`tab-asset-icon ${activeTab === 'all' ? 'all-tab-icon' : ''}`} />
              <span>All</span>
            </button>

            <button
              className={`tab-pill-btn ${activeTab === 'recent' ? '' : 'outline'}`}
              onClick={() => setActiveTab('recent')}
            >
              <img src="/recent-icon.svg" alt="" className={`tab-asset-icon ${activeTab === 'recent' ? 'all-tab-icon' : ''}`} />
              <span>Recently Opened</span>
            </button>
          </div>
        </>
      )}

      {(!isFavouriteView || favoriteItems['linux_header'] || favoriteItems['linux_row1']) && (
        <div className="asset-card-container">
          <div 
            className={`asset-card-header ${isAssetExpanded ? 'expanded' : ''}`}
            onClick={() => setIsAssetExpanded(!isAssetExpanded)}
          >
          <div className="asset-header-left">
            <button className="asset-chevron-btn" aria-label="Expand Asset">
              {isAssetExpanded ? (
                <ChevronDown size={16} className="chevron-icon" />
              ) : (
                <ChevronRight size={16} className="chevron-icon" />
              )}
            </button>

            {/* Supplied asset icon */}
            <div className="server-icon-badge">
              <img src="/dummy server.svg" alt="" />
            </div>

            <div className="asset-ip-title">
              <span className="ip-address">52.66.6.30</span>
              <span className="hostname-label">Hostname : 52.66.6.30</span>
            </div>
          </div>

          <div className="asset-header-right" onClick={(e) => e.stopPropagation()}>
            <button
              className={`action-link-btn ${isPinned ? 'pinned' : ''}`}
              onClick={handlePin}
            >
              {isPinned ? (
                <img src="/push-pin.svg" alt="pinned" className="action-icon" style={{ width: '13px', height: '13px' }} />
              ) : (
                <Pin size={13} className="action-icon" />
              )}
              <span>Pin</span>
            </button>

                <button
                  className={`action-link-btn ${favoriteItems['linux_header'] ? 'favorited' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite('linux_header'); }}
                >
                  <Star
                    size={13}
                    className="action-icon"
                    fill={favoriteItems['linux_header'] ? '#f59e0b' : 'none'}
                    color={favoriteItems['linux_header'] ? '#f59e0b' : 'currentColor'}
                  />
                  <span>Favorite</span>
                </button>

            <button className="action-link-btn details-link" onClick={() => onOpenDetails('asset')}>
              <span>Details</span>
              <ArrowRight size={13} className="arrow-icon" />
            </button>
          </div>
          </div>

          {/* Expanded Asset Details (Rows) */}
          {isAssetExpanded && (
            <div className="asset-card-body">
              {(!isFavouriteView || favoriteItems['linux_header'] || favoriteItems['linux_row1']) && (
                <div className="subrow-item">
                  <div className="subrow-left">
                    <div className="user-initials-badge" style={{ backgroundColor: '#a16207' }}>AD</div>
                    <span className="username-text">adminuser</span>
                  </div>

                  <div className="subrow-center">
                    <span className="permanent-badge">
                      <img src='/permanent-img.svg' />
                      <span>Permanent</span>
                    </span>
                  </div>

                  <div className="subrow-right">
                    <div className="connect-menu" ref={connectMenuRef}>
                      <button
                        className="action-link-btn connect-btn"
                        onClick={() => {
                          setIsConnectOpen(!isConnectOpen);
                          setIsRdpOpen(false);
                        }}
                        aria-expanded={isConnectOpen}
                        aria-haspopup="menu"
                      >
                        <LinkIcon size={13} className="action-icon" />
                        <span>Connect</span>
                        <ChevronDown size={13} className="chevron-sm" />
                      </button>
                      {isConnectOpen && (
                        <div className="connect-dropdown" role="menu">
                          <button
                            className="connect-menu-item"
                            onMouseEnter={() => setIsRdpOpen(true)}
                            onClick={() => setIsRdpOpen(!isRdpOpen)}
                            aria-expanded={isRdpOpen}
                            aria-haspopup="menu"
                          >
                            <span>Windows RDP</span>
                            <ChevronRight size={14} />
                          </button>
                          {isRdpOpen && (
                            <div className="connect-submenu" role="menu">
                              <button
                                className="connect-menu-item rdp-option"
                                onClick={() => {
                                  setIsConnectOpen(false);
                                  setIsRdpOpen(false);
                                }}
                              >
                                <Terminal size={14} />
                                <span>Terminal</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <button
                      className={`action-link-btn ${favoriteItems['linux_row1'] ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite('linux_row1')}
                    >
                      <Star
                        size={13}
                        className="action-icon"
                        fill={favoriteItems['linux_row1'] ? '#f59e0b' : 'none'}
                        color={favoriteItems['linux_row1'] ? '#f59e0b' : 'currentColor'}
                      />
                      <span>Favorite</span>
                    </button>

                    <button className="action-link-btn details-link" onClick={() => onOpenDetails('linux_identity')}>
                      <span>Details</span>
                      <ArrowRight size={13} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {(!isFavouriteView) && (
        <div className="pagination-bar-container">
          <div className="pagination-info">1 - 1 of 1</div>

        <div className="pagination-controls">
          <button className="page-btn disabled" disabled>
            <ChevronsLeft size={14} />
          </button>
          <button className="page-btn disabled" disabled>
            <ChevronLeft size={14} />
          </button>
          <button className="page-btn active">1</button>
          <button className="page-btn disabled" disabled>
            <ChevronRight size={14} />
          </button>
          <button className="page-btn disabled" disabled>
            <ChevronsRight size={14} />
          </button>
        </div>

        <div className="pagination-per-page">
          <div
            className="per-page-select"
            onClick={() => setIsPerPageOpen(!isPerPageOpen)}
          >
            <span>{itemsPerPage}</span>
            <ChevronDown size={14} className="chevron-sm" />

            {/* Per-Page Select Dropdown Menu */}
            {isPerPageOpen && (
              <div
                className="per-page-dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                {[10, 50, 100].map((num) => (
                  <div
                    key={num}
                    className={`per-page-option ${itemsPerPage === num ? 'active' : ''}`}
                    onClick={() => {
                      setItemsPerPage(num);
                      setIsPerPageOpen(false);
                    }}
                  >
                    {num}
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
