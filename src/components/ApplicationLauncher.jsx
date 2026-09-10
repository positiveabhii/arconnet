import React from 'react';

export default function ApplicationLauncher({ isAdmin = localStorage.getItem('auth_user') === 'admin' }) {

  const adminApps = [
    { name: 'Discovery', imgSrc: '/discovery.svg' },
    { name: 'ARCON | M...', imgSrc: '/arcon.svg' },
    { name: 'Admin Con...', imgSrc: '/admin.svg' },
    { name: 'Password V...', imgSrc: '/password.svg' },
    { name: 'Identity Hub', imgSrc: '/identity.svg' },
    { name: 'Workspace', imgSrc: '/workspace.svg', active: true },
    { name: 'Access Co...', imgSrc: '/access.svg', href: '/admin/access-control/profiler' },
    { name: 'Logs/Reports', imgSrc: '/logs.svg' },
    { name: 'Session Mo...', imgSrc: '/session.svg', href: '/admin/session-monitoring/home' },
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
          <a
            key={idx}
            href={app.href}
            className={`launcher-tile ${app.active ? 'active' : ''}`}
          >
            <img src={app.imgSrc} alt={app.name} className="launcher-icon" />
            <span className="launcher-label">{app.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
