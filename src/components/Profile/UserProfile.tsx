import React from 'react';
import { User, Mail, Calendar, Award, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAppDispatch } from '../../store/hooks';
import { setCurrentPage } from '../../store/slices/uiSlice';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'teacher': return 'Guru';
      case 'student': return 'Siswa';
      default: return role;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleBackToDashboard = () => {
    dispatch(setCurrentPage('dashboard'));
  };

  const handleEditProfile = () => {
    dispatch(setCurrentPage('edit-profile'));
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center text-gray-600 hover:text-emerald-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">Kembali ke Dashboard</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Profil Pengguna</h1>
          <p className="text-sm sm:text-base text-gray-600">Informasi dan pengaturan akun Anda</p>
        </div>
        <button
          onClick={handleEditProfile}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Edit Profil
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-32 sm:h-48 relative">
          <div className="absolute -bottom-16 left-6 sm:left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-6 px-6 sm:px-8">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mt-2">
            {getRoleLabel(user.role)}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-base text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Tanggal Bergabung</p>
                <p className="text-base text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            {user.role === 'student' && (
              <div className="flex items-start">
                <Award className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">ID Siswa</p>
                  <p className="text-base text-gray-900">S-{user.id.toString().padStart(4, '0')}</p>
                </div>
              </div>
            )}

            {user.role === 'teacher' && (
              <div className="flex items-start">
                <Award className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">ID Guru</p>
                  <p className="text-base text-gray-900">T-{user.id.toString().padStart(4, '0')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">Belum ada aktivitas terbaru.</p>
          </div>
        </div>

        {/* Role-specific Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {user.role === 'admin' ? 'Informasi Admin' : 
             user.role === 'teacher' ? 'Informasi Guru' : 'Informasi Siswa'}
          </h3>
          <div className="space-y-3">
            {user.role === 'student' && (
              <div>
                <p className="text-sm text-gray-500">Kelas</p>
                <p className="text-base text-gray-900">Kelas Tahfidz Al-Quran</p>
              </div>
            )}
            {user.role === 'teacher' && (
              <div>
                <p className="text-sm text-gray-500">Mengajar</p>
                <p className="text-base text-gray-900">3 Kelas</p>
              </div>
            )}
            {user.role === 'admin' && (
              <div>
                <p className="text-sm text-gray-500">Hak Akses</p>
                <p className="text-base text-gray-900">Penuh</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;