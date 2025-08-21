import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Video, FileType, Clock, Calendar, User } from 'lucide-react';
import VideoPlayer from '../Learning/VideoPlayer';
import QuizComponent from '../Learning/QuizComponent';
import { Module, Quiz } from '../../types';

interface MaterialDetailProps {
  material?: Module;
  onComplete?: (materialId: string) => void;
}

const MaterialDetail: React.FC<MaterialDetailProps> = ({ material, onComplete }) => {
  const [loading, setLoading] = useState(!material);
  const [error, setError] = useState<string | null>(null);
  const [currentMaterial, setCurrentMaterial] = useState<Module | null>(material || null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  
  const { materialId } = useParams<{ materialId: string }>();
  
  useEffect(() => {
    if (material) {
      setCurrentMaterial(material);
      setLoading(false);
      return;
    }
    
    // Jika material tidak diberikan sebagai prop, ambil dari API berdasarkan materialId
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        // Simulasi API call
        // const response = await fetch(`/api/materials/${materialId}`);
        // const data = await response.json();
        // setCurrentMaterial(data);
        
        // Untuk sementara gunakan data dummy
        setTimeout(() => {
          setCurrentMaterial({
            id: materialId || '1',
            title: 'Pengenalan Bahasa Arab',
            content: 'https://example.com/sample-video.mp4',
            type: 'video',
            sessionId: '1',
            quizzes: [
              {
                id: '1',
                title: 'Kuis Pengenalan Bahasa Arab',
                questions: [
                  {
                    id: '1',
                    text: 'Apa huruf pertama dalam alfabet Arab?',
                    type: 'multiple-choice',
                    options: ['Alif', 'Ba', 'Ta', 'Jim'],
                    correctAnswer: 'Alif',
                    points: 10
                  },
                  {
                    id: '2',
                    text: 'Bahasa Arab ditulis dari kanan ke kiri',
                    type: 'true-false',
                    correctAnswer: 'true',
                    points: 5
                  }
                ],
                moduleId: materialId || '1',
                timeLimit: 10,
                createdAt: new Date()
              }
            ],
            createdAt: new Date()
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Gagal memuat materi. Silakan coba lagi.');
        setLoading(false);
      }
    };
    
    fetchMaterial();
  }, [material, materialId]);
  
  const markAsCompleted = (id: string) => {
    // Implementasi untuk menandai materi sebagai selesai
    console.log(`Material ${id} marked as completed`);
    if (onComplete) {
      onComplete(id);
    }
  };
  
  const handleQuizComplete = (score: number, answers: Record<string, string>) => {
    console.log(`Quiz completed with score: ${score}`);
    console.log('Answers:', answers);
    
    // Setelah kuis selesai, kembali ke tampilan materi
    setActiveQuiz(null);
    
    // Tandai materi sebagai selesai
    if (currentMaterial) {
      markAsCompleted(currentMaterial.id);
    }
  };
  
  const renderContent = () => {
    if (!currentMaterial) return null;
    
    if (activeQuiz) {
      return (
        <QuizComponent
          quizId={activeQuiz.id}
          title={activeQuiz.title}
          timeLimit={activeQuiz.timeLimit}
          questions={activeQuiz.questions}
          onComplete={handleQuizComplete}
        />
      );
    }
    
    if (currentMaterial.type === 'video') {
      return (
        <VideoPlayer 
          src={currentMaterial.content} 
          title={currentMaterial.title} 
          onComplete={() => markAsCompleted(currentMaterial.id)}
        />
      );
    } else if (currentMaterial.type === 'document') {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center items-center py-8">
            <a 
              href={currentMaterial.content} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
            >
              <FileType className="mr-2 h-5 w-5" />
              Buka Dokumen
            </a>
          </div>
        </div>
      );
    } else {
      // Render text content
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: currentMaterial.content }} />
          </div>
        </div>
      );
    }
  };
  
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
  
  if (!currentMaterial) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Materi tidak ditemukan.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{currentMaterial.title}</h1>
        
        <div className="flex flex-wrap gap-4 text-gray-600 mt-4">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            <span>Dibuat pada: {new Date(currentMaterial.createdAt).toLocaleDateString('id-ID')}</span>
          </div>
          
          <div className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            <span>Tipe: {
              currentMaterial.type === 'video' ? 'Video' : 
              currentMaterial.type === 'document' ? 'Dokumen' : 'Teks'
            }</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      {renderContent()}
      
      {/* Quizzes */}
      {!activeQuiz && currentMaterial.quizzes && currentMaterial.quizzes.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Kuis Terkait</h2>
          
          <div className="space-y-4">
            {currentMaterial.quizzes.map(quiz => (
              <div key={quiz.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{quiz.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{quiz.questions.length} pertanyaan</p>
                  </div>
                  
                  <button
                    onClick={() => setActiveQuiz(quiz)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                  >
                    Mulai Kuis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialDetail;