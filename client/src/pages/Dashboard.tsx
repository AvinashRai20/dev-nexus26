import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { ArrowRight, BookOpen, FileText, Map, Sparkles, UserCircle2, Bookmark, GraduationCap, Download } from 'lucide-react';

const quickLinks = [
  { label: 'AI Tools', to: '/ai-tools', icon: Sparkles },
  { label: 'Courses', to: '/courses', icon: BookOpen },
  { label: 'Resources', to: '/resources', icon: FileText },
  { label: 'Roadmaps', to: '/roadmaps', icon: Map },
  { label: 'Notes', to: '/resources', icon: Download },
]

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const [latest, setLatest] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const loadLatest = async () => {
      try {
        const [posts, resources, courses] = await Promise.all([
          api.get('/posts'),
          api.get('/resources'),
          api.get('/courses'),
        ]);
        const merged = [...(posts.data || []), ...(resources.data || []), ...(courses.data || [])]
          .slice(0, 4)
          .map((item) => ({
            title: item.title || 'New update',
            category: item.category || item.type || item.difficulty || 'Resource',
            type: item.type || 'Update',
          }));
        setLatest(merged);
      } catch (error) {
        console.error('Could not load latest updates', error);
      }
    };

    if (isAuthenticated) loadLatest();
  }, [isLoading, isAuthenticated, navigate]);

  if (!isAuthenticated) return <div className="min-h-[60vh] p-12 text-center text-slate-500">Checking your session…</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Learning hub</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Welcome back, {user?.name || 'learner'}!</h1>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Member ID</p>
          <p className="mt-1 text-lg font-bold text-slate-900">{user?.userId || 'DEV-000000'}</p>
        </div>
      </div>

      <div className="mb-8 rounded-[28px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-blue-600/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">Quick start</p>
            <h2 className="mt-2 text-2xl font-bold">Where do you want to begin?</h2>
          </div>
          <div className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50">
            {user?.isPremium ? 'Premium member' : 'Free member'}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {quickLinks.map(({ label, to, icon: Icon }) => (
          <Link key={label} to={to} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
              <Icon size={18} />
            </div>
            <p className="text-sm font-semibold text-slate-900">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Continue learning</h3>
            <Link to="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">View all <ArrowRight size={16} /></Link>
          </div>

          <div className="space-y-4">
            {[
              { title: 'JavaScript Essentials', progress: '68%', level: 'Beginner' },
              { title: 'React Build Systems', progress: '42%', level: 'Intermediate' },
              { title: 'AI Productivity Workflow', progress: '24%', level: 'Starter' },
            ].map((course) => (
              <div key={course.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">{course.title}</p>
                    <p className="text-xs text-slate-500">{course.level}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600">{course.progress}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" style={{ width: course.progress }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Saved content</h3>
            <Bookmark className="text-blue-600" size={18} />
          </div>

          <div className="mt-6 space-y-3">
            {['AI tool library', 'React cheatsheet', 'Roadmap PDF'].map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Latest uploads</h3>
            <GraduationCap className="text-emerald-600" size={18} />
          </div>

          <div className="space-y-3">
            {latest.map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">{item.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900">Recommended</h3>
            <UserCircle2 className="text-violet-600" size={18} />
          </div>

          <div className="space-y-3">
            {['AI prompt frameworks', 'Full-stack roadmap', 'Beginner React guide'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <span className="font-medium text-slate-700">{item}</span>
                <ArrowRight size={16} className="text-blue-600" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
