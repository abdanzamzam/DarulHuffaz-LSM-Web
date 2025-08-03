import React from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, Award } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { label: 'Total Siswa', value: '245', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12', shortLabel: 'Siswa' },
    { label: 'Total Guru', value: '18', icon: GraduationCap, color: 'from-emerald-500 to-emerald-600', change: '+2', shortLabel: 'Guru' },
    { label: 'Kelas Aktif', value: '12', icon: BookOpen, color: 'from-purple-500 to-purple-600', change: '+1', shortLabel: 'Kelas' },
    { label: 'Tingkat Kehadiran', value: '92%', icon: Calendar, color: 'from-orange-500 to-orange-600', change: '+5%', shortLabel: 'Hadir' },
  ];

  const recentActivities = [
    { user: 'Ustadz Ahmad', action: 'menambahkan materi baru', subject: 'Fiqih Ibadah', time: '2 jam lalu' },
    { user: 'Fatimah Zahra', action: 'menyelesaikan kuis', subject: 'Tafsir Al-Quran', time: '3 jam lalu' },
    { user: 'Muhammad Ali', action: 'mengumpulkan tugas', subject: 'Hadits Akhlak', time: '5 jam lalu' },
    { user: 'Ustadzah Khadijah', action: 'membuat kelas baru', subject: 'Bahasa Arab Dasar', time: '1 hari lalu' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Administrator</h1>
        <p className="text-sm sm:text-base text-gray-600">Selamat datang kembali! Berikut adalah ringkasan sistem hari ini.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">
                    <span className="sm:hidden">{stat.shortLabel}</span>
                    <span className="hidden sm:inline">{stat.label}</span>
                  </p>
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1 sm:mt-2">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                    <span className="text-xs sm:text-sm text-emerald-600 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center mt-2 sm:mt-0 self-end sm:self-auto`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action} pada{' '}
                    <span className="font-medium text-emerald-600">{activity.subject}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-emerald-600 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-emerald-600">Tambah Pengguna</p>
            </button>
            <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-emerald-600 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-emerald-600">Buat Kelas</p>
            </button>
            <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-emerald-600 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-emerald-600">Lihat Laporan</p>
            </button>
            <button className="p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors group">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-emerald-600 mx-auto mb-1 sm:mb-2" />
              <p className="text-xs sm:text-sm font-medium text-gray-600 group-hover:text-emerald-600">Jadwal Kelas</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;