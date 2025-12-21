
import React from 'react';
import * as RouterDOM from 'react-router-dom';
const { Link, useLocation } = RouterDOM as any;
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Button,
  IconButton
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import { appConfig } from '../config/appConfig';
import { useLanguage } from '../contexts/LanguageContext';
import { useSearch } from '../contexts/SearchContext';

interface SidebarProps {
  onClose?: () => void;
  variant?: 'permanent' | 'temporary';
}

const Sidebar: React.FC<SidebarProps> = ({ onClose, variant = 'permanent' }) => {
  const { t } = useLanguage();
  const { searchQuery } = useSearch();
  const location = useLocation();

  const getToolName = (id: string) => {
    return (t as any)[`${id}Name`] || id;
  };

  // We only filter the tools list in sidebar if search query is active
  const filteredTools = appConfig.tools.filter(tool => {
    if (!searchQuery) return true;
    const name = getToolName(tool.id);
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleItemClick = () => {
    if (variant === 'temporary' && onClose) {
      onClose();
    }
  };

  return (
    <Box 
      sx={{ 
        width: 256, 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: variant === 'permanent' ? '1px solid' : 'none',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ p: 3, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: 'primary.main', 
            borderRadius: 1.5, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <TerminalRoundedIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1, color: 'text.primary' }}>
              {appConfig.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: 10, letterSpacing: 1 }}>
              {appConfig.version}
            </Typography>
          </Box>
        </Box>
        {variant === 'temporary' && (
          <IconButton onClick={onClose} size="small" sx={{ ml: 1 }}>
            <ChevronLeftRoundedIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ flex: 1, px: 1.5, py: 2, overflowY: 'auto' }}>
        <List sx={{ mb: 4 }}>
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/" 
              selected={location.pathname === '/'}
              onClick={handleItemClick}
              sx={{ 
                borderRadius: 2.5,
                mb: 0.5,
                color: 'text.secondary',
                '&.Mui-selected': { 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  '&:hover': { bgcolor: 'primary.dark' },
                  '& .MuiListItemIcon-root': { color: 'white' } 
                },
                '&:hover': {
                  color: 'text.primary',
                  '& .MuiListItemIcon-root': { color: 'primary.main' }
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                <DashboardRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={t.home} primaryTypographyProps={{ fontSize: 14, fontWeight: location.pathname === '/' ? 700 : 600 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <Box sx={{ px: 2, mb: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: 2, textTransform: 'uppercase' }}>
            {t.collectionHeader}
          </Typography>
        </Box>

        <List>
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            const isActive = location.pathname === tool.path;
            const toolName = getToolName(tool.id);
            return (
              <ListItem key={tool.path} disablePadding>
                <ListItemButton 
                  component={Link} 
                  to={tool.path} 
                  selected={isActive}
                  onClick={handleItemClick}
                  sx={{ 
                    borderRadius: 2.5,
                    mb: 0.5,
                    color: 'text.secondary',
                    '&.Mui-selected': { 
                      bgcolor: 'primary.main', 
                      color: 'white', 
                      '&:hover': { bgcolor: 'primary.dark' },
                      '& .MuiListItemIcon-root': { color: 'white' } 
                    },
                    '&:hover': {
                      color: 'text.primary',
                      '& .MuiListItemIcon-root': { color: 'primary.main' }
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={toolName} primaryTypographyProps={{ fontSize: 14, fontWeight: isActive ? 700 : 600 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ px: 2, pt: 1 }}>
        <Box sx={{ height: '1px', bgcolor: 'divider', borderRadius: '1px', opacity: 0.6 }} />
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          component="a"
          href={appConfig.githubUrl}
          target="_blank"
          variant="text"
          startIcon={<GitHubIcon />}
          endIcon={<OpenInNewRoundedIcon sx={{ fontSize: '14px !important', opacity: 0.5 }} />}
          sx={{ 
            justifyContent: 'flex-start',
            color: 'text.secondary',
            px: 2,
            py: 1.5,
            borderRadius: 2.5,
            '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
            '& .MuiButton-endIcon': { marginLeft: 'auto' }
          }}
        >
          <Box component="span" sx={{ fontSize: 14, fontWeight: 600 }}>{t.about}</Box>
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
