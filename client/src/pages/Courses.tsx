import { useEffect, useState } from 'react';
import api from '../services/api';
type Course = { _id: string; title: string; description: string; difficulty?: string; duration?: string; isPremium?: boolean };
export default function Courses() {
  const [items, setItems] = useState<Course[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/courses').then((r) => setItems(r.data)).catch(console.error).finally(() => setLoading(false)); }, []);
  return <section className="mx-auto max-w-7xl px-4 py-12"><p className="font-semibold text-blue-600">LEARN & BUILD</p><h1 className="mt-2 text-4xl font-bold">Courses for builders</h1><p className="mt-3 max-w-2xl text-slate-500">Practical, structured paths from your first line of code to production.</p>
    {loading ? <p className="py-16 text-slate-500">Loading courses…</p> : <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{items.length ? items.map((course) => <article key={course._id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{course.difficulty || 'Beginner'}</span><h2 className="mt-5 text-xl font-bold">{course.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{course.description}</p><p className="mt-5 text-xs font-semibold text-slate-400">{course.duration || 'Self-paced'} {course.isPremium ? ' · Premium' : ' · Free'}</p></article>) : <Empty label="Courses are being prepared. Check back soon." />}</div>}
  </section>;
}
function Empty({ label }: { label: string }) { return <div className="col-span-full rounded-2xl border border-dashed border-slate-300 py-16 text-center text-slate-500">{label}</div>; }
