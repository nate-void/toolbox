
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCcw } from 'lucide-react';
import { CaptchaChallenge } from '../types';
import { CAPTCHA_CHALLENGES } from '../constants/captchaData';
import { useLanguage } from '../contexts/LanguageContext';

interface CaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onFailure?: () => void;
}

const CaptchaModal: React.FC<CaptchaModalProps> = ({ isOpen, onClose, onSuccess, onFailure }) => {
  const { t, language } = useLanguage();
  const [challenge, setChallenge] = useState<CaptchaChallenge>(CAPTCHA_CHALLENGES[0]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isError, setIsError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      resetChallenge();
    }
  }, [isOpen]);

  const resetChallenge = () => {
    const randomIndex = Math.floor(Math.random() * CAPTCHA_CHALLENGES.length);
    setChallenge(CAPTCHA_CHALLENGES[randomIndex]);
    setSelectedIds(new Set());
    setIsError(false);
  };

  const toggleImage = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
    setIsError(false);
  };

  const verify = () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      const correctIds = challenge.images
        .filter(img => img.isCorrect)
        .map(img => img.id);
      
      const isCorrect = 
        selectedIds.size === correctIds.length && 
        [...selectedIds].every(id => correctIds.includes(id));

      if (isCorrect) {
        onSuccess();
      } else {
        setIsError(true);
        setIsVerifying(false);
        onFailure?.();
      }
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700"
      >
        {/* Header */}
        <div className="p-4 bg-indigo-600 text-white">
          <p className="text-sm font-medium opacity-90 mb-1">{t('modal_select_prefix')}</p>
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            {challenge.topic[language]}{t('modal_select_suffix')}
          </h2>
          <p className="text-xs mt-2 opacity-80 italic">{challenge.instruction[language]}</p>
        </div>

        {/* Grid */}
        <div className="p-2 bg-slate-100 dark:bg-slate-900">
          <motion.div 
            className="captcha-grid"
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {challenge.images.map((image) => (
              <div
                key={image.id}
                onClick={() => toggleImage(image.id)}
                className="relative aspect-square cursor-pointer overflow-hidden group rounded-sm"
              >
                <img
                  src={image.url}
                  alt="Captcha part"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    selectedIds.has(image.id) ? 'scale-90' : 'group-hover:scale-105'
                  }`}
                />
                {selectedIds.has(image.id) && (
                  <div className="absolute inset-0 bg-indigo-500/40 border-4 border-indigo-500 flex items-center justify-center">
                    <div className="bg-white rounded-full p-1 shadow-lg">
                      <Check className="text-indigo-600" size={16} strokeWidth={4} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center justify-between bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
          <div className="flex gap-2">
            <button
              onClick={resetChallenge}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title={t('modal_reload')}
            >
              <RefreshCcw size={20} className="text-slate-500" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              title={t('modal_cancel')}
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            {isError && (
              <span className="text-xs text-red-500 font-medium animate-pulse">{t('modal_retry')}</span>
            )}
            <button
              onClick={verify}
              disabled={isVerifying || selectedIds.size === 0}
              className={`px-6 py-2 rounded font-bold text-sm uppercase tracking-wider transition-all shadow-md ${
                isVerifying || selectedIds.size === 0
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
              }`}
            >
              {isVerifying ? t('modal_verifying') : t('modal_verify')}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CaptchaModal;
