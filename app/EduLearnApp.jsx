import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import React, { useState, useEffect } from 'react';

const { width, height } = Dimensions.get('window');

// Mock Firebase Auth Functions (Replace with actual Firebase)
const mockAuth = {
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

// Sample Data
const coursesData = [
  { id: '1', title: 'Mathematics', progress: 75, lessons: 20, image: '' },
  { id: '2', title: 'Science', progress: 60, lessons: 15, image: '' },
  { id: '3', title: 'English', progress: 90, lessons: 25, image: '' },
  { id: '4', title: 'History', progress: 45, lessons: 18, image: '' },
];

const lessonsData = [
  { id: '1', title: 'Introduction to Algebra', duration: '15 min', completed: true },
  { id: '2', title: 'Linear Equations', duration: '20 min', completed: true },
  { id: '3', title: 'Quadratic Functions', duration: '25 min', completed: false },
  { id: '4', title: 'Polynomials', duration: '30 min', completed: false },
];

const EduLearnApp = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  // type User = { uid: string; email: string; displayName: string };
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // type Course = { id: string; title: string; progress: number; lessons: number; image: string };
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showLessonModal, setShowLessonModal] = useState(false);

  // Auth Forms State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Simulate splash screen
    setTimeout(() => {
      setCurrentScreen('auth');
    }, 2000);
  }, []);

  // Authentication Functions
  const handleAuth = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await mockAuth.signUp(email, password, name);
      } else {
        const result = await mockAuth.signIn(email, password);
        setUser(result.user);
      }
      setCurrentScreen('main');
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await mockAuth.signOut();
      setUser(null);
      setCurrentScreen('auth');
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  // Splash Screen
  const SplashScreen = () => (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />
      <View style={styles.logoContainer}>
        <Ionicons name="school" size={80} color="#FFFFFF" />
        <Text style={styles.logoText}>EduLearn</Text>
        <Text style={styles.tagline}>Your Learning Companion</Text>
      </View>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );

  // Auth Screen
  const AuthScreen = () => (
    <View style={styles.authContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.authScrollView}>
        <View style={styles.authHeader}>
          <Ionicons name="school" size={60} color="#4F46E5" />
          <Text style={styles.authTitle}>Welcome to EduLearn</Text>
          <Text style={styles.authSubtitle}>
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </Text>
        </View>

        <View style={styles.authForm}>
          {isSignUp && (
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#6B7280" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#6B7280" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.authButton, loading && styles.authButtonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text style={styles.authButtonText}>
              {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchAuthButton}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text style={styles.switchAuthText}>
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // Main App with Navigation
  const MainApp = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderTabContent = () => {
      switch (activeTab) {
        case 'dashboard':
          return <DashboardScreen />;
        case 'courses':
          return <CoursesScreen />;
        case 'students':
          return <StudentsScreen />;
        case 'profile':
          return <ProfileScreen />;
        default:
          return <DashboardScreen />;
      }
    };

    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        {renderTabContent()}
        <View style={styles.bottomNav}>
          {[
            { key: 'dashboard', icon: 'home', label: 'Dashboard' },
            { key: 'courses', icon: 'book', label: 'Courses' },
            { key: 'students', icon: 'people', label: 'Students' },
            { key: 'profile', icon: 'person', label: 'Profile' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabItem, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons
                name={tab.icon}
                size={24}
                color={activeTab === tab.key ? '#4F46E5' : '#6B7280'}
              />
              <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Dashboard Screen
  const DashboardScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.displayName || 'Student'}</Text>
          <Text style={styles.subGreeting}>Ready to learn something new?</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>85%</Text>
          <Text style={styles.statLabel}>Progress</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={coursesData.slice(0, 2)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.courseCard}>
            <View style={styles.courseImagePlaceholder}>
              <Ionicons name="book-outline" size={40} color="#4F46E5" />
            </View>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseProgress}>{item.progress}% Complete</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
      </View>

      <View style={styles.activityContainer}>
        {lessonsData.slice(0, 3).map((lesson) => (
          <View key={lesson.id} style={styles.activityItem}>
            <View style={[styles.activityIcon, lesson.completed && styles.completedIcon]}>
              <Ionicons
                name={lesson.completed ? "checkmark" : "play"}
                size={16}
                color={lesson.completed ? "#10B981" : "#4F46E5"}
              />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{lesson.title}</Text>
              <Text style={styles.activityDuration}>{lesson.duration}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Courses Screen
  const CoursesScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>My Courses</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={coursesData}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.courseGridCard}
            onPress={() => {
              setSelectedCourse(item);
              setShowLessonModal(true);
            }}
          >
            <View style={styles.courseImagePlaceholder}>
              <Ionicons name="book-outline" size={30} color="#4F46E5" />
            </View>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseLessons}>{item.lessons} Lessons</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
            </View>
            <Text style={styles.courseProgress}>{item.progress}% Complete</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </ScrollView>
  );

  // Students Screen
  const StudentsScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Students</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.studentsContainer}>
        {[1, 2, 3, 4, 5].map((student) => (
          <View key={student} style={styles.studentCard}>
            <View style={styles.studentAvatar}>
              <Text style={styles.studentInitial}>S{student}</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentName}>Student {student}</Text>
              <Text style={styles.studentEmail}>student{student}@email.com</Text>
              <Text style={styles.studentProgress}>Progress: {75 + student * 5}%</Text>
            </View>
            <TouchableOpacity style={styles.studentAction}>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  // Profile Screen
  const ProfileScreen = () => (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>
              {user?.displayName ? user.displayName.charAt(0) : 'U'}
            </Text>
          </View>
          <Text style={styles.profileName}>{user?.displayName || 'User'}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>

        <View style={styles.profileStats}>
          <View style={styles.profileStatItem}>
            <Text style={styles.profileStatNumber}>15</Text>
            <Text style={styles.profileStatLabel}>Courses</Text>
          </View>
          <View style={styles.profileStatItem}>
            <Text style={styles.profileStatNumber}>120</Text>
            <Text style={styles.profileStatLabel}>Hours</Text>
          </View>
          <View style={styles.profileStatItem}>
            <Text style={styles.profileStatNumber}>95</Text>
            <Text style={styles.profileStatLabel}>Score</Text>
          </View>
        </View>

        <View style={styles.profileOptions}>
          {[
            { icon: 'settings-outline', title: 'Settings', subtitle: 'Preferences and privacy' },
            { icon: 'help-circle-outline', title: 'Help & Support', subtitle: 'Get help when you need it' },
            { icon: 'information-circle-outline', title: 'About', subtitle: 'Learn more about EduLearn' },
          ].map((option, index) => (
            <TouchableOpacity key={index} style={styles.profileOption}>
              <Ionicons name={option.icon} size={24} color="#4F46E5" />
              <View style={styles.profileOptionText}>
                <Text style={styles.profileOptionTitle}>{option.title}</Text>
                <Text style={styles.profileOptionSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  // Lesson Modal
  const LessonModal = () => (
    <Modal
      visible={showLessonModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedCourse?.title} Lessons</Text>
          <TouchableOpacity onPress={() => setShowLessonModal(false)}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {lessonsData.map((lesson) => (
            <TouchableOpacity key={lesson.id} style={styles.lessonItem}>
              <View style={[styles.lessonIcon, lesson.completed && styles.completedLessonIcon]}>
                <Ionicons
                  name={lesson.completed ? "checkmark" : "play"}
                  size={20}
                  color={lesson.completed ? "#10B981" : "#4F46E5"}
                />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'main':
        return <MainApp />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <LessonModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  tagline: {
    fontSize: 16,
    color: '#E0E7FF',
    marginTop: 8,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  // Auth Screen Styles
  authContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  authScrollView: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 20,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  authForm: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 50,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  authButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  authButtonDisabled: {
    opacity: 0.6,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  switchAuthButton: {
    marginTop: 24,
    alignItems: 'center',
  },
  switchAuthText: {
    color: '#4F46E5',
    fontSize: 16,
  },

  // Main App Styles
  mainContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subGreeting: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  notificationButton: {
    padding: 8,
  },
  searchButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
  },

  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAll: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: '600',
  },

  // Course Cards
  courseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: width * 0.6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  courseGridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  courseImagePlaceholder: {
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  courseLessons: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  courseProgress: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },

  // Activity
  activityContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: '#D1FAE5',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  activityDuration: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  // Students
  studentsContainer: {
    marginBottom: 24,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studentInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  studentEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  studentProgress: {
    fontSize: 12,
    color: '#4F46E5',
    marginTop: 4,
  },
  studentAction: {
    padding: 8,
  },

  // Profile
  profileContainer: {
    marginBottom: 24,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  profileEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  profileStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  profileStatLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  profileOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  profileOptionText: {
    flex: 1,
    marginLeft: 16,
  },
  profileOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  profileOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedLessonIcon: {
    backgroundColor: '#D1FAE5',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  lessonDuration: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
  },
  tabLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#4F46E5',
    fontWeight: '600',
  },
});

export default EduLearnApp;
