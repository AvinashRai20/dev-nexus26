import { useEffect, useState } from 'react';
import api from '../../services/api';

type Course = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  duration: string;
  isPremium?: boolean;
};

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  difficulty: 'Beginner',
  duration: '4 weeks',
};

const ManageCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState(emptyForm);

  const loadCourses = async () => {
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (error) {
      console.error('Failed to load courses', error);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/courses', { ...form, isPremium: false });
      setForm(emptyForm);
      await loadCourses();
    } catch (error) {
      console.error('Create course failed', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/courses/${id}`);
      await loadCourses();
    } catch (error) {
      console.error('Delete course failed', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage Courses</h1>
        <p className="text-slate-600 mt-1">Add beginner-to-advanced learning tracks for students.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
            <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Duration</label>
            <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2 min-h-24" required />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700">Create Course</button>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Available Courses</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900">{course.title}</h3>
                <p className="text-sm text-slate-500">{course.difficulty} • {course.duration}</p>
              </div>
              <button onClick={() => handleDelete(course._id)} className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCourses;
