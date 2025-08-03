import React from 'react';
import { BookOpen, Users, ClipboardCheck, Award, Plus, Calendar } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
  const stats = [
    { label: 'Kelas Saya', value: '4', icon: BookOpen, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Total Siswa', value: '89', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Kuis Aktif', value: '12', icon: ClipboardCheck, color: 'from-purple-500 to-purple-600' },
    { label: 'Tugas Menunggu', value: '23', icon: Award, color: 'from-orange-500 to-orange-600' },
  ];

  const classes = [
    { name: 'Fiqih Ibadah', students: 28, progress: 85, nextClass: 'Senin, 08:00' },
    { name: 'Tafsir Al-Quran', students: 25, progress: 72, nextClass: 'Selasa, 10:00' },
    { name: 'Hadits Akhlak', students: 22, progress: 90, nextClass: 'Rabu, 14:00' },
    { name: 'Sejarah Islam', students: 14, progress: 65, nextClass: 'Kamis, 09:00' },
  ];

  const recentSubmissions = [
    { student: 'Ahmad Zaki', assignment: 'Tugas Fiqih - Shalat', submitted: '2 jam lalu', status: 'new' },
    { student: 'Fatimah Noor', assignment: 'Kuis Tafsir Surat Al-Baqarah', submitted: '4 jam lalu', status: 'graded' },
    { student: 'Muhammad Iqbal', assignment: 'Esai Hadits Akhlak', submitted: '1 hari lalu', status: 'new' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Guru</h1>
        <p className="text-sm sm:text-base text-gray-600">Kelola pembelajaran dan pantau progress siswa Anda.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mt-1 sm:mt-2">{stat.value}</p>
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
        {/* My Classes */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Kelas Saya</h3>
            <button className="flex items-center space-x-1 sm:space-x-2 text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium self-start sm:self-auto">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Tambah Materi</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {classes.map((cls, index) => (
              <div key={index} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate pr-2">{cls.name}</h4>
                  <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">{cls.students} siswa</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-3">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-emerald-600 font-medium">{cls.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div
                        className="bg-emerald-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                        style={{ width: `${cls.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-500">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Kelas berikutnya: </span>
                  <span className="sm:hidden">Next: </span>
                  {cls.nextClass}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tugas Terbaru</h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {recentSubmissions.map((submission, index) => (
              <div key={index} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900">{submission.student}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 pr-2">{submission.assignment}</p>
                    <p className="text-xs text-gray-500 mt-1 sm:mt-2">{submission.submitted}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    submission.status === 'new'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {submission.status === 'new' ? 'Baru' : 'Dinilai'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;