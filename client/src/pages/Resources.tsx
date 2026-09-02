import { useEffect, useState } from 'react';
import api from '../services/api';

type Resource = {
  _id: string;
  title: string;
  description?: string;
  type: string;
  category?: string;
  fileUrl?: string;
  isPremium?: boolean;
};

const toPublicUrl = (path?: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `http://localhost:5000${path}`;
};

export default function Resources() {
  const [items, setItems] = useState<Resource[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    api.get('/resources').then((r) => setItems(r.data)).catch(console.error);
  }, []);

  const filtered = items.filter((item) => `${item.title} ${item.category || ''} ${item.type}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-semibold text-indigo-600">RESOURCE LIBRARY</p>
      <h1 className="mt-2 text-4xl font-bold">Notes, guides & downloads</h1>

      <div className="mt-8 max-w-xl">
        <input aria-label="Search resources" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search notes, PDFs, roadmaps…" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length ? filtered.map((r) => {
          const pdfUrl = r.fileUrl ? toPublicUrl(r.fileUrl) : '';
          return (
            <article key={r._id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-blue-600">{r.type}</span>
                {r.isPremium && <span className="text-xs font-bold text-amber-600">Premium</span>}
              </div>

              <h2 className="mt-4 font-bold">{r.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{r.description || 'A curated Dev.Nexus26 learning resource.'}</p>

              {pdfUrl && (
                <div className="mt-4 space-y-3">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Open PDF
                  </a>
                  <iframe src={pdfUrl} title={r.title} className="h-56 w-full rounded-xl border border-slate-200" />
                </div>
              )}
            </article>
          );
        }) : <div className="col-span-full py-16 text-center text-slate-500">No resources match your search yet.</div>}
      </div>
    </section>
  );
}
