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

export default function WindowsAssetsPage({ onOpenDetails, isFavouriteView = false, showHeader = true, isWrapper = true, setActivePage }) {
  const [activeTab, setActiveTab] = useState('all');
  const [isAssetExpanded, setIsAssetExpanded] = useState(true);
  
  const [isPinned, setIsPinned] = useState(() => {
    return localStorage.getItem('is_pinned') === 'true';
  });
  
  const [favoriteItems, setFavoriteItems] = useState(() => {
    return JSON.parse(localStorage.getItem('favorite_items') || '{}');
  });
  
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isRdpOpen, setIsRdpOpen] = useState(false);
  const connectMenuRef = useRef(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectTerminal = () => {
    setIsConnectOpen(false);
    setIsRdpOpen(false);
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      if (setActivePage) setActivePage('windowsTerminal');
    }, 2000);
  };

  const [hasRohithCredentials, setHasRohithCredentials] = useState(() => {
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
    
    if (id === 'header') {
      newFavorites = {
        ...favoriteItems,
        header: isFavoriting,
        row1: isFavoriting,
        row2: isFavoriting,
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
      {isConnecting && (
        <div className="connector-loader-overlay">
          <div className="connector-loader-title">We're setting up connector workspace</div>
          <div className="connector-spinner"></div>
        </div>
      )}

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
              Welcome to Infrastructure Assets <span className="breadcrumb-separator">&gt;</span> <span className="breadcrumb-current">{isFavouriteView ? 'Favourite' : 'Windows'}</span>
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

      {(!isFavouriteView || favoriteItems['header'] || favoriteItems['row1'] || favoriteItems['row2']) && (
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
              <span className="ip-address">52.0.181.55</span>
              <span className="hostname-label">Hostname : 52.0.181.55</span>
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
              className={`action-link-btn ${favoriteItems['header'] ? 'favorited' : ''}`}
              onClick={() => toggleFavorite('header')}
            >
              <Star
                size={13}
                className="action-icon"
                fill={favoriteItems['header'] ? '#f59e0b' : 'none'}
                color={favoriteItems['header'] ? '#f59e0b' : 'currentColor'}
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
              {(!isFavouriteView || favoriteItems['header'] || favoriteItems['row1']) && (
                <div className="subrow-item">
                  <div className="subrow-left">
                    <div className="user-initials-badge">CL</div>
                    <span className="username-text">clark.kent</span>
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
                                onClick={handleConnectTerminal}
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
                      className={`action-link-btn ${favoriteItems['row1'] ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite('row1')}
                    >
                      <Star
                        size={13}
                        className="action-icon"
                        fill={favoriteItems['row1'] ? '#f59e0b' : 'none'}
                        color={favoriteItems['row1'] ? '#f59e0b' : 'currentColor'}
                      />
                      <span>Favorite</span>
                    </button>

                    <button className="action-link-btn details-link" onClick={() => onOpenDetails('identity')}>
                      <span>Details</span>
                      <ArrowRight size={13} className="arrow-icon" />
                    </button>
                  </div>
                </div>
              )}

              {(!isFavouriteView || favoriteItems['header'] || favoriteItems['row2']) && (
                <div className="subrow-item">
                  <div className="subrow-left">
                    <div className="user-initials-badge">RO</div>
                    <span className="username-text">Rohith</span>
                  </div>

                  <div className="subrow-center">
                    <span className="permanent-badge">
                      <img src='/permanent-img.svg' />
                      <span>Permanent</span>
                    </span>
                  </div>

                  <div className="subrow-right">
                    {hasRohithCredentials ? (
                      <div className="connect-menu" ref={connectMenuRef2}>
                        <button
                          className="action-link-btn connect-btn"
                          onClick={() => {
                            setIsConnectOpen2(!isConnectOpen2);
                            setIsRdpOpen2(false);
                          }}
                          aria-expanded={isConnectOpen2}
                          aria-haspopup="menu"
                        >
                          <LinkIcon size={13} className="action-icon" />
                          <span>Connect</span>
                          <ChevronDown size={13} className="chevron-sm" />
                        </button>
                        {isConnectOpen2 && (
                          <div className="connect-dropdown" role="menu">
                            <button
                              className="connect-menu-item"
                              onMouseEnter={() => setIsRdpOpen2(true)}
                              onClick={() => setIsRdpOpen2(!isRdpOpen2)}
                              aria-expanded={isRdpOpen2}
                              aria-haspopup="menu"
                            >
                              <span>Windows RDP</span>
                              <ChevronRight size={14} />
                            </button>
                            {isRdpOpen2 && (
                              <div className="connect-submenu" role="menu">
                                <button
                                  className="connect-menu-item rdp-option"
                                  onClick={() => {
                                    setIsConnectOpen2(false);
                                    setIsRdpOpen2(false);
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
                    ) : (
                      <button className="action-link-btn credentials-btn" onClick={() => onOpenDetails('credentials')}>
                        <Lock size={13} className="action-icon" />
                        <span>Set Credentials</span>
                      </button>
                    )}

                    <button
                      className={`action-link-btn ${favoriteItems['row2'] ? 'favorited' : ''}`}
                      onClick={() => toggleFavorite('row2')}
                    >
                      <Star
                        size={13}
                        className="action-icon"
                        fill={favoriteItems['row2'] ? '#f59e0b' : 'none'}
                        color={favoriteItems['row2'] ? '#f59e0b' : 'currentColor'}
                      />
                      <span>Favorite</span>
                    </button>

                    <button className="action-link-btn details-link" onClick={() => onOpenDetails('credentials')}>
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
