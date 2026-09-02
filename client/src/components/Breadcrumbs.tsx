import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  if (!items.length) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      <Link to="/home" className="inline-flex items-center gap-1 font-medium text-slate-600 hover:text-blue-600">
        <Home size={14} />
        Home
      </Link>

      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="flex items-center gap-2">
          <ChevronRight size={14} className="text-slate-400" />
          {item.to ? (
            <Link to={item.to} className="font-medium text-slate-600 hover:text-blue-600">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-800">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
