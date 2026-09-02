import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AITools from './pages/AITools';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Courses from './pages/Courses';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Roadmaps from './pages/Roadmaps';
import Contact from './pages/Contact';
import Register from './pages/Register';
import AIToolDetail from './pages/AIToolDetail';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAITools from './pages/admin/ManageAITools';
import ManagePosts from './pages/admin/ManagePosts';
import ManageCourses from './pages/admin/ManageCourses';
import ManageRoadmaps from './pages/admin/ManageRoadmaps';
import ManageUsers from './pages/admin/ManageUsers';

import { useAuthStore } from './store/useAuthStore';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Routes>
        {/* Admin Routes without Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="ai-tools" element={<ManageAITools />} />
            <Route path="posts" element={<ManagePosts />} />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="roadmaps" element={<ManageRoadmaps />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        </Route>

        {/* Public/User Routes */}
        <Route path="/*" element={
          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
            <Navbar />
            <main className="flex-grow">
              <Routes>
               <Route path="/" element={<Navigate to="/home" replace />} />
               <Route path="/home" element={<Home />} />
               <Route path="/ai-tools" element={<AITools />} />
               <Route path="/ai-tools/:slug" element={<AIToolDetail />} />
               <Route path="/courses" element={<Courses />} />
               <Route path="/resources" element={<Resources />} />
               <Route path="/blog" element={<Blog />} />
               <Route path="/roadmaps" element={<Roadmaps />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
               <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
               <Route path="*" element={<NotFound />} />
             </Routes>
           </main>
           <Footer />
         </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
