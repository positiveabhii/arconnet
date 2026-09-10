import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Grid3X3, MapPin, Plus, Search, X } from 'lucide-react';
import logo from '../assets/logo.svg';

const profilerColumns = ['SR.No', 'Profile Name', 'Profile ...', 'Asset Type', 'Asset Sub...', 'Default Pr...', 'Profile ...', 'Profile Type', 'Profile Da...', 'Profile Ti...', 'S'];

function AccessHeader({ setActivePage }) {
  return (
    <header className="access-header">
      <button className="access-brand" onClick={() => setActivePage('businessAssets')} aria-label="Return to Workspace"><img src={logo} alt="The United Bank logo" /></button>
      <h1>Access Control</h1>
      <div className="access-header-actions"><span>◷ &nbsp;Preferred Timezone : IST</span><MapPin size={14} /><span>SHARJAH</span><ChevronDown size={14} /><Grid3X3 size={18} /><button className="access-avatar" onClick={() => setActivePage('businessAssets')}>AD</button></div>
    </header>
  );
}

export default function AccessControlPage({ setActivePage, initialView = 'profiler' }) {
  const [view, setView] = useState(initialView);
  const [roleOpen, setRoleOpen] = useState(false);
  const [role, setRole] = useState('');
  const [bulkOpen, setBulkOpen] = useState(false);
  const [search, setSearch] = useState('');

  const changeView = (nextView) => {
    setView(nextView);
    setActivePage(nextView === 'assignment' ? 'accessAssignment' : 'accessProfiler');
  };

  return (
    <div className="access-page">
      <AccessHeader setActivePage={setActivePage} />
      <div className="access-layout">
        <aside className="access-rail">
          <button className={`access-rail-item ${view === 'profiler' ? 'active' : ''}`} onClick={() => changeView('profiler')}><span className="access-rail-icon">⌁</span><small>My Pr...</small></button>
          <button className={`access-rail-item ${view === 'assignment' ? 'active' : ''}`} onClick={() => changeView('assignment')}><span className="access-rail-icon">⟳</span><small>Assig...</small></button>
        </aside>

        <main className="access-content">
          {view === 'profiler' ? (
            <section className="access-profiler-view">
              <h2>Access Profiler</h2>
              <div className="access-grid-wrap">
                <table className="access-table"><thead><tr>{profilerColumns.map((column) => <th key={column}>{column}</th>)}<th>Action</th><th>⊕</th></tr></thead><tbody><tr><td colSpan={profilerColumns.length + 2}>No Rows To Show</td></tr></tbody></table>
              </div>
              <button className="access-add-button" aria-label="Add access profile"><Plus size={22} /></button>
            </section>
          ) : (
            <section className="access-assignment-view">
              <div className="access-assignment-heading"><h2>Profile Assignment</h2><button className="bulk-assignment-button" onClick={() => setBulkOpen(true)}>Bulk Assignment</button></div>
              <div className="role-select-wrap">
                <button className="role-select" onClick={() => setRoleOpen(!roleOpen)}><span>{role || 'Select Role/Department'}</span>{roleOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>
                {roleOpen && <div className="role-options"><button onClick={() => { setRole('PSTA Admin'); setRoleOpen(false); }}>PSTA Admin</button><button onClick={() => { setRole('PSTA External'); setRoleOpen(false); }}>PSTA External</button></div>}
              </div>
              <div className="human-identities-card"><div className="identities-heading"><strong>Human Identities<br />List</strong><label><Search size={14} /><input placeholder="Search..." value={search} onChange={(event) => setSearch(event.target.value)} /></label></div><p>{role ? 'No human identities found' : 'Select Role/Department in order to<br />view the Human Identities'}</p></div>
            </section>
          )}
        </main>
      </div>

      {bulkOpen && <div className="access-modal-overlay" onClick={() => setBulkOpen(false)}><section className="bulk-modal" onClick={(event) => event.stopPropagation()}><header><strong>Bulk Profile Mapping</strong><button onClick={() => setBulkOpen(false)} aria-label="Close bulk assignment"><X size={18} /></button></header><div className="bulk-modal-body"><span>Upload File</span><div className="upload-dropzone">Drag and Drop files <b>or</b> <button>Browse</button></div><button className="sample-template">Download Sample Template</button><button className="upload-button">Upload</button></div></section></div>}
      <footer className="access-footer">Copyright © 2026 <b>|</b> <strong>▲ arcon</strong> <b>|</b> V10.11.005_HF1 <b>|</b> Access Control <b>|</b> All Rights Reserved.</footer>
    </div>
  );
}
