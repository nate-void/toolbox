import React, { useState, useMemo } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, useLocation, useOutletContext } from 'react-router';
import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import Home from './pages/Home';
import CaptchaTool from './pages/CaptchaTool';
import { Tool } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Grid, Search, Bell, Activity, TrendingUp, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOOLS: Tool[] = [
  {
    id: 'captcha',
    name: { 'zh-CN': '九宫格验证码', 'en-US': 'Grid Captcha' },
    description: { 
      'zh-CN': '旨在过滤自动化代理的 3x3 图像选择验证工具。', 
      'en-US': 'A 3x3 image selection verification tool designed to filter out automated agents.' 
    },
    icon: <Grid size={20} />,
    path: '/captcha'
  }
];

// Layout 组件
function Layout() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ total: 0, success: 0 });

  // 根据当前路径获取激活的 tab
  const activeTab = (() => {
    if (location.pathname === '/' || location.pathname === '/home') {
      return 'home';
    }
    const tool = TOOLS.find(t => t.path === location.pathname);
    return tool ? tool.id : 'home';
  })();

  // 导航函数
  const navigateTo = (tabId: string) => {
    if (tabId === 'home') {
      navigate('/home');
    } else {
      const tool = TOOLS.find(t => t.id === tabId);
      if (tool) {
        navigate(tool.path);
      }
    }
  };

  const passRate = useMemo(() => {
    if (stats.total === 0) return '0%';
    return `${Math.round((stats.success / stats.total) * 100)}%`;
  }, [stats]);

  const handleVerifyResult = (isSuccess: boolean) => {
    setStats(prev => ({
      total: prev.total + 1,
      success: isSuccess ? prev.success + 1 : prev.success
    }));
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300 text-slate-900 dark:text-slate-100">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={navigateTo} 
        tools={TOOLS} 
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 z-30 transition-colors">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder={t('header_search')}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-indigo-500 transition-all text-sm outline-none text-slate-600 dark:text-slate-300"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            
            <div className="relative">
              <button 
                onClick={() => setShowStats(!showStats)}
                className={`p-2 rounded-lg transition-colors relative ${showStats ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                <Bell size={20} />
                {stats.total > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                )}
              </button>

              <AnimatePresence>
                {showStats && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 z-50 overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">{t('header_stats')}</h3>
                      <Activity size={16} className="text-indigo-500" />
                    </div>

                    {stats.total === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-sm">
                        {t('stats_empty')}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
                              <TrendingUp size={16} className="text-slate-600 dark:text-slate-400" />
                            </div>
                            <span className="text-sm font-medium">{t('stats_total')}</span>
                          </div>
                          <span className="text-lg font-bold">{stats.total}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                              <CheckCircle size={16} className="text-green-600" />
                            </div>
                            <span className="text-sm font-medium">{t('stats_success')}</span>
                          </div>
                          <span className="text-lg font-bold text-green-600">{stats.success}</span>
                        </div>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">{t('stats_rate')}</span>
                            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{passRate}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: passRate }}
                              className="h-full bg-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative scrollbar-hide">
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-indigo-50/50 to-transparent dark:from-indigo-900/10 pointer-events-none"></div>
          
          {/* 根据路径渲染不同页面 */}
          {activeTab === 'home' && <Home tools={TOOLS} onSelectTool={navigateTo} />}
          {activeTab === 'captcha' && <CaptchaTool onVerify={handleVerifyResult} />}
        </main>
      </div>
    </div>
  );
}

// 创建路由配置 - React Router v7 方式
function createAppRouter(basename: string) {
  return createBrowserRouter(
    [
      {
        path: '/',
        element: <Layout />,
      },
      {
        path: '/home',
        element: <Layout />,
      },
      {
        path: '/captcha',
        element: <Layout />,
      }
    ],
    {
      basename: basename,
    }
  );
}

const App: React.FC = () => {
  // 自动获取 Vite 的 base 配置
  const basename = ((import.meta as any).env?.BASE_URL || '/').replace(/\/$/, '');
  const router = createAppRouter(basename);

  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
};

export default App;