
import React from 'react';
import { LayoutGrid, Grid, Info, ShieldCheck } from 'lucide-react';
import { Tool } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { APP_CONFIG } from '../config/appConfig';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tools: Tool[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, tools }) => {
  const { t, language } = useLanguage();

  const handleAboutClick = () => {
    window.open(APP_CONFIG.githubUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shrink-0 transition-colors">
      <div className="p-6 border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xl">
          <ShieldCheck size={28} />
          <div className="flex flex-col">
            <span className="leading-tight">{APP_CONFIG.name}</span>
            <span className="text-[10px] font-mono opacity-50 tracking-tighter -mt-0.5">
              v{APP_CONFIG.version}
            </span>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            activeTab === 'home'
              ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <LayoutGrid size={20} />
          <span className="font-medium">{t('nav_dashboard')}</span>
        </button>

        <div className="pt-4 pb-2 px-4">
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t('nav_tools')}
          </p>
        </div>

        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTab(tool.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === tool.id
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {tool.icon}
            <span className="font-medium">{tool.name[language]}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-700">
        <button 
          onClick={handleAboutClick}
          className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <Info size={20} />
          <span className="text-sm font-medium">{t('nav_support')}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
