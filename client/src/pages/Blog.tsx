import { useEffect, useState } from 'react';
import api from '../services/api';

type Post = {
  _id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
  pdfAttachment?: string;
  createdAt?: string;
};

const toPublicUrl = (path?: string) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `http://localhost:5000${path}`;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get('/posts').then((r) => setPosts(r.data)).catch(console.error);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <p className="font-semibold text-emerald-600">THE NEXUS JOURNAL</p>
      <h1 className="mt-2 text-4xl font-bold">Ideas, tutorials & updates</h1>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {posts.length ? posts.map((post) => {
          const pdfUrl = toPublicUrl(post.pdfAttachment);
          return (
            <article key={post._id} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <span className="text-xs font-bold uppercase text-blue-600">{post.category}</span>
              <h2 className="mt-3 text-2xl font-bold">{post.title}</h2>
              <p className="mt-3 leading-7 text-slate-500">{post.description}</p>

              {pdfUrl && (
                <a href={pdfUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">
                  Open PDF
                </a>
              )}

              <p className="mt-5 text-xs text-slate-400">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Dev.Nexus26'}</p>
            </article>
          );
        }) : <p className="text-slate-500">New tutorials are on the way.</p>}
      </div>
    </section>
  );
}
