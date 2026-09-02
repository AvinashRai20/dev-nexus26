import { useEffect, useState } from 'react';
import api from '../../services/api';

type Roadmap = {
  _id: string;
  title: string;
  slug: string;
  description: string;
};

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  steps: 'Start with fundamentals, build projects, then deploy and optimize.',
};

const ManageRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [form, setForm] = useState(emptyForm);

  const loadRoadmaps = async () => {
    try {
      const res = await api.get('/roadmaps');
      setRoadmaps(res.data);
    } catch (error) {
      console.error('Failed to load roadmaps', error);
    }
  };

  useEffect(() => {
    loadRoadmaps();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/roadmaps', {
        title: form.title,
        slug: form.slug,
        description: form.description,
        steps: [{ title: 'Learning Path', description: form.steps, resources: [] }],
        isPremium: false,
      });
      setForm(emptyForm);
      await loadRoadmaps();
    } catch (error) {
      console.error('Create roadmap failed', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/roadmaps/${id}`);
      await loadRoadmaps();
    } catch (error) {
      console.error('Delete roadmap failed', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage Roadmaps</h1>
        <p className="text-slate-600 mt-1">Create structured guidance for student learning paths.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Roadmap Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2 min-h-24" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Learning Step Summary</label>
          <textarea value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2 min-h-20" required />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700">Create Roadmap</button>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Roadmaps</h2>
        <div className="space-y-4">
          {roadmaps.map((roadmap) => (
            <div key={roadmap._id} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900">{roadmap.title}</h3>
                <p className="text-sm text-slate-500">/{roadmap.slug}</p>
              </div>
              <button onClick={() => handleDelete(roadmap._id)} className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRoadmaps;
