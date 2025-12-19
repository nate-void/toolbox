
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'zh-CN' ? 'en-US' : 'zh-CN')}
      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-2 text-sm font-bold"
      aria-label="Toggle Language"
    >
      <Languages size={18} />
      <span>{language === 'zh-CN' ? 'English' : '中文'}</span>
    </button>
  );
};

export default LanguageToggle;
