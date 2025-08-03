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
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
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
    <nav className="bg-white shadow-lg border-r border-gray-200 h-full">
      <div className="p-4 sm:p-6">
        <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold text-gray-900">LMS Pesantren</h1>
            <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Sistem Pembelajaran</p>
          </div>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-medium text-xs sm:text-sm truncate">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;