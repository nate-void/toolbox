
import React from 'react';
import { motion } from 'framer-motion';
import { Tool } from '../types';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { APP_CONFIG } from '../config/appConfig';

interface HomeProps {
  tools: Tool[];
  onSelectTool: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ tools, onSelectTool }) => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{t('home_welcome')}</h1>
        <p className="text-slate-600 dark:text-slate-400">{t('home_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectTool(tool.id)}
            className="group relative p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors">
              v{APP_CONFIG.version}
            </div>
            
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tool.name[language]}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
              {tool.description[language]}
            </p>
            
            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between text-indigo-600 dark:text-indigo-400 text-sm font-semibold">
              <span>{t('home_launch')}</span>
              <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </div>
          </motion.div>
        ))}

        {/* Placeholder cards for future tools */}
        <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center text-slate-400">
           <div className="mb-2 text-2xl opacity-20 tracking-tighter font-black italic">{t('home_coming_soon')}</div>
           <p className="text-xs text-center">{t('home_coming_soon_desc')}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
