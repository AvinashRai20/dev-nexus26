import { Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../services/api';

const ManageAITools = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [tools, setTools] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', slug: '', category: 'Coding', pricingType: 'Free', description: '', websiteUrl: '' });
  const load = () => api.get('/ai-tools').then((r) => setTools(r.data)).catch(console.error);
  useEffect(() => { load(); }, []);
  const publish = async (event: React.FormEvent) => { event.preventDefault(); await api.post('/ai-tools', form); setForm({ name: '', slug: '', category: 'Coding', pricingType: 'Free', description: '', websiteUrl: '' }); setShowAddForm(false); load(); };
  const remove = async (id: string) => { if (window.confirm('Delete this AI tool?')) { await api.delete(`/ai-tools/${id}`); load(); } };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Manage AI Tools</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          {showAddForm ? 'Cancel' : <><Plus size={20} /> Add New Tool</>}
        </button>
      </div>

      {showAddForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Add New AI Tool</h2>
          <form className="space-y-4" onSubmit={publish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tool Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. ChatGPT" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Slug</label>
                <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. chatgpt" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
                  <option>Coding</option>
                  <option>Productivity</option>
                  <option>Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pricing Type</label>
                <select value={form.pricingType} onChange={(e) => setForm({ ...form, pricingType: e.target.value })} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none">
                  <option>Free</option>
                  <option>Freemium</option>
                  <option>Paid</option>
                  <option>Free Trial</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Describe the AI tool..."></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Website URL</label>
              <input required value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} type="url" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none" placeholder="https://..." />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-2 border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Publish Tool
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            <div className="relative w-64">
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search tools..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none text-sm" />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50">
                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Name</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Category</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Pricing</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>{tools.filter((tool) => tool.name.toLowerCase().includes(search.toLowerCase())).map((tool) => <tr key={tool._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900 flex items-center gap-3">
                  <div className="h-8 w-8 bg-blue-100 rounded-md"></div>
                  {tool.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">                {tool.category}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">                  {tool.pricingType}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-800 p-2" aria-label="Edit tool"><Edit2 size={18} /></button>
                  <button onClick={() => remove(tool._id)} className="text-red-500 hover:text-red-700 p-2" aria-label="Delete tool"><Trash2 size={18} /></button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAITools;
