import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, ArrowRight, ArrowLeft, Save } from 'lucide-react';

interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'essay' | 'true-false';
  options?: string[];
  correctAnswer: string;
  points: number;
}

interface QuizProps {
  quizId: string;
  title: string;
  description?: string;
  timeLimit?: number; // in minutes
  questions: QuizQuestion[];
  quizType?: 'quiz' | 'pre-test' | 'post-test';
  onComplete?: (score: number, answers: Record<string, string>) => void;
}

const QuizComponent: React.FC<QuizProps> = ({
  quizId,
  title,
  description,
  timeLimit,
  questions,
  quizType = 'quiz',
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeLimit ? timeLimit * 60 : null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Start timer when quiz starts
  useEffect(() => {
    if (!quizStarted || !timeLimit || quizCompleted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizStarted, timeLimit, quizCompleted]);
  
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };
  
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    
    questions.forEach(question => {
      totalPoints += question.points;
      
      if (question.type === 'essay') {
        // For essay questions, we'll need manual grading
        // For now, we'll just mark it as pending
        return;
      }
      
      if (answers[question.id] === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });
    
    return Math.round((earnedPoints / totalPoints) * 100);
  };
  
  const handleSubmitQuiz = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
      setQuizCompleted(true);
      
      if (onComplete) {
        onComplete(calculatedScore, answers);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  const renderQuestionType = (question: QuizQuestion) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  className="mt-1"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'true-false':
        return (
          <div className="space-y-3">
            <label className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name={`question-${question.id}`}
                value="true"
                checked={answers[question.id] === 'true'}
                onChange={() => handleAnswerChange(question.id, 'true')}
                className="mt-1"
              />
              <span>Benar</span>
            </label>
            <label className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <input
                type="radio"
                name={`question-${question.id}`}
                value="false"
                checked={answers[question.id] === 'false'}
                onChange={() => handleAnswerChange(question.id, 'false')}
                className="mt-1"
              />
              <span>Salah</span>
            </label>
          </div>
        );
      
      case 'essay':
        return (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Tulis jawaban Anda di sini..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={5}
          />
        );
      
      default:
        return null;
    }
  };
  
  const renderQuizResults = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Kuis Selesai!</h3>
          <p className="text-gray-600">
            {score !== null ? (
              <>
                Nilai Anda: <span className="font-semibold text-primary">{score}</span> dari 100
              </>
            ) : (
              'Jawaban Anda telah dikirim dan sedang dinilai.'
            )}
          </p>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={() => setShowResults(!showResults)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            {showResults ? 'Sembunyikan Detail' : 'Lihat Detail Jawaban'}
          </button>
        </div>
        
        {showResults && (
          <div className="space-y-6 mt-6">
            {questions.map((question, index) => {
              const isCorrect = question.type !== 'essay' && answers[question.id] === question.correctAnswer;
              
              return (
                <div 
                  key={question.id} 
                  className={`p-4 rounded-lg border ${question.type === 'essay' ? 'border-gray-200' : isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Pertanyaan {index + 1}</h4>
                    {question.type !== 'essay' && (
                      <span className={`px-2 py-1 rounded-full text-xs ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isCorrect ? 'Benar' : 'Salah'}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-700">{question.text}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700">Jawaban Anda:</p>
                    <p className="mt-1 text-gray-600">{answers[question.id] || '-'}</p>
                  </div>
                  
                  {question.type !== 'essay' && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700">Jawaban Benar:</p>
                      <p className="mt-1 text-green-600">{question.correctAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
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
            onClick={() => setError(null)}
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
  
  if (quizCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderQuizResults()}
      </div>
    );
  }
  
  if (!quizStarted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          
          {description && (
            <p className="text-gray-600">{description}</p>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg inline-block mx-auto">
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Jenis:</span> {quizType === 'pre-test' ? 'Pre-Test' : quizType === 'post-test' ? 'Post-Test' : 'Kuis'}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Jumlah Pertanyaan:</span> {questions.length}
              </p>
              {timeLimit && (
                <p className="text-gray-700">
                  <span className="font-medium">Batas Waktu:</span> {timeLimit} menit
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleStartQuiz}
              className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Mulai {quizType === 'pre-test' ? 'Pre-Test' : quizType === 'post-test' ? 'Post-Test' : 'Kuis'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        
        {timeRemaining !== null && (
          <div className="flex items-center space-x-2 text-gray-700">
            <Clock className="h-5 w-5" />
            <span className={`font-medium ${timeRemaining < 60 ? 'text-red-500' : ''}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-full bg-primary rounded-full"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      {/* Question */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-gray-700">Pertanyaan {currentQuestionIndex + 1} dari {questions.length}</h4>
          <span className="text-sm text-gray-500">{currentQuestion.points} poin</span>
        </div>
        <p className="text-gray-900 text-lg">{currentQuestion.text}</p>
      </div>
      
      {/* Answer options */}
      <div className="mb-8">
        {renderQuestionType(currentQuestion)}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Sebelumnya
        </button>
        
        {isLastQuestion ? (
          <button
            onClick={handleSubmitQuiz}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            <Save className="h-4 w-4 mr-2" />
            Selesai
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Selanjutnya
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
        )}
      </div>
      
      {/* Question navigation dots */}
      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          {questions.map((_, index) => {
            const isAnswered = answers[questions[index].id] !== undefined;
            const isCurrent = index === currentQuestionIndex;
            
            return (
              <button
                key={index}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`h-3 w-3 rounded-full transition-colors ${isCurrent ? 'bg-primary' : isAnswered ? 'bg-green-500' : 'bg-gray-300'}`}
                aria-label={`Go to question ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;