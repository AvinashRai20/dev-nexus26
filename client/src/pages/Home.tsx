import { motion } from 'framer-motion';
import { ArrowRight, Bot, BrainCircuit, BookOpen, FileText, Map, Sparkles, Cpu, Globe, Star, TrendingUp, Layers3, GraduationCap, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const featureCards = [
  { icon: Bot, title: 'AI Tools', desc: 'Discover practical AI tools for work, coding, research, and productivity.' },
  { icon: Code2, title: 'Web Development', desc: 'Learn modern frontend and backend workflows from beginner-friendly guides.' },
  { icon: BookOpen, title: 'Courses', desc: 'Follow structured paths to build real projects and sharpen your skills.' },
  { icon: FileText, title: 'Notes & PDFs', desc: 'Access notes, cheat sheets, and downloadable resources in one place.' },
  { icon: Map, title: 'Roadmaps', desc: 'Navigate your growth with expert learning paths for each stack.' },
  { icon: BrainCircuit, title: 'AI & Tech Updates', desc: 'Stay current with emerging tools, trends, and developer resources.' },
];

const posterRows = [
  'AI Posters', 'Python', 'JavaScript', 'React', 'Web Development', 'AI Tools', 'Developer Tips', 'Roadmaps', 'Tech Tips', 'AI for Creators'
];

const latestItems = [
  { title: 'AI tools for developers', category: 'AI', blurb: 'Best chat, coding, and research tools in one lane.' },
  { title: 'JavaScript roadmaps', category: 'Roadmap', blurb: 'A clear path from basics to full-stack confidence.' },
  { title: 'Web dev notes library', category: 'Notes', blurb: 'Quick guides for React, Node, and deployment workflows.' },
  { title: 'Full-stack beginner course', category: 'Course', blurb: 'From setup to shipping your first working app.' },
];

const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
                <Sparkles size={16} />
                Welcome to DEV.NEXUS26
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                Learn AI, code, and <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">build smarter</span>.
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                Explore AI tools, tutorials, coding resources, roadmaps, notes, and projects designed for developers, students, and technology enthusiasts.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/ai-tools" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
                  Explore Platform
                  <ArrowRight size={18} />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600">
                  Sign In
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2"><Cpu size={16} className="text-blue-600" /> AI Tools</div>
                <div className="flex items-center gap-2"><GraduationCap size={16} className="text-violet-600" /> Courses</div>
                <div className="flex items-center gap-2"><Layers3 size={16} className="text-emerald-600" /> Roadmaps</div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative mx-auto w-full max-w-lg">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Learning Hub</p>
                      <p className="mt-2 text-2xl font-bold">Your next step</p>
                    </div>
                    <div className="rounded-xl bg-blue-500/20 p-2 text-blue-200"><TrendingUp size={18} /></div>
                  </div>

                  <div className="mt-6 space-y-4">
                    {['AI Tools', 'Courses', 'Resources', 'Roadmaps'].map((item, index) => (
                      <div key={item} className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-blue-500/10 p-2 text-blue-300">
                            {index % 2 === 0 ? <Sparkles size={14} /> : <BookOpen size={14} />}
                          </div>
                          <span className="text-sm font-medium">{item}</span>
                        </div>
                        <span className="text-xs text-slate-300">Live</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-blue-50 p-4">
                    <div className="text-xl font-black text-blue-700">200+</div>
                    <div className="text-xs text-slate-600">Resources</div>
                  </div>
                  <div className="rounded-2xl bg-violet-50 p-4">
                    <div className="text-xl font-black text-violet-700">40+</div>
                    <div className="text-xs text-slate-600">Roadmaps</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4">
                    <div className="text-xl font-black text-emerald-700">24/7</div>
                    <div className="text-xs text-slate-600">Learning</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">What we cover</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Built for modern developers</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} whileHover={{ y: -4 }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden border-y border-slate-200 bg-white py-8">
        <div className="flex animate-[scroll_24s_linear_infinite] gap-4 whitespace-nowrap px-4">
          {[...posterRows, ...posterRows].map((label, idx) => (
            <div key={`${label}-${idx}`} className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
              <Star size={14} className="text-amber-500" />
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Latest content</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">Fresh learning updates</h3>
              </div>
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600"><Globe size={18} /></div>
            </div>

            <div className="mt-6 space-y-4">
              {latestItems.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">{item.category}</span>
                    <span className="text-xs text-slate-500">New</span>
                  </div>
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{item.blurb}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Instagram community</p>
            <h3 className="mt-3 text-3xl font-bold">@dev.nexus26</h3>
            <p className="mt-4 max-w-md text-slate-300">
              Learn through visual posts, quick walkthroughs, AI tips, tech roadmaps, and step-by-step developer guides made for everyday growth.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">Visual guides</p>
                <p className="mt-2 text-2xl font-black text-white">150+</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-sm text-slate-300">AI notes</p>
                <p className="mt-2 text-2xl font-black text-white">90+</p>
              </div>
            </div>

            <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-100">
              Join the community
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Platform</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Popular AI tools & learning paths</h2>
          </div>
          <Link to="/ai-tools" className="text-sm font-semibold text-blue-600 hover:text-blue-700">View all</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {['ChatGPT', 'GitHub Copilot', 'Notion AI'].map((tool, index) => (
            <div key={tool} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold">{tool.slice(0, 1)}</div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">{index === 0 ? 'Popular' : index === 1 ? 'Coding' : 'Productivity'}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{tool}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">Helpful for developers, students, and builders who want faster learning and smarter execution.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
