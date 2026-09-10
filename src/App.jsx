'use client';

import React, { useCallback, useState, useEffect } from 'react';
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
import AccessControlPage from './components/AccessControlPage';

const routeToPage = (pathname) => {
  const route = decodeURIComponent(pathname).replace(/\/$/, '') || '/';
  const routes = {
    '/': 'login',
    '/login': 'login',
    '/admin': 'businessAssets',
    '/user': 'windows',
    '/home': 'businessAssets',
    '/faviourite': 'favourite',
    '/favourite': 'favourite',
    '/windows': 'windows',
    '/windows/terminal': 'windowsTerminal',
    '/linux passwordbased': 'linux',
    '/admin/session monitoring/home': 'sessionMonitoring',
    '/admin/session monitoring/rtsm': 'sessionMonitoringRtsm',
    '/admin/access control/profiler': 'accessProfiler',
    '/admin/access control/assignment': 'accessAssignment'
  };
  return routes[route] || null;
};

const pageToRoute = (page, isAdmin = false) => ({
  businessAssets: isAdmin ? '/admin' : '/home',
  favourite: '/faviourite',
  windows: '/windows',
  windowsTerminal: '/windows/terminal',
  linux: '/linux%20passwordbased',
  sessionMonitoring: '/admin/session%20monitoring/home',
  sessionMonitoringRtsm: '/admin/session%20monitoring/rtsm',
  accessProfiler: '/admin/access%20control/profiler',
  accessAssignment: '/admin/access%20control/assignment'
}[page] || '/home');

const isKnownUser = (username) => username === 'admin' || username === 'Rohith';

export default function App() {
  const storedUser = localStorage.getItem('auth_user');
  const isAdmin = storedUser === 'admin' || decodeURIComponent(window.location.pathname).startsWith('/admin');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return isKnownUser(localStorage.getItem('auth_user'));
  });

  const handleLogin = (username) => {
    localStorage.setItem('auth_user', username);
    setIsAuthenticated(true);
    setActivePage('businessAssets');
    setActiveNavTab('stack');
    window.history.pushState({}, '', username === 'admin' ? '/admin' : '/home');
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
    const routedPage = routeToPage(window.location.pathname);
    return routedPage && ['windows', 'linux', 'favourite'].includes(routedPage) ? 'file' : 'stack';
  });

  // activePage: 'windows' | 'businessAssets' | 'linux'
  const [activePage, setActivePage] = useState(() => {
    const routedPage = routeToPage(window.location.pathname);
    if (routedPage === 'login') {
      return 'login';
    }
    if (routedPage && routedPage !== 'login' && (isAdmin || (!routedPage.startsWith('sessionMonitoring') && !routedPage.startsWith('access')))) {
      return routedPage;
    }
    return localStorage.getItem('auth_user') === 'admin' ? 'businessAssets' : 'windows';
  });

  const navigateToPage = useCallback((page) => {
    setActivePage(page);
    const nextRoute = pageToRoute(page, isAdmin);
    if (window.location.pathname !== nextRoute) {
      window.history.pushState({}, '', nextRoute);
    }
  }, [isAdmin, setActivePage]);

  useEffect(() => {
    const handleRouteChange = () => {
      const routedPage = routeToPage(window.location.pathname);
      const currentUser = localStorage.getItem('auth_user');

      if (routedPage === 'login') {
        if (isKnownUser(currentUser)) {
          navigateToPage(currentUser === 'admin' ? 'businessAssets' : 'windows');
        } else if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
        return;
      }

      if (!routedPage) {
        if (isKnownUser(currentUser)) {
          navigateToPage(currentUser === 'admin' ? 'businessAssets' : 'windows');
        } else {
          window.history.replaceState({}, '', '/login');
          setActivePage('login');
        }
        return;
      }

      setActivePage(routedPage);
      setActiveNavTab(routedPage.startsWith('sessionMonitoring') || routedPage === 'businessAssets' ? 'stack' : 'file');
    };
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [navigateToPage]);

  const handleCloseOverlay = () => {
    setActiveOverlay(null);
  };

  const handleOpenDetails = (variant) => {
    setDetailsVariant(variant);
    setActiveOverlay('details');
  };

  if (activePage === 'login' || (!isAuthenticated && window.location.pathname === '/login')) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (activePage === 'windowsTerminal') {
    return <WindowsTerminalPage />;
  }

  if (activePage === 'sessionMonitoring' || activePage === 'sessionMonitoringRtsm') {
    return <SessionMonitoringPage setActivePage={navigateToPage} initialView={activePage === 'sessionMonitoringRtsm' ? 'rtsm' : 'session'} />;
  }

  if (activePage === 'accessProfiler' || activePage === 'accessAssignment') {
    return <AccessControlPage setActivePage={navigateToPage} initialView={activePage === 'accessAssignment' ? 'assignment' : 'profiler'} />;
  }

  return (
    <div className="app-viewport">
      {/* Top Header */}
      <TopHeader
        activeOverlay={activeOverlay}
        setActiveOverlay={setActiveOverlay}
        activePage={activePage}
      />

      {/* Launcher Popup */}
      {activeOverlay === 'launcher' && (
        <ApplicationLauncher onClose={handleCloseOverlay} setActivePage={navigateToPage} isAdmin={isAdmin} />
      )}

      {/* Main Body Shell (Left Rail + Secondary Sidebar + Main Content) */}
      <div className="app-body-container">
        <LeftNavigation
          activeNavTab={activeNavTab}
          setActiveNavTab={setActiveNavTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setActivePage={navigateToPage}
          isAdmin={isAdmin}
        />
        <SecondarySidebar
          isSidebarOpen={isSidebarOpen}
          activeNavTab={activeNavTab}
          activePage={activePage}
          onOpenDetails={handleOpenDetails}
          setActivePage={navigateToPage}
          isAdmin={isAdmin}
        />
        <MainContent
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          activePage={activePage}
          setActivePage={navigateToPage}
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
