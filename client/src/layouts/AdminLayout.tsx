import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wrench, BookOpen, FileText, Map, Users, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-16 flex items-center px-6 bg-slate-950 text-white font-bold text-xl tracking-tight">
          DEV.NEXUS26 Admin
        </div>
        
        <nav className="flex-1 py-6 space-y-1 px-3">
          <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/ai-tools" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Wrench size={20} /> AI Tools
          </Link>
          <Link to="/admin/posts" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <FileText size={20} /> Posts
          </Link>
          <Link to="/admin/courses" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <BookOpen size={20} /> Courses
          </Link>
          <Link to="/admin/roadmaps" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Map size={20} /> Roadmaps
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
            <Users size={20} /> Users
          </Link>
        </nav>

        <div className="p-4 bg-slate-950">
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Admin User</span>
            <div className="h-8 w-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
