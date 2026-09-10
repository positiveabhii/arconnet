import React from 'react';

export default function ApplicationLauncher({ onClose, setActivePage, isAdmin = localStorage.getItem('auth_user') === 'admin' }) {

  const adminApps = [
    { name: 'Discovery', imgSrc: '/discovery.svg' },
    { name: 'ARCON | M...', imgSrc: '/arcon.svg' },
    { name: 'Admin Con...', imgSrc: '/admin.svg' },
    { name: 'Password V...', imgSrc: '/password.svg' },
    { name: 'Identity Hub', imgSrc: '/identity.svg' },
    { name: 'Workspace', imgSrc: '/workspace.svg', active: true },
    { name: 'Access Co...', imgSrc: '/access.svg' },
    { name: 'Logs/Reports', imgSrc: '/logs.svg' },
    { name: 'Session Mo...', imgSrc: '/session.svg' },
    { name: 'Identity Go...', imgSrc: '/identity_governance.svg' },
    { name: 'Workflow', imgSrc: '/workflow.svg' },
    { name: 'Settings', imgSrc: '/settings.svg' },
    { name: 'Digital Vault', imgSrc: '/digital_vault.svg' },
  ];

  const standardApps = [
    { name: 'Identity Hub', imgSrc: '/identity.svg' },
    { name: 'Workspace', imgSrc: '/workspace.svg', active: true }
  ];

  const apps = isAdmin ? adminApps : standardApps;

  return (
    <div className="launcher-popup" onClick={(e) => e.stopPropagation()}>
      <div className="launcher-grid">
        {apps.map((app, idx) => (
          <div
            key={idx}
            className={`launcher-tile ${app.active ? 'active' : ''}`}
            onClick={() => {
              if (isAdmin && app.name === 'Session Mo...') {
                setActivePage('sessionMonitoring');
                onClose();
              }
              if (isAdmin && app.name === 'Access Co...') {
                setActivePage('accessProfiler');
                onClose();
              }
            }}
            role={isAdmin && ['Session Mo...', 'Access Co...'].includes(app.name) ? 'button' : undefined}
            tabIndex={isAdmin && ['Session Mo...', 'Access Co...'].includes(app.name) ? 0 : undefined}
          >
            <img src={app.imgSrc} alt={app.name} className="launcher-icon" />
            <span className="launcher-label">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
