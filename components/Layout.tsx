import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

export const DashboardLayout: React.FC<LayoutProps> = ({ children, role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdmin = role === UserRole.ADMIN;
  const basePath = isAdmin ? '/admin' : '/student';

  const menuItems = isAdmin ? [
    { icon: 'dashboard', label: 'Overview', path: '/admin' },
    { icon: 'receipt_long', label: 'Manage Subscriptions', path: '/admin/events' },
    { icon: 'insights', label: 'Analytics', path: '/admin/scanner' },
  ] : [
    { icon: 'dashboard', label: 'Overview', path: '/student' },
    { icon: 'subscriptions', label: 'Subscriptions', path: '/student/explore' },
    { icon: 'notifications_active', label: 'Reminders', path: '/student/ticket' },
    { icon: 'person', label: 'Profile', path: '/student/profile' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 transform bg-white transition-transform duration-200 ease-in-out border-r border-gray-200
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:flex lg:flex-col
      `}>
        <div className="flex h-16 items-center gap-3 px-6 border-b border-gray-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon name="subscriptions" />
          </div>
          <div>
            <h1 className="text-base font-bold text-text-main">SubTrack</h1>
            <p className="text-xs text-text-secondary">{isAdmin ? 'Insights Dashboard' : 'User Dashboard'}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== basePath && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-semibold' 
                    : 'text-text-secondary hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon name={item.icon} className={isActive ? 'fill-1' : ''} />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 shadow-sm">
            <div 
              className="h-9 w-9 rounded-full bg-cover bg-center" 
              style={{ backgroundImage: isAdmin 
                ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg4fmxHR2juGWSytxFi3OcBdERLyWsG5Z8532k6H2wIs9W5e5Jij-W3_pcSboFAcHMUB-2PmTvDfrE3JdbvC1Uj-u8her429kSpKVaqVMrguKs296VX5HNxK_xYqoK1MS4V9hYEiKq7ZFropvd2eOsq04EqEClAQnpGLtRf-WQQ9rBA6X0pgDLsqsfHnJB27LlfXYIDOu_DzFDfiroK1BgDBEeuBNmSJEYuGy_4boMATDF7iEy2tDhVKvSICZGGe-vqIXrdP9xY0ly")' 
                : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOyvDfAV9ucRi7H-xSOuFvJ5nHojkBelRJzIULH7u1MoshpppsdfSJKoZ8I8ImIW9cDI4Yhd_YFwVvnBCzueW-9ll_0fMFRAn6qkx_2_CVsYEZDaqIboP3_yYxJFPs5tekwUSLg8u2nySZLrjcZ3AlIH5Ekb6uVxvIxm3jPwrfJ4aKDcMN0JqoIzOH3y5jHwXAC1QvuMzuZtPInbgZZzTLecVFjEKSX16pyXidcLKjrayjy03GsBgMbEwwO4rGyNlVlP-ww8kqWt10")' 
              }}
            ></div>
            <div className="flex flex-col overflow-hidden min-w-0">
              <p className="truncate text-sm font-bold text-text-main">{isAdmin ? 'James Owner' : 'Alex M.'}</p>
              <p className="truncate text-xs text-text-secondary">{isAdmin ? 'Account Owner' : 'Pro User'}</p>
            </div>
            <button onClick={handleLogout} className="ml-auto text-text-secondary hover:text-primary">
              <Icon name="logout" size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col h-full w-full bg-[#fcfcfd]">
        {/* Mobile Header */}
        <header className="lg:hidden flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-text-main">
              <Icon name="menu" />
            </button>
            <h2 className="text-lg font-bold text-text-main">SubTrack</h2>
          </div>
          <div className="h-8 w-8 rounded-full bg-cover bg-center bg-gray-200"
               style={{ backgroundImage: isAdmin 
                ? 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCg4fmxHR2juGWSytxFi3OcBdERLyWsG5Z8532k6H2wIs9W5e5Jij-W3_pcSboFAcHMUB-2PmTvDfrE3JdbvC1Uj-u8her429kSpKVaqVMrguKs296VX5HNxK_xYqoK1MS4V9hYEiKq7ZFropvd2eOsq04EqEClAQnpGLtRf-WQQ9rBA6X0pgDLsqsfHnJB27LlfXYIDOu_DzFDfiroK1BgDBEeuBNmSJEYuGy_4boMATDF7iEy2tDhVKvSICZGGe-vqIXrdP9xY0ly")' 
                : 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOyvDfAV9ucRi7H-xSOuFvJ5nHojkBelRJzIULH7u1MoshpppsdfSJKoZ8I8ImIW9cDI4Yhd_YFwVvnBCzueW-9ll_0fMFRAn6qkx_2_CVsYEZDaqIboP3_yYxJFPs5tekwUSLg8u2nySZLrjcZ3AlIH5Ekb6uVxvIxm3jPwrfJ4aKDcMN0JqoIzOH3y5jHwXAC1QvuMzuZtPInbgZZzTLecVFjEKSX16pyXidcLKjrayjy03GsBgMbEwwO4rGyNlVlP-ww8kqWt10")' 
              }}></div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};