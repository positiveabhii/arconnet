import React, { useState } from 'react';
import { Search, ChevronDown, Clock, MapPin, Mail, Bell, Grid, X, SlidersHorizontal } from 'lucide-react';
import { getDemoRole } from '../auth';

const logo = '/logo.svg';

export default function TopHeader({ activeOverlay, setActiveOverlay, activePage = 'windows', isAdmin = getDemoRole() === 'admin' }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const toggleOverlay = (name) => {
    setActiveOverlay(activeOverlay === name ? null : name);
  };

  const handleSearchFocus = () => {
    setIsSearchActive(true);
    setIsFilterOpen(true);
  };

  return (
    <header className="top-header">
      {/* Left: Brand Logo & Dropdown Search */}
      <div className="header-left">
        <div className="logo-container">
          <img src={logo} alt="Arcon Logo" className="header-logo" />
        </div>

        <div className="search-dropdown-container">
          {/* Category Dropdown Trigger */}
          <div
            className={`category-select ${isDropdownOpen ? "active" : ""}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{activePage === "windows" ? "Windows" : "All"}</span>
            <ChevronDown className="chevron-icon" size={14} />

            {/* Category Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="category-dropdown-menu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="dropdown-search-wrapper">
                  <input
                    type="text"
                    className="dropdown-search-input"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    autoFocus
                  />
                  <Search size={14} className="dropdown-search-icon" />
                </div>
                <div className="dropdown-menu-list">
                  <div className="dropdown-menu-group-title">All Section</div>
                  <a
                    className={`dropdown-menu-item ${activePage === "all" ? "active" : ""}`}
                    href={isAdmin ? "/admin" : "/home"}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    All
                  </a>
                  <div className="dropdown-menu-group-title">
                    Operating System
                  </div>
                  <a
                    className={`dropdown-menu-item ${activePage === "windows" ? "active" : ""}`}
                    href="/windows"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Windows
                  </a>
                  <a
                    className={`dropdown-menu-item ${activePage === "linux" ? "active" : ""}`}
                    href="/linux-passwordbased"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Linux PasswordBased
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="search-divider"></div>

          {/* Search Input Box */}
          <div className="search-input-wrapper">
            <Search className="search-icon" size={14} />
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={handleSearchFocus}
            />

            {/* Clear & Filter Icons: Visible when search is active or filter is open */}
            {(isSearchActive || isFilterOpen || searchValue) && (
              <>
                <X
                  size={14}
                  className="search-right-icon search-clear"
                  onClick={() => {
                    setSearchValue("");
                    setIsFilterOpen(false);
                    setIsSearchActive(false);
                  }}
                  title="Clear Search"
                />
                <SlidersHorizontal
                  size={14}
                  className={`search-right-icon ${isFilterOpen ? "active" : ""}`}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  title="Toggle Advanced Filter"
                />
              </>
            )}

            {/* Advanced Search Filter Popover */}
            {isFilterOpen && (
              <div
                className="advanced-filter-popover"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="filter-form-group">
                  <label className="filter-label">Asset Name</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Alias Name</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Tags</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Description 1</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Description 2</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Description 3</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Keywords</label>
                  <input type="text" className="filter-underline-input" />
                </div>

                <div className="filter-form-group">
                  <label className="filter-label">Access Type</label>
                  <div className="filter-select-wrapper">
                    <select className="filter-select-input">
                      <option value="">Select Access Type</option>
                    </select>
                    <ChevronDown size={14} className="filter-select-chevron" />
                  </div>
                </div>

                <div className="filter-actions-row">
                  <button
                    className="clear-filter-btn"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X size={13} />
                    <span>Clear Filter</span>
                  </button>

                  <button
                    className="apply-search-btn"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Status Info & User Actions */}
      <div className="header-right">
        <div className="timezone-indicator">
          <Clock size={14} className="header-icon-muted" />
          <span>Preferred Timezone : IST</span>
        </div>

        <div className="location-indicator">
          <MapPin size={14} className="header-icon-muted" />
          <span className="location-name">Test Lab Demo</span>
          <ChevronDown size={14} className="chevron-icon" />
        </div>

        <div className="header-actions">
          <button className="icon-btn" title="Mail">
            <Mail size={16} />
          </button>

          <button
            className={`icon-btn ${activeOverlay === "notifications" ? "active" : ""}`}
            onClick={() => toggleOverlay("notifications")}
            title="Notifications"
          >
            <Bell size={16} />
          </button>

          <button
            className={`icon-btn ${activeOverlay === "launcher" ? "active" : ""}`}
            onClick={() => toggleOverlay("launcher")}
            title="Application Launcher"
          >
            <Grid size={16} />
          </button>

          <div
            className="user-avatar"
            onClick={() => toggleOverlay("profile")}
            title="User Profile"
          >
            {isAdmin ? "AD" : "RO"}
          </div>
        </div>
      </div>
    </header>
  );
}
