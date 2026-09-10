import React from 'react';
import { X, RotateCw } from 'lucide-react';

export default function NotificationDrawer({ onClose }) {
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-container notification-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="notification-drawer-header">
          <h2 className="notification-title">Notification</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Subheader Row */}
        <div className="notification-subheader-row">
          <span className="notification-label">You Have Notification</span>
          <button className="refresh-btn">
            <RotateCw size={13} className="refresh-icon" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Empty Body Area */}
        <div className="notification-body"></div>
      </div>
    </div>
  );
}
