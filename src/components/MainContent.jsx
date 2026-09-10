import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ChevronLeft, ChevronsLeft, ChevronsRight } from 'lucide-react';
import EmptyState from './EmptyState';
import WindowsAssetsPage from './WindowsAssetsPage';
import LinuxAssetsPage from './LinuxAssetsPage';
import WindowsTerminalPage from './WindowsTerminalPage';

export default function MainContent({ isExpanded, setIsExpanded, activePage = 'businessAssets', onOpenDetails }) {
  const [isPerPageOpen, setIsPerPageOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  if (activePage === 'favourite') {
    return (
      <main className="main-content-area">
        <div className="windows-assets-container favourite-page-container">
          <WindowsAssetsPage onOpenDetails={onOpenDetails} isFavouriteView={true} showHeader={true} isWrapper={true} />
          <LinuxAssetsPage onOpenDetails={onOpenDetails} isFavouriteView={true} showHeader={false} isWrapper={true} />
          
          {/* Bottom Pagination Bar for Favourite View */}
          <div className="pagination-bar-container">
            <div className="pagination-info">1 - 2 of 2</div>

            <div className="pagination-controls">
              <button className="page-nav-btn"><ChevronsLeft size={16} /></button>
              <button className="page-nav-btn"><ChevronLeft size={16} /></button>
              <div className="page-numbers">
                <button className="page-number-btn active">1</button>
              </div>
              <button className="page-nav-btn"><ChevronRight size={16} /></button>
              <button className="page-nav-btn"><ChevronsRight size={16} /></button>
            </div>

            <div className="items-per-page-container">
              <div className="items-per-page-selector" onClick={() => setIsPerPageOpen(!isPerPageOpen)}>
                <span>{itemsPerPage}</span>
                <ChevronDown size={14} className="items-per-page-chevron" />

                {isPerPageOpen && (
                  <div className="items-per-page-dropdown">
                    {[10, 20, 50, 100].map(num => (
                      <div 
                        key={num} 
                        className="items-per-page-option"
                        onClick={(e) => {
                          e.stopPropagation();
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
        </div>
      </main>
    );
  }



  if (activePage === 'windows') {
    return (
      <main className="main-content-area">
        <WindowsAssetsPage onOpenDetails={onOpenDetails} />
      </main>
    );
  }

  if (activePage === 'linux') {
    return (
      <main className="main-content-area">
        <LinuxAssetsPage onOpenDetails={onOpenDetails} />
      </main>
    );
  }

  return (
    <main className="main-content-area">
      {/* Breadcrumb Header */}
      <div className="breadcrumb-header">
        <h1 className="breadcrumb-title">
          Welcome to Business Assets <span className="breadcrumb-separator">&gt;</span> <span className="breadcrumb-current">All</span>
        </h1>
      </div>

      {/* Section Header with Expand/Collapse Chevron */}
      <div className="section-header-row">
        <button
          className="section-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown size={16} className="chevron-toggle" />
          ) : (
            <ChevronRight size={16} className="chevron-toggle" />
          )}
          <span className="section-title">My Apps</span>
        </button>
      </div>

      {/* Main Body: Renders Empty State when expanded, blank panel when collapsed */}
      <div className="main-body-panel">
        {isExpanded && <EmptyState />}
      </div>
    </main>
  );
}
