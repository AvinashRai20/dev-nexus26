import { Users, Wrench, BookOpen, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  useEffect(() => { api.get('/admin/dashboard/stats').then((response) => setStats(response.data)).catch(console.error); }, []);
  const cards = [
    { label: 'Total Users', value: stats?.users ?? '—', icon: <Users size={24} className="text-blue-500" /> },
    { label: 'AI Tools', value: stats?.tools ?? '—', icon: <Wrench size={24} className="text-indigo-500" /> },
    { label: 'Published Posts', value: stats?.posts ?? '—', icon: <FileText size={24} className="text-emerald-500" /> },
    { label: 'Active Courses', value: stats?.courses ?? '—', icon: <BookOpen size={24} className="text-amber-500" /> },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
            <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">JD</div>
            <div>
              <p className="text-sm font-medium text-slate-900">John Doe registered</p>
              <p className="text-xs text-slate-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold"><Wrench size={18} /></div>
            <div>
              <p className="text-sm font-medium text-slate-900">New AI Tool "ChatGPT" added</p>
              <p className="text-xs text-slate-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
