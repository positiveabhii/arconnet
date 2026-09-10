import React, { useState } from 'react';
import { Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Download, Filter, Grid3X3, Plus, Search, X } from 'lucide-react';

const logo = '/logo.svg';

const sessionRows = Array.from({ length: 44 }, (_, index) => ({ number: index + 1, session: 'ROHITH(ROHI...', asset: 'Windows', alias: 'Windows Server', ip: '52.0.181.55', identity: index === 11 ? 'Rohith' : 'clark.kent', date: '10-Sep-2026 ...' }));
const tableColumns = [['number', 'Sr ...'], ['status', 'Log Status Det...'], ['view', 'View Deta...'], ['session', 'Log Details'], ['type', 'Session T...'], ['asset', 'Asset Name'], ['alias', 'Asset Alias Name'], ['ip', 'Asset IP'], ['identity', 'Digital Identity'], ['date', 'Session Log...'], ['date2', 'Session Log'], ['date3', 'Session Log']];
const sessionPickerOptions = [['type', 'Session Taken By'], ['asset', 'Asset Name'], ['alias', 'Asset Alias Name'], ['ip', 'Asset IP'], ['host', 'Asset Host Name'], ['domain', 'Asset Domain Name'], ['instance', 'DB Instance Name'], ['category', 'Asset Category'], ['categoryType', 'Asset Type'], ['serviceUser', 'Digital Identity Username'], ['connectionType', 'Connection Type'], ['loggedIn', 'Session Logged In'], ['loggedOut', 'Session Logged Out'], ['logoutStatus', 'Logout Status']];
const rtsmColumns = [['logDetails', 'Log Details'], ['sessionTakenBy', 'Session Taken By'], ['assetName', 'Asset Name'], ['assetAlias', 'Asset Alias Name'], ['assetIp', 'Asset IP'], ['identityUser', 'Digital Identity Use...'], ['sessionLoggedIn', 'Session Logged In'], ['sessionLoggedOut', 'Session Logged Out']];

function MonitoringHeader({ onOpenMenu }) {
  return <header className="monitoring-header"><a className="monitoring-brand" href="/admin" aria-label="Return to Workspace"><img src={logo} alt="The United Bank logo" /></a><h1>Session Monitoring</h1><div className="monitoring-header-actions"><span className="monitoring-timezone">◷ &nbsp;Preferred Timezone : IST</span><button className="monitoring-icon-btn" onClick={onOpenMenu} aria-label="Open applications"><Grid3X3 size={18} /></button><a className="monitoring-avatar" href="/admin" aria-label="Return to Workspace">AD</a></div></header>;
}

export default function SessionMonitoringPage({ initialView = 'session' }) {
  const [activeRail, setActiveRail] = useState(initialView);
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [columnOpen, setColumnOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageSize, setPageSize] = useState(50);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState(() => tableColumns.map(([key]) => key));
  const [visibleRtsmColumns, setVisibleRtsmColumns] = useState(() => rtsmColumns.map(([key]) => key));
  const isRtsm = activeRail === 'rtsm';
  const pickerOptions = isRtsm ? rtsmColumns : sessionPickerOptions;
  const isColumnVisible = (key) => (isRtsm ? visibleRtsmColumns : visibleColumns).includes(key);
  const toggleColumn = (key) => {
    const setter = isRtsm ? setVisibleRtsmColumns : setVisibleColumns;
    setter((columns) => columns.includes(key) ? columns.filter((column) => column !== key) : [...columns, key]);
  };

  return <div className="monitoring-page">
    <MonitoringHeader onOpenMenu={() => setMenuOpen(!menuOpen)} />
    {menuOpen && <div className="monitoring-menu"><a href="/admin">Workspace</a></div>}
    <div className="monitoring-layout">
      <aside className="monitoring-rail"><a className={`monitoring-rail-item ${!isRtsm ? 'active' : ''}`} href="/admin/session-monitoring/home" aria-label="Session Monitoring"><img src="/v-log.svg" alt="" /><small>Session<br />Monitoring</small></a><a className={`monitoring-rail-item ${isRtsm ? 'active' : ''}`} href="/admin/session-monitoring/rtsm" aria-label="RTSM"><img src="/rtsm.svg" alt="" /><small>RTSM</small></a></aside>
      <main className="monitoring-content">
        <div className="monitoring-toolbar"><h2>{isRtsm ? 'Real Time Session Monitoring' : 'Session Monitoring Logs'}</h2><div className="monitoring-tools">{isRtsm && <><span className="rtsm-refresh-label">Auto refresh in 60 Seconds</span><button className={`rtsm-toggle ${autoRefresh ? 'on' : ''}`} onClick={() => setAutoRefresh(!autoRefresh)} aria-label="Toggle auto refresh"><span /></button></>}<button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={17} /></button><button aria-label="Filter" onClick={() => setFilterOpen(true)}><Filter size={16} /><span>Filter</span></button><button aria-label="Download"><span>Download</span><Download size={16} /></button><button aria-label="Customize columns" onClick={() => setColumnOpen(!columnOpen)}><Plus size={19} /></button></div></div>
        {searchOpen && <div className="monitoring-filter-row"><label><Search size={14} /><input autoFocus placeholder="Search session logs" /></label><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={15} /></button></div>}
        {columnOpen && <div className="column-picker"><div className="column-picker-header"><strong>Customize columns</strong><button className="column-picker-close" onClick={() => setColumnOpen(false)} aria-label="Close column picker"><Plus size={16} /></button></div><div className="column-picker-list">{pickerOptions.map(([key, label]) => <button key={key} className="column-picker-item" onClick={() => toggleColumn(key)}><span className={`column-checkbox ${isColumnVisible(key) ? 'checked' : ''}`}>{isColumnVisible(key) && <Check size={14} />}</span><span className="column-grip" aria-hidden="true" /><span>{label}</span></button>)}</div></div>}
        <div className="monitoring-table-wrap"><table className={`monitoring-table ${isRtsm ? 'monitoring-table-empty' : ''}`}><thead><tr>{(isRtsm ? rtsmColumns : tableColumns).map(([key, label]) => isColumnVisible(key) && <th key={key}>{label}</th>)}</tr></thead><tbody>{!isRtsm && sessionRows.map((row) => <tr key={row.number}>{isColumnVisible('number') && <td className="row-number">{row.number}</td>}{isColumnVisible('status') && <td><span className="status-dot" />All Good</td>}{isColumnVisible('view') && <td><button className="view-log-button"><span className="view-camera">▣</span>View</button></td>}{isColumnVisible('session') && <td>{row.session}</td>}{isColumnVisible('type') && <td>Windows</td>}{isColumnVisible('asset') && <td>{row.asset}</td>}{isColumnVisible('alias') && <td>{row.alias}</td>}{isColumnVisible('ip') && <td>{row.ip}</td>}{isColumnVisible('identity') && <td>{row.identity}</td>}{isColumnVisible('date') && <td>{row.date}</td>}{isColumnVisible('date2') && <td>{row.date}</td>}{isColumnVisible('date3') && <td>{row.date}</td>}</tr>)}{isRtsm && <tr className="rtsm-empty-row"><td colSpan={visibleRtsmColumns.length || 1}>No Rows To Show</td></tr>}</tbody></table></div>
        <div className="monitoring-pagination">{!isRtsm && <><span>Page Size:</span><button className="page-size" onClick={() => setPageSize(pageSize === 50 ? 100 : 50)}>{pageSize}<ChevronDown size={13} /></button></>}<strong>{isRtsm ? '0 to 0 of 0' : '1 to 44 of 44'}</strong><div className="page-nav"><button disabled><ChevronsLeft size={15} /></button><button disabled><ChevronLeft size={15} /></button><span>{isRtsm ? 'Page 0 of 0' : 'Page 1 of 1'}</span><button disabled><ChevronRight size={15} /></button><button disabled><ChevronsRight size={15} /></button></div></div>
      </main>
    </div>
    {filterOpen && <div className="monitoring-drawer-overlay" onClick={() => setFilterOpen(false)}><aside className="monitoring-filter-drawer" onClick={(event) => event.stopPropagation()}><div className="monitoring-drawer-header"><strong>Filter Logs</strong><button onClick={() => setFilterOpen(false)} aria-label="Close filter"><X size={20} /></button></div><div className="monitoring-drawer-form"><FilterSelect label="LOB" required placeholder="Select Lob" /><FilterSelect label="Asset Group" placeholder="Select Asset Group" /><FilterSelect label="Role/Department" placeholder="Select Role/Department" /><FilterField label="Session Taken By" placeholder="Enter User Name" /><FilterField label="IP Address" placeholder="Enter IP Address" /><FilterField label="Process Log" placeholder="Search Process Log" /><FilterField label="Command Log" placeholder="Search Command Log" /><FilterField label="Metadata Log" placeholder="Search Metadata Log" /><div className="monitoring-date-fields"><FilterField label="From Date & Time for Session Log In" value="8/10/2026 0:00:00" /><FilterField label="To Date & Time for Session Log In" value="9/10/2026 23:59:59" /></div></div><div className="monitoring-drawer-actions"><button className="clear-filter" onClick={() => setFilterOpen(false)}>Clear</button><button className="apply-filter" onClick={() => setFilterOpen(false)}>Apply</button></div></aside></div>}
    <footer className="monitoring-footer">Copyright © 2026 <b>|</b> <strong>▲ arcon</strong> <b>|</b> V10.11.005_HF1 <b>|</b> Session Monitoring <b>|</b> All Rights Reserved.</footer>
  </div>;
}

function FilterField({ label, placeholder, value }) { return <label className="monitoring-form-field"><span>{label}</span><input placeholder={placeholder} defaultValue={value} /></label>; }
function FilterSelect({ label, placeholder, required }) { return <label className="monitoring-form-field"><span>{label}{required && <b> *</b>}</span><select defaultValue=""><option value="">{placeholder}</option><option>All</option></select></label>; }
