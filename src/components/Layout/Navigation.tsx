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
  X
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
      {/* Mobile/Tablet Overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggleCollapse}
        />
      )}
      
      <nav className={`bg-white shadow-lg border-r border-gray-200 h-full transition-all duration-300 ease-in-out z-50 ${
        isCollapsed 
          ? 'w-16 lg:w-20' 
          : 'w-64 lg:w-80'
      } ${
        isCollapsed 
          ? 'fixed lg:relative' 
          : 'fixed lg:relative'
      }`}>
        <div className={`p-4 ${isCollapsed ? 'sm:p-3' : 'sm:p-6'}`}>
          {/* Header with Toggle Button */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div className={`flex items-center transition-all duration-300 ${
              isCollapsed ? 'justify-center w-full' : 'space-x-2 sm:space-x-3'
            }`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-base sm:text-xl font-bold text-gray-900">LMS Pesantren</h1>
                  <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Sistem Pembelajaran</p>
                </div>
              )}
            </div>
            
            {/* Toggle Button - Only show on mobile/tablet */}
            <button
              onClick={onToggleCollapse}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isCollapsed ? (
                <Menu className="w-5 h-5" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={onToggleCollapse}
            className={`hidden lg:flex items-center justify-center w-full p-2 mb-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
              isCollapsed ? 'mb-6' : ''
            }`}
          >
            <Menu className="w-5 h-5" />
          </button>

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
                        : 'space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3'
                    } ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium text-xs sm:text-sm truncate">
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