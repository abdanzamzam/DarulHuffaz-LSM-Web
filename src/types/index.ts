export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  avatar?: string;
  createdAt: Date;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  students: Student[];
  createdAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  classId: string;
  teacherId: string;
  sessions: Session[];
  createdAt: Date;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  modules: Module[];
  createdAt: Date;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'video' | 'document';
  sessionId: string;
  quizzes: Quiz[];
  createdAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  moduleId: string;
  timeLimit?: number;
  createdAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'essay' | 'true-false';
  options?: string[];
  correctAnswer: string;
  points: number;
}

export interface Student extends User {
  studentId: string;
  classId: string;
  progress: Progress[];
}

export interface Teacher extends User {
  teacherId: string;
  classes: Class[];
}

export interface Progress {
  id: string;
  studentId: string;
  moduleId: string;
  completed: boolean;
  score?: number;
  completedAt?: Date;
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
  createdBy: string;
}

export interface Discussion {
  id: string;
  classId?: string;
  moduleId?: string;
  title: string;
  posts: DiscussionPost[];
  createdAt: Date;
}

export interface DiscussionPost {
  id: string;
  discussionId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: 'admin' | 'teacher' | 'student';
  content: string;
  createdAt: Date;
  likes: number;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userRole: 'admin' | 'teacher' | 'student';
  content: string;
  createdAt: Date;
  likes: number;
}

export interface VideoProgress {
  id: string;
  studentId: string;
  moduleId: string;
  videoId: string;
  currentTime: number;
  completed: boolean;
  completedAt?: Date;
}

export interface QuizResult {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  answers: Record<string, string>;
  completedAt: Date;
  gradedAt?: Date;
  gradedBy?: string;
  feedback?: string;
}