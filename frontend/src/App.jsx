import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicLayout from './components/common/PublicLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import CoursesPage from './pages/public/CoursesPage';
import GalleryPage from './pages/public/GalleryPage';
import EventsNoticesPage from './pages/public/EventsNoticesPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';

// Student Portal
import StudentLayout from './layouts/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import StudentAttendance from './pages/student/StudentAttendance';
import StudentSchedule from './pages/student/StudentSchedule';
import StudentFees from './pages/student/StudentFees';
import StudentProgress from './pages/student/StudentProgress';
import StudentNotices from './pages/student/StudentNotices';
import StudentMaterials from './pages/student/StudentMaterials';

// Admin Portal
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminBatches from './pages/admin/AdminBatches';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminFees from './pages/admin/AdminFees';
import AdminEventsNotices from './pages/admin/AdminEventsNotices';
import AdminGallery from './pages/admin/AdminGallery';
import AdminChatbotLogs from './pages/admin/AdminChatbotLogs';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>

          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/events" element={<EventsNoticesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Student Portal Protected Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="schedule" element={<StudentSchedule />} />
            <Route path="fees" element={<StudentFees />} />
            <Route path="progress" element={<StudentProgress />} />
            <Route path="notices" element={<StudentNotices />} />
            <Route path="events" element={<EventsNoticesPage />} />
            <Route path="materials" element={<StudentMaterials />} />
          </Route>

          {/* Admin & Staff Portal Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin', 'staff']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="batches" element={<AdminBatches />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="fees" element={<AdminFees />} />
            <Route path="events-notices" element={<AdminEventsNotices />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="chatbot-logs" element={<AdminChatbotLogs />} />
          </Route>

          {/* Fallback Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
