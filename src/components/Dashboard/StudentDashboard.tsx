import React from 'react';
import { BookOpen, CheckCircle, Clock, Award, Play, Calendar } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const stats = [
    { label: 'Materi Selesai', value: '24', total: '30', icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Kuis Dikerjakan', value: '18', total: '22', icon: Award, color: 'from-blue-500 to-blue-600' },
    { label: 'Tugas Pending', value: '3', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'Rata-rata Nilai', value: '87', icon: Award, color: 'from-purple-500 to-purple-600' },
  ];

  const ongoingLessons = [
    { 
      title: 'Fiqih Ibadah - Thaharah', 
      progress: 75, 
      timeLeft: '15 menit',
      type: 'video',
      description: 'Mempelajari tata cara bersuci dalam Islam'
    },
    { 
      title: 'Tafsir Al-Quran - Surat Al-Baqarah', 
      progress: 45, 
      timeLeft: '25 menit',
      type: 'text',
      description: 'Memahami makna dan hikmah ayat-ayat Al-Quran'
    },
    { 
      title: 'Hadits Akhlak - Berbakti kepada Orang Tua', 
      progress: 60, 
      timeLeft: '10 menit',
      type: 'quiz',
      description: 'Kuis tentang hadits-hadits akhlak mulia'
    },
  ];

  const upcomingAssignments = [
    { title: 'Esai Sejarah Islam', subject: 'Sejarah', due: '2 hari lagi', priority: 'high' },
    { title: 'Kuis Bahasa Arab', subject: 'Bahasa Arab', due: '3 hari lagi', priority: 'medium' },
    { title: 'Hafalan Surat Al-Mulk', subject: 'Tahfidz', due: '1 minggu lagi', priority: 'low' },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'quiz': return Award;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Dashboard Siswa</h1>
        <p className="text-sm sm:text-base text-gray-600">Mari lanjutkan perjalanan belajar Anda hari ini!</p>
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
                  <div className="flex items-center space-x-1 sm:space-x-2 mt-1 sm:mt-2">
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.total && <span className="text-xs sm:text-sm text-gray-500">/ {stat.total}</span>}
                  </div>
                  {stat.total && (
                    <div className="w-full bg-gray-200 rounded-full h-1 sm:h-1.5 mt-1 sm:mt-2">
                      <div
                        className="bg-emerald-500 h-1 sm:h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(parseInt(stat.value) / parseInt(stat.total)) * 100}%` }}
                      ></div>
                    </div>
                  )}
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
        {/* Continue Learning */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Lanjutkan Belajar</h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {ongoingLessons.map((lesson, index) => {
              const TypeIcon = getTypeIcon(lesson.type);
              return (
                <div key={index} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer group">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                      <TypeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {lesson.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{lesson.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 sm:w-24 bg-gray-200 rounded-full h-1.5 sm:h-2">
                            <div
                              className="bg-emerald-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                              style={{ width: `${lesson.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs sm:text-sm text-emerald-600 font-medium">{lesson.progress}%</span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">{lesson.timeLeft}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tugas Mendatang</h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-xs sm:text-sm font-medium">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
                      <h4 className="text-sm sm:text-base font-medium text-gray-900">{assignment.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : assignment.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      } self-start sm:self-auto`}>
                        {assignment.priority === 'high' ? 'Urgent' : 
                         assignment.priority === 'medium' ? 'Normal' : 'Rendah'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">{assignment.subject}</p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Tenggat: {assignment.due}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;