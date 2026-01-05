export type ViewState = 'HOME' | 'CATALOG' | 'COURSE_DETAIL' | 'LMS' | 'LESSON_PLAYER' | 'RENTALS' | 'MACHINE_DETAIL' | 'SERVICES' | 'CONTACT' | 'ADMIN' | 'STUDENT_DETAIL' | 'STUDENTS_LIST' | 'ADMIN_PANEL' | 'COMPANY_GUARDIAN_PANEL';
export type Language = 'PL' | 'EN' | 'UA';
export type UserRole = 'ADMIN' | 'MANAGER' | 'STUDENT' | 'COMPANY_GUARDIAN';

export interface Course {
  id: string;
  title: string;
  category: 'UDT' | 'SEP' | 'BHP' | 'Inne';
  duration: string;
  price: string;
  image: string;
  isPopular?: boolean;
  description?: string; // Added for specific sales copy
}

export interface Machine {
  id: string;
  name: string;
  type: string;
  specs: {
    height?: string;
    weight?: string;
    capacity?: string;
  };
  image: string;
}

export interface UserCourse {
  id: string;
  courseId: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  nextLesson: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  isLocked: boolean;
  type: 'video' | 'test' | 'text';
  videoUrl?: string;
  description?: string;
  materials?: { name: string; url: string }[];
  questions?: QuizQuestion[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  moduleId?: string;
  courseId?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multiple' | 'open';
  options?: string[];
  correctAnswer?: number | number[];
  explanation?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  lessons: Lesson[];
  quiz?: Quiz;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  company?: string;
  course: string;
  progress: number;
  expirationDays: number;
  status: 'active' | 'warning' | 'expired';
  completedLessons: string[]; // Array of lesson IDs that are completed
}

export interface StudentUser {
  id: string;
  email: string;
  name: string;
  phone: string; // Required - numer telefonu obowiązkowy
  role: UserRole;
  company?: string;
  profileImage?: string;
  certifications?: Certification[]; // Historia uprawnień
  examHistory?: ExamResult[]; // Historia egzaminów
}

export interface Certification {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  issueDate: string;
  expirationDate: string;
  status: 'active' | 'expiring-soon' | 'expired'; // expiring-soon = 3-6 miesięcy przed wygaśnięciem
  certificateUrl?: string;
}

export interface ExamResult {
  id: string;
  courseId: string;
  courseName: string;
  examType: 'module' | 'final'; // test po module lub egzamin końcowy
  moduleId?: string;
  moduleName?: string;
  score: number;
  maxScore: number;
  passed: boolean;
  date: string;
  questionsAnswered: QuestionAnswer[];
}

export interface QuestionAnswer {
  questionId: string;
  question: string;
  selectedAnswer: number | number[];
  correctAnswer: number | number[];
  isCorrect: boolean;
}

export interface ExamBooking {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  examDate: string;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface CourseRecommendation {
  course: Course;
  reason: string;
  discount?: number; // procent zniżki
  isPackage?: boolean;
}

export interface CoursePackage {
  id: string;
  name: string;
  description: string;
  courses: Course[];
  originalPrice: number;
  packagePrice: number;
  discount: number; // procent zniżki
  savings: number; // kwota oszczędności
}

export interface CompanyGuardianReport {
  employeeId: string;
  employeeName: string;
  courseId: string;
  courseName: string;
  progress: number;
  status: 'active' | 'completed' | 'pending';
  completedDate?: string;
  lastActivityDate: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
}