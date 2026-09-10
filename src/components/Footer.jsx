import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <span>Copyright © 2026</span>
        <span className="footer-divider">|</span>
        <span className="footer-logo">
          <svg className="footer-triangle" viewBox="0 0 16 16" width="12" height="12">
            <polygon points="2,14 8,2 11,8 8,8 6,14" fill="#E53935" />
            <polygon points="6,14 8,8 14,14" fill="#C62828" />
          </svg>
          <strong className="footer-brand">arcon</strong>
        </span>
        <span className="footer-divider">|</span>
        <span>V10.11.005_HF1</span>
        <span className="footer-divider">|</span>
        <span>Workspace</span>
        <span className="footer-divider">|</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
}
