import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Monitor, User, Globe, Hash, Link2, LogIn, LogOut, Play, Pause, RotateCcw, RotateCw, Maximize, X } from 'lucide-react';

const logo = '/logo.svg';

export default function SessionLogViewPage({ onBack }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  const progressRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const skip = (amount) => {
    videoRef.current.currentTime += amount;
  };

  const sessionInfo = [
    { label: 'Session Taken By', value: 'ROHITH (ROHITH)', icon: '/Service-accessed-Name.png' },
    { label: 'Asset Name', value: 'Windows', icon: '/Asset-Name.png' },
    { label: 'Asset IP Address', value: '52.0.181.55', icon: '/Server-Domain.png' },
    { label: 'Digital Identity Us...', value: 'clark.kent', icon: '/Service-user-ID.png' },
    { label: 'Session Id', value: '2525', icon: '/Session-ID.png' },
    { label: 'Connection Type', value: 'AGWA', icon: '/Session-Metadata.png' }
  ];

  return (
    <div className="session-view-page">
      <header className="monitoring-header">
        <a className="monitoring-brand" onClick={onBack} aria-label="Back" style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" />
        </a>
        <h1>Session Monitoring</h1>
        <div className="monitoring-header-actions">
          <span className="monitoring-timezone">◷ &nbsp;Preferred Timezone : IST</span>
          <div className="monitoring-avatar">AD</div>
        </div>
      </header>

      <div className="session-view-container">
        <div className={`session-view-main ${sidebarExpanded ? 'sidebar-open' : ''}`}>
          <div className="session-view-header">
            <div className="session-view-title">
              <img src="/default.svg" alt="" width="24" />
              <h2>Windows RDP</h2>
            </div>
          </div>

          <div className={`session-info-grid ${!sidebarExpanded ? 'single-row' : ''}`}>
            {sessionInfo.map((item, idx) => (
              <div key={idx} className="session-info-card">
                <img src={item.icon} alt="" className="info-card-icon" />
                <div className="info-content">
                  <label>{item.label}</label>
                  <strong>{item.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="video-player-wrapper">
            <video 
              ref={videoRef}
              className="session-video"
              onClick={togglePlay}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            >
              <source src="https://firebasestorage.googleapis.com/v0/b/glassy-automata-461711-i5.firebasestorage.app/o/1789648227648149.mp4?alt=media&token=19b6d6f2-5519-41b3-8e8c-a744d77e9fb0" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="custom-player-controls">
              <button className="control-btn seek-btn" onClick={() => skip(-10)}>
                <RotateCcw size={20} />
                <span className="seek-val">10</span>
              </button>
              
              <button className="control-btn play-pause-btn" onClick={togglePlay}>
                {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
              </button>
              
              <button className="control-btn seek-btn" onClick={() => skip(10)}>
                <RotateCw size={20} />
                <span className="seek-val">10</span>
              </button>
              
              <div className="player-time">{formatTime(currentTime)} / {formatTime(duration)}</div>
              
              <div className="player-progress-container" onClick={handleSeek}>
                <div className="player-progress-bg" ref={progressRef}>
                  <div 
                    className="player-progress-filled" 
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <div className="player-progress-handle" />
                  </div>
                </div>
              </div>
              
              <button className="control-btn full-screen-btn" onClick={toggleFullScreen}>
                <Maximize size={18} />
              </button>
            </div>
          </div>

          <div className="session-timeline">
            <h3>Session Timeline</h3>
            <div className="timeline-row">
              <div className="timeline-item">
                <div className="timeline-icon login">
                  <LogIn size={18} />
                </div>
                <div className="timeline-info">
                  <label>Asset Logged In:</label>
                  <span>17-Sep-2026 17:31:21</span>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-icon logout">
                  <LogOut size={18} />
                </div>
                <div className="timeline-info">
                  <label>Asset Logged Out:</label>
                  <span>17-Sep-2026 17:31:21</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {sidebarExpanded && (
          <aside className="session-view-sidebar">
            <button className="sidebar-toggle-btn" onClick={() => setSidebarExpanded(false)} title="Collapse sidebar">
              <ChevronRight size={18} />
            </button>
            <div className="sidebar-content">
              <div className="empty-sidebar-state">
                <img src="/no-logs.png" alt="No data" />
                <p>No Data Available</p>
              </div>
            </div>
          </aside>
        )}

        {!sidebarExpanded && (
          <button className="sidebar-toggle-btn collapsed" onClick={() => setSidebarExpanded(true)} title="Expand sidebar">
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      <footer className="monitoring-footer">
        Copyright © 2026 <b>|</b> <strong>▲ arcon</strong> <b>|</b> V10.11.005_HF1 <b>|</b> Session Monitoring <b>|</b> All Rights Reserved.
      </footer>
    </div>
  );
}
