import { useEffect, useState } from 'react';
import api from '../../services/api';

type Post = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  content: string;
  publishStatus?: string;
  isPremium?: boolean;
  pdfAttachment?: string;
  createdAt?: string;
};

const emptyForm = {
  title: '',
  slug: '',
  description: '',
  category: 'AI Tools',
  content: '',
  pdfAttachment: '',
};

const ManagePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadPosts = async () => {
    try {
      const res = await api.get('/admin/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File | null) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm((prev) => ({ ...prev, pdfAttachment: res.data.fileUrl }));
      setMessage('PDF uploaded successfully.');
    } catch (error) {
      console.error('Upload failed', error);
      setMessage('PDF upload failed.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/posts', {
        ...form,
        publishStatus: 'Published',
        isPremium: false,
      });
      setForm(emptyForm);
      setMessage('Post created successfully.');
      await loadPosts();
    } catch (error: any) {
      console.error('Create post failed', error);
      setMessage(error.response?.data?.message || 'Post creation failed.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/posts/${id}`);
      await loadPosts();
    } catch (error) {
      console.error('Delete post failed', error);
    }
  };

  const toPublicUrl = (path?: string) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage Posts</h1>
        <p className="text-slate-600 mt-1">Create blog posts, tutorials, and upload PDFs for clients to view.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
            <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Upload PDF</label>
            <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e.target.files?.[0] || null)} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2 min-h-24" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-xl border border-slate-300 px-3 py-2 min-h-32" required />
        </div>

        {form.pdfAttachment && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
            PDF attached: <a href={toPublicUrl(form.pdfAttachment)} target="_blank" rel="noreferrer" className="font-semibold underline">Open file</a>
          </div>
        )}

        {message && <div className="text-sm text-slate-700 bg-slate-100 rounded-lg px-3 py-2">{message}</div>}

        <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-60">
          {uploading ? 'Uploading PDF...' : 'Create Post'}
        </button>
      </form>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Existing Posts</h2>
        {loading ? (
          <p className="text-slate-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-slate-500">No posts created yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900">{post.title}</h3>
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">{post.category}</span>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs">{post.publishStatus || 'Published'}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">/{post.slug}</p>
                  {post.pdfAttachment && (
                    <a href={toPublicUrl(post.pdfAttachment)} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline mt-1 inline-block">Open PDF</a>
                  )}
                </div>
                <button onClick={() => handleDelete(post._id)} className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-600">Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePosts;
