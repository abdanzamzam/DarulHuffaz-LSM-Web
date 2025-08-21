import React from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Calendar, 
  BarChart3, 
  Settings,
  GraduationCap,
  ClipboardList,
  Award,
  Menu,
  X,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onPageChange, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'profile', label: 'Profil Saya', icon: User },
    ];

    switch (user?.role) {
      case 'admin':
        return [
          ...commonItems,
          { id: 'users', label: 'Manajemen Pengguna', icon: Users },
          { id: 'classes', label: 'Manajemen Kelas', icon: GraduationCap },
          { id: 'content', label: 'Manajemen Konten', icon: BookOpen },
          { id: 'reports', label: 'Laporan', icon: BarChart3 },
          { id: 'settings', label: 'Pengaturan', icon: Settings },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { id: 'materials', label: 'Materi Pembelajaran', icon: BookOpen },
          { id: 'quizzes', label: 'Kuis & Ujian', icon: FileText },
          { id: 'attendance', label: 'Absensi', icon: Calendar },
          { id: 'grades', label: 'Nilai Siswa', icon: Award },
        ];
      case 'student':
        return [
          ...commonItems,
          { id: 'learn', label: 'Belajar', icon: BookOpen },
          { id: 'assignments', label: 'Tugas', icon: ClipboardList },
          { id: 'progress', label: 'Progress Saya', icon: BarChart3 },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">LMS Darul Huffaz</h1>
              </div>
            </div>
            <button
              onClick={onToggleCollapse}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {!isCollapsed && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onToggleCollapse}
          />
        )}

        {/* Mobile Menu */}
        <div 
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isCollapsed ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <div className="p-6">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">LMS Darul Huffaz</h1>
                  <p className="text-sm text-gray-500">Sistem Pembelajaran</p>
                </div>
              </div>
              <button
                onClick={onToggleCollapse}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Items */}
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        onPageChange(item.id);
                        onToggleCollapse(); // Close menu after selection
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white shadow-lg border-r border-gray-200 h-full transition-all duration-300 ease-in-out">
        <div className={`p-4 ${isCollapsed ? 'p-3' : 'p-6'}`}>
          {/* Desktop Header with Toggle Button */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center transition-all duration-300 ${
              isCollapsed ? 'justify-center w-full' : 'space-x-3'
            }`}>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold text-gray-900">LMS Darul Huffaz</h1>
                  <p className="text-sm text-gray-500">Sistem Pembelajaran</p>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className={`flex items-center justify-center w-full p-2 mb-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
              isCollapsed ? 'mb-6' : ''
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Menu Items */}
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onPageChange(item.id)}
                    className={`w-full flex items-center transition-all duration-200 rounded-lg ${
                      isCollapsed 
                        ? 'justify-center p-3' 
                        : 'space-x-3 px-4 py-3'
                    } ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium text-sm truncate">
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;