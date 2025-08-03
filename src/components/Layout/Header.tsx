import React from 'react';
import { Bell, Search, LogOut, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePWA } from '../../hooks/usePWA';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { isInstallable, installApp } = usePWA();

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'teacher': return 'Guru';
      case 'student': return 'Siswa';
      default: return role;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-xs sm:max-w-lg">
            <div className="relative">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari..."
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {isInstallable && (
              <button
                onClick={installApp}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                title="Install App"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <button className="p-1.5 sm:p-2 text-gray-400 hover:text-emerald-600 transition-colors relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full text-xs"></span>
            </button>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-emerald-600">{getRoleLabel(user?.role || '')}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-xs sm:text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;