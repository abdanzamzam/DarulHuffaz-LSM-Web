import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchClasses, fetchClassById } from '../../store/slices/classesSlice';
import { BookOpen, Users, Calendar } from 'lucide-react';

const ClassList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { classes, isLoading, error } = useAppSelector(state => state.classes);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleClassClick = (classId: string) => {
    dispatch(fetchClassById(classId));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchClasses())}
            className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Daftar Kelas</h2>
        {user?.role === 'admin' || user?.role === 'teacher' ? (
          <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
            <span className="hidden sm:inline">Tambah Kelas</span>
            <span className="sm:hidden">+</span>
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div 
            key={classItem.id}
            onClick={() => handleClassClick(classItem.id)}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{classItem.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{classItem.description}</p>
              </div>
              <div className="bg-emerald-100 p-2 rounded-lg">
                <BookOpen className="text-emerald-600" size={20} />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Users size={16} />
                <span>28 Siswa</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Senin, 08:00</span>
              </div>
            </div>
          </div>
        ))}

        {classes.length === 0 && (
          <div className="col-span-full bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500">Belum ada kelas yang tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassList;