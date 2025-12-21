
import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Avatar, 
  Badge, 
  Tooltip, 
  Popover, 
  Typography,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onMenuClick }) => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('lg'));
  const isSmallMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  return (
    <Box 
      component="header" 
      sx={{ 
        height: 64, 
        px: { xs: 2, sm: 4 }, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 30
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} edge="start" sx={{ mr: 1 }}>
            <MenuRoundedIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: 18, color: 'text.primary' }}>
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
        <Tooltip title={language === 'en' ? '切换为中文' : 'Switch to English'}>
          <IconButton 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')} 
            size="small" 
            sx={{ 
              borderRadius: 2.5,
              width: 38,
              height: 38,
              bgcolor: 'action.hover',
              '&:hover': { bgcolor: 'action.selected' }
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
              <Typography variant="caption" sx={{ fontSize: 10, fontWeight: language === 'zh' ? 900 : 500, opacity: language === 'zh' ? 1 : 0.4 }}>文</Typography>
              <Typography variant="caption" sx={{ fontSize: 8, fontWeight: language === 'en' ? 900 : 500, opacity: language === 'en' ? 1 : 0.4, textTransform: 'uppercase' }}>en</Typography>
            </Box>
          </IconButton>
        </Tooltip>

        {!isSmallMobile && (
          <Tooltip title="Toggle Theme">
            <IconButton onClick={(e) => toggleTheme(e)} size="small" sx={{ borderRadius: 2, width: 38, height: 38 }}>
              {theme === 'dark' ? <LightModeRoundedIcon fontSize="small" /> : <DarkModeRoundedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        )}

        <IconButton 
          onClick={(e) => setAnchorEl(e.currentTarget)} 
          size="small" 
          sx={{ borderRadius: 2, width: 38, height: 38 }}
        >
          <Badge color="error" variant="dot" overlap="circular">
            <NotificationsRoundedIcon fontSize="small" />
          </Badge>
        </IconButton>

        <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: { xs: 0.5, sm: 1 } }} />

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          cursor: 'pointer', 
          p: 0.5, 
          borderRadius: 2, 
          '&:hover': { bgcolor: 'action.hover' } 
        }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: 10, fontWeight: 800, bgcolor: 'primary.main' }}>NV</Avatar>
          {!isSmallMobile && <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'text.primary' }}>Nate</Typography>}
        </Box>
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { mt: 1, borderRadius: 3, p: 2, minWidth: 200 } } }}
      >
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {t.noNotifications}
        </Typography>
      </Popover>
    </Box>
  );
};

export default Header;
