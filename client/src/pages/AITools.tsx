import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

interface AITool {
  _id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  pricingType: string;
  isPremium: boolean;
}

const AITools = () => {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await api.get('/ai-tools');
        setTools(res.data);
      } catch (error) {
        console.error('Error fetching AI Tools', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading AI Tools...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Tools Directory</h1>
      <p className="text-slate-500 mb-8">Discover the best artificial intelligence tools to supercharge your workflow.</p>
      
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input aria-label="Search AI tools" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tools, use cases, tags…" className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" />
        <select aria-label="Filter category" value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-slate-300 px-4 py-3"><option>All</option>{Array.from(new Set(tools.map((tool) => tool.category))).map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      {tools.filter((tool) => `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase()) && (category === 'All' || tool.category === category)).length === 0 ? (
        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
          No AI Tools published yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.filter((tool) => `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(query.toLowerCase()) && (category === 'All' || tool.category === category)).map((tool) => (
            <div key={tool._id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-inner flex items-center justify-center text-white font-bold text-xl">
                  {tool.name.charAt(0)}
                </div>
                {tool.isPremium && (
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    Premium
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-lg text-slate-900 mb-2">{tool.name}</h3>
              <p className="text-sm text-slate-600 mb-5 line-clamp-2 min-h-[40px]">{tool.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-lg">
                  {tool.pricingType}
                </span>
                <Link to={`/ai-tools/${tool.slug}`} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                  View Details <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AITools;
