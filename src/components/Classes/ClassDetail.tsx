import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setSelectedClass } from '../../store/slices/classesSlice';
import { Users, Calendar, Clock, BookOpen, ArrowLeft } from 'lucide-react';

const ClassDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedClass, isLoading } = useAppSelector(state => state.classes);
  const { user } = useAppSelector(state => state.auth);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!selectedClass) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
        <p className="text-gray-500">Silakan pilih kelas untuk melihat detail.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => dispatch(setSelectedClass(null))}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-gray-900">Detail Kelas</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-emerald-500 p-6 text-white">
          <h3 className="text-2xl font-bold">{selectedClass.name}</h3>
          <p className="mt-2 opacity-90">{selectedClass.description}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Users className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Jumlah Siswa</p>
                <p className="font-semibold">28 Siswa</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Calendar className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Jadwal</p>
                <p className="font-semibold">Senin, 08:00 WIB</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <Clock className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Durasi</p>
                <p className="font-semibold">90 Menit</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <BookOpen size={18} />
              <span>Materi Pembelajaran</span>
            </h4>

            <div className="space-y-3">
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">Pengenalan Thaharah</h5>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Pertemuan 1</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Mempelajari konsep dasar bersuci dalam Islam</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">Wudhu dan Tayammum</h5>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Pertemuan 2</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Tata cara berwudhu dan tayammum yang benar</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium">Mandi Wajib</h5>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">Pertemuan 3</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Ketentuan dan tata cara mandi wajib</p>
              </div>
            </div>

            {user?.role === 'admin' || user?.role === 'teacher' ? (
              <button className="mt-4 w-full py-2 border border-emerald-500 text-emerald-500 rounded-lg hover:bg-emerald-50 transition-colors">
                Tambah Materi Baru
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetail;