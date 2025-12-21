
import React, { Suspense, lazy, useState } from 'react';
import * as RouterDOM from 'react-router-dom';
const { BrowserRouter, Routes, Route, useLocation } = RouterDOM as any;
const Router = BrowserRouter;
import { 
  Box, 
  CircularProgress, 
  Fade, 
  Drawer, 
  useMediaQuery, 
  useTheme as useMuiTheme 
} from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { SearchProvider } from './contexts/SearchContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const CaptchaTool = lazy(() => import('./pages/CaptchaTool'));

const PageLoader = () => (
  <Box sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 'calc(100vh - 64px)', 
    width: '100%' 
  }}>
    <Fade in timeout={500}>
      <CircularProgress size={40} thickness={4} sx={{ color: 'primary.main', opacity: 0.5 }} />
    </Fade>
  </Box>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const getTitle = () => {
    switch(location.pathname) {
      case '/': return t.home;
      case '/captcha': return (t as any).captchaName || t.captcha;
      default: return 'Toolbox';
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        transition: 'background-color 0.3s'
      }} 
      className="grid-pattern"
    >
      {/* Responsive Sidebar Logic */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better open performance on mobile.
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 256,
              bgcolor: 'background.paper',
              backgroundImage: 'none'
            },
          }}
        >
          <Sidebar variant="temporary" onClose={handleDrawerToggle} />
        </Drawer>
      ) : (
        <Box sx={{ width: 256, flexShrink: 0 }}>
          <Sidebar variant="permanent" />
        </Box>
      )}

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header title={getTitle()} onMenuClick={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1, position: 'relative', overflow: 'auto' }}>
          <Suspense fallback={<PageLoader />}>
            {children}
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
};

const App: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL;
  
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SearchProvider>
          <Router basename={baseUrl}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/captcha" element={<CaptchaTool />} />
              </Routes>
            </Layout>
          </Router>
        </SearchProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
