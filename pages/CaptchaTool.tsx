
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ShieldCheck, CheckCircle2, RotateCcw } from 'lucide-react';
import CaptchaModal from '../components/CaptchaModal';
import { useLanguage } from '../contexts/LanguageContext';

interface CaptchaToolProps {
  onVerify?: (isSuccess: boolean) => void;
}

const CaptchaTool: React.FC<CaptchaToolProps> = ({ onVerify }) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setIsSuccess(true);
    onVerify?.(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // User cancelled - count as attempt if they opened it? 
    // Usually we only count completed or failed.
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-full flex flex-col items-center justify-center text-center">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t('captcha_title')}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg">
              {t('captcha_desc')}
            </p>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all flex items-center gap-3"
            >
              <Play size={20} fill="currentColor" />
              {t('captcha_start')}
            </button>
            
            <div className="mt-12 flex gap-8">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">3x3</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">{t('captcha_grid_system')}</span>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">100%</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest">{t('captcha_bot_proof')}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-6 shadow-lg shadow-green-500/10">
              <CheckCircle2 size={56} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{t('captcha_success_title')}</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
              {t('captcha_success_desc')}
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
              >
                <RotateCcw size={18} />
                {t('captcha_test_again')}
              </button>
              <button
                className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 transition-all"
              >
                {t('captcha_view_logs')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CaptchaModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSuccess={handleSuccess}
        onFailure={() => onVerify?.(false)}
      />
    </div>
  );
};

export default CaptchaTool;
