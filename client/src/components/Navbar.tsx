import { Link } from 'react-router-dom';
import { Menu, X, Cpu, Home, BookOpen, FileText, Map, Search, Bell, UserCircle2, LayoutDashboard, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const navItems = [
  { label: 'Home', to: '/home', icon: Home },
  { label: 'AI Tools', to: '/ai-tools', icon: Sparkles },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Resources', to: '/resources', icon: FileText },
  { label: 'Roadmaps', to: '/roadmaps', icon: Map },
  { label: 'Blog', to: '/blog', icon: ArrowUpRight },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/home" className="flex items-center gap-2">
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-2 text-white shadow-sm">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">DEV.NEXUS26</span>
            </Link>
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600">
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:border-slate-300 hover:text-blue-600">
              <Search size={16} />
            </button>
            <button className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600 transition hover:border-slate-300 hover:text-blue-600">
              <Bell size={16} />
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/app" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-600">
                  <LayoutDashboard size={16} />
                  {user?.name || 'Dashboard'}
                </Link>
                <button onClick={() => logout()} className="rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-semibold text-slate-600 transition hover:text-blue-600">Sign In</Link>
                <Link to="/register" className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                  Create Account
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600">
              <Search size={16} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-600">
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <div className="space-y-1">
            {navItems.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-600">
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-200 pt-3">
              {isAuthenticated ? (
                <>
                  <Link to="/app" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600">
                    <UserCircle2 size={16} />
                    {user?.name || 'Dashboard'}
                  </Link>
                  <button onClick={() => logout()} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-red-200 hover:text-red-600">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block rounded-xl border border-slate-200 px-3 py-2 text-center text-sm font-medium text-slate-700">Sign In</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="mt-2 block rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white">Create Account</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
