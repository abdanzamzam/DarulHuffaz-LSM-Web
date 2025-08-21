import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { toggleSidebar, setCurrentPage } from './store/slices/uiSlice';
import LoginForm from './components/Auth/LoginForm';
import Navigation from './components/Layout/Navigation';
import Header from './components/Layout/Header';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import TeacherDashboard from './components/Dashboard/TeacherDashboard';
import StudentDashboard from './components/Dashboard/StudentDashboard';
import ClassesPage from './components/Classes/ClassesPage';
import DiscussionForum from './components/Discussion/DiscussionForum';
import QuizComponent from './components/Learning/QuizComponent';
import UserProfile from './components/Profile/UserProfile';
import EditProfile from './components/Profile/EditProfile';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();
  const dispatch = useAppDispatch();
  const { currentPage, isSidebarCollapsed } = useAppSelector(state => state.ui);

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  const renderContent = () => {
    if (currentPage === 'dashboard') {
      switch (user.role) {
        case 'admin':
          return <AdminDashboard />;
        case 'teacher':
          return <TeacherDashboard />;
        case 'student':
          return <StudentDashboard />;
        default:
          return <div>Role tidak dikenali</div>;
      }
    } else if (currentPage === 'classes') {
      return <ClassesPage />;
    } else if (currentPage === 'discussions') {
      return <DiscussionForum title="Forum Diskusi Kelas" />;
    } else if (currentPage === 'profile') {
      return <UserProfile />;
    } else if (currentPage === 'edit-profile') {
      return <EditProfile />;
    } else if (currentPage === 'quizzes') {
      // Tampilkan daftar kuis
    } else if (currentPage === 'quiz-detail' && quizId) {
      return (
        <QuizComponent 
          quizId={quizId}
          title={currentQuiz.title}
          description={currentQuiz.description}
          timeLimit={currentQuiz.timeLimit}
          questions={currentQuiz.questions}
          quizType={currentQuiz.type}
          onComplete={(score, answers) => handleQuizComplete(quizId, score, answers)}
        />
      );
    }
    
    // Placeholder for other pages
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Halaman {currentPage}
        </h2>
        <p className="text-gray-600">
          Fitur ini sedang dalam pengembangan dan akan segera tersedia.
        </p>
      </div>
    );
  };

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  
  const handlePageChange = (page: string) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Sidebar Navigation */}
      <div className="lg:hidden">
        <Navigation 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:h-screen">
        <div className={`flex-shrink-0 lg:h-screen lg:sticky lg:top-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-80'
        }`}>
          <Navigation 
            currentPage={currentPage} 
            onPageChange={handlePageChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:hidden">
        <Header />
        <main className="flex-1 p-3 sm:p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;