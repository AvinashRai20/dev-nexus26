import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Cpu className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-lg tracking-tight">DEV.NEXUS26</span>
            </Link>
            <p className="text-slate-500 text-sm">
              Explore AI. Learn to Code. Build the Future. The ultimate hub for developers and tech enthusiasts.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/ai-tools" className="hover:text-blue-600 transition-colors">AI Tools</Link></li>
              <li><Link to="/courses" className="hover:text-blue-600 transition-colors">Courses</Link></li>
              <li><Link to="/resources" className="hover:text-blue-600 transition-colors">Resources</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com/dev.nexus26" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-pink-600 transition-colors">
                <span aria-hidden="true">◎</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors">
                <span aria-hidden="true">GH</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-red-600 transition-colors">
                <span aria-hidden="true">YT</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors">
                <span aria-hidden="true">in</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Dev.Nexus26 — All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
