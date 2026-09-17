'use client';

import React, { useState, useEffect } from 'react';
import TopHeader from './components/TopHeader';
import LeftNavigation from './components/LeftNavigation';
import SecondarySidebar from './components/SecondarySidebar';
import MainContent from './components/MainContent';
import WindowsTerminalPage from './components/WindowsTerminalPage';
import ApplicationLauncher from './components/ApplicationLauncher';
import ProfileDrawer from './components/ProfileDrawer';
import NotificationDrawer from './components/NotificationDrawer';
import DetailsDrawer from './components/DetailsDrawer';
import Footer from './components/Footer';
import StateSwitcherBar from './components/StateSwitcherBar';
import LoginPage from './components/LoginPage';
import SessionMonitoringPage from './components/SessionMonitoringPage';
import SessionLogViewPage from './components/SessionLogViewPage';
import AccessControlPage from './components/AccessControlPage';
import { getDemoRole, setDemoSession } from './auth';

const routeToPage = (pathname) => {
  const route = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  const routes = {
    '/': 'businessAssets',
    '/login': 'login',
    '/home': 'businessAssets',
    '/windows': 'windows',
    '/linux-passwordbased': 'linux',
    '/admin': 'businessAssets',
    '/user': 'businessAssets',
    '/user/faviourite': 'favourite',
    '/user/windows': 'windows',
    '/user/windows/terminal': 'windowsTerminal',
    '/user/linux-passwordbased': 'linux',
    '/admin/session-monitoring/home': 'sessionMonitoring',
    '/admin/session-monitoring/rtsm': 'sessionMonitoringRtsm',
    '/admin/session-monitoring/log-view': 'sessionLogView',
    '/admin/access-control/profiler': 'accessProfiler',
    '/admin/access-control/assignment': 'accessAssignment'
  };
  return routes[route] || null;
};

export default function App({ initialRole = null, initialPath = '/' }) {
  const role = getDemoRole() || initialRole;
  const isAdmin = role === 'admin';
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(getDemoRole() || initialRole);
  });

  const handleLogin = (username) => {
    setDemoSession(username);
    setIsAuthenticated(true);
  };

  // activeOverlay: null | 'launcher' | 'profile' | 'notifications'
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [detailsVariant, setDetailsVariant] = useState('asset');

  // isExpanded: controls section expansion (collapses vs empty state illustration)
  const [isExpanded, setIsExpanded] = useState(false);

  // isSidebarOpen: controls secondary left sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // activeNavTab: 'stack' | 'file'
  const [activeNavTab, setActiveNavTab] = useState(() => {
    const routedPage = routeToPage(typeof window === 'undefined' ? initialPath : window.location.pathname);
    return routedPage && ['windows', 'linux', 'favourite'].includes(routedPage) ? 'file' : 'stack';
  });

  // activePage: 'windows' | 'businessAssets' | 'linux'
  const [activePage, setActivePage] = useState(() => {
    const routedPage = routeToPage(typeof window === 'undefined' ? initialPath : window.location.pathname);
    if (routedPage === 'login') {
      return 'login';
    }
    if (routedPage && routedPage !== 'login') {
      return routedPage;
    }
    return getDemoRole() === 'admin' ? 'businessAssets' : 'windows';
  });

  useEffect(() => {
    const handleRouteChange = () => {
      const routedPage = routeToPage(window.location.pathname);
      const currentRole = getDemoRole();
      const isCurrentUserAdmin = currentRole === 'admin';
      const isAdminRoute = decodeURIComponent(window.location.pathname).startsWith('/admin');
      const currentPath = decodeURIComponent(window.location.pathname);
      const isUserRoute = currentPath.startsWith('/user') || ['/home', '/windows', '/linux-passwordbased'].includes(currentPath);

      if (routedPage === 'login') {
        setActivePage('login');
        return;
      }

      if (!routedPage) {
        window.location.href = '/home';
        return;
      }

      setActivePage(routedPage);
      setActiveNavTab(routedPage.startsWith('sessionMonitoring') || routedPage === 'businessAssets' ? 'stack' : 'file');
    };
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleCloseOverlay = () => {
    setActiveOverlay(null);
  };

  const handleOpenDetails = (variant) => {
    setDetailsVariant(variant);
    setActiveOverlay('details');
  };

  if (activePage === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (activePage === 'windowsTerminal') {
    return <WindowsTerminalPage />;
  }

  if (activePage === 'sessionMonitoring' || activePage === 'sessionMonitoringRtsm') {
    return <SessionMonitoringPage initialView={activePage === 'sessionMonitoringRtsm' ? 'rtsm' : 'session'} />;
  }

  if (activePage === 'sessionLogView') {
    return <SessionLogViewPage onBack={() => window.history.back()} />;
  }

  if (activePage === 'accessProfiler' || activePage === 'accessAssignment') {
    return <AccessControlPage initialView={activePage === 'accessAssignment' ? 'assignment' : 'profiler'} />;
  }

  return (
    <div className="app-viewport">
      {/* Top Header */}
      <TopHeader
        activeOverlay={activeOverlay}
        setActiveOverlay={setActiveOverlay}
        activePage={activePage}
        isAdmin={isAdmin}
      />

      {/* Launcher Popup */}
      {activeOverlay === 'launcher' && (
        <ApplicationLauncher onClose={handleCloseOverlay} isAdmin={isAdmin} />
      )}

      {/* Main Body Shell (Left Rail + Secondary Sidebar + Main Content) */}
      <div className="app-body-container">
        <LeftNavigation
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isAdmin={isAdmin}
        />
        <SecondarySidebar
          isSidebarOpen={isSidebarOpen}
          activeNavTab={activeNavTab}
          activePage={activePage}
          onOpenDetails={handleOpenDetails}
          isAdmin={isAdmin}
        />
        <MainContent
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          activePage={activePage}
          onOpenDetails={handleOpenDetails}
        />
      </div>

      {/* Sticky Bottom Footer */}
      <Footer />

      {/* Right Side Drawers */}
      {activeOverlay === 'profile' && (
        <ProfileDrawer onClose={handleCloseOverlay} />
      )}

      {activeOverlay === 'notifications' && (
        <NotificationDrawer onClose={handleCloseOverlay} />
      )}

      {activeOverlay === 'details' && (
        <DetailsDrawer variant={detailsVariant} onClose={handleCloseOverlay} />
      )}
    </div>
  );
}
