// Sample Data for EduLearn App

// Mock Firebase Auth Functions (Replace with actual Firebase)
export const mockAuth = {
  signIn: async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (email === 'test@test.com' && password === 'password') {
      return { user: { uid: '123', email, displayName: 'John Doe' } };
    }
    throw new Error('Invalid credentials');
  },
  signUp: async (email, password, name) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: { uid: '123', email, displayName: name } };
  },
  signOut: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

// Sample Courses Data
export const coursesData = [
  { 
    id: '1', 
    title: 'Mathematics', 
    progress: 75, 
    lessons: 20, 
    image: '',
    description: 'Master fundamental mathematical concepts and problem-solving skills',
    category: 'Science',
    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    students: 1250
  },
  { 
    id: '2', 
    title: 'Science', 
    progress: 60, 
    lessons: 15, 
    image: '',
    description: 'Explore the wonders of physics, chemistry, and biology',
    category: 'Science',
    instructor: 'Prof. Michael Brown',
    rating: 4.6,
    students: 980
  },
  { 
    id: '3', 
    title: 'English', 
    progress: 90, 
    lessons: 25, 
    image: '',
    description: 'Enhance your language skills and literary analysis',
    category: 'Languages',
    instructor: 'Dr. Emily Wilson',
    rating: 4.9,
    students: 2100
  },
  { 
    id: '4', 
    title: 'History', 
    progress: 45, 
    lessons: 18, 
    image: '',
    description: 'Journey through time and explore world civilizations',
    category: 'Humanities',
    instructor: 'Prof. David Chen',
    rating: 4.7,
    students: 1560
  },
];

// Sample Lessons Data
export const lessonsData = [
  { 
    id: '1', 
    title: 'Introduction to Algebra', 
    duration: '15 min', 
    completed: true,
    description: 'Learn the basics of algebraic expressions and equations',
    videoUrl: '',
    resources: ['PDF Notes', 'Practice Problems', 'Quiz']
  },
  { 
    id: '2', 
    title: 'Linear Equations', 
    duration: '20 min', 
    completed: true,
    description: 'Master solving linear equations and their applications',
    videoUrl: '',
    resources: ['PDF Notes', 'Practice Problems', 'Quiz']
  },
  { 
    id: '3', 
    title: 'Quadratic Functions', 
    duration: '25 min', 
    completed: false,
    description: 'Explore quadratic functions and their graphs',
    videoUrl: '',
    resources: ['PDF Notes', 'Practice Problems', 'Quiz']
  },
  { 
    id: '4', 
    title: 'Polynomials', 
    duration: '30 min', 
    completed: false,
    description: 'Understand polynomial expressions and operations',
    videoUrl: '',
    resources: ['PDF Notes', 'Practice Problems', 'Quiz']
  },
];

// Sample Students Data
export const studentsData = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@email.com',
    progress: 85,
    courses: ['Mathematics', 'Science'],
    joinDate: '2024-01-15',
    avatar: ''
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@email.com',
    progress: 92,
    courses: ['English', 'History'],
    joinDate: '2024-01-20',
    avatar: ''
  },
  {
    id: '3',
    name: 'Carol White',
    email: 'carol@email.com',
    progress: 78,
    courses: ['Mathematics', 'English'],
    joinDate: '2024-02-01',
    avatar: ''
  },
  {
    id: '4',
    name: 'David Brown',
    email: 'david@email.com',
    progress: 88,
    courses: ['Science', 'History'],
    joinDate: '2024-02-10',
    avatar: ''
  },
  {
    id: '5',
    name: 'Eva Garcia',
    email: 'eva@email.com',
    progress: 95,
    courses: ['Mathematics', 'Science', 'English'],
    joinDate: '2024-02-15',
    avatar: ''
  }
];

// Sample Profile Data
export const profileData = {
  stats: {
    courses: 15,
    hours: 120,
    score: 95
  },
  achievements: [
    {
      id: '1',
      title: 'Quick Learner',
      description: 'Completed 5 courses in one month',
      icon: 'rocket'
    },
    {
      id: '2',
      title: 'Perfect Score',
      description: 'Achieved 100% in Mathematics course',
      icon: 'star'
    },
    {
      id: '3',
      title: 'Early Bird',
      description: 'Consistently active in morning sessions',
      icon: 'sunny'
    }
  ],
  recentActivity: [
    {
      id: '1',
      type: 'course_completed',
      title: 'Completed Mathematics Course',
      timestamp: '2024-03-15T10:30:00'
    },
    {
      id: '2',
      type: 'quiz_taken',
      title: 'Scored 95% in Science Quiz',
      timestamp: '2024-03-14T15:45:00'
    },
    {
      id: '3',
      type: 'certificate_earned',
      title: 'Earned English Proficiency Certificate',
      timestamp: '2024-03-13T09:15:00'
    }
  ]
}; 