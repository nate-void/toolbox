
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const MotionH1 = (motion as any).h1;
const MotionP = (motion as any).p;
const MotionDiv = (motion as any).div;
import * as RouterDOM from 'react-router-dom';
const { Link, useNavigate } = RouterDOM as any;
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip, 
  Button,
  useMediaQuery,
  useTheme,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { appConfig } from '../config/appConfig';
import { useSearch } from '../contexts/SearchContext';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { searchQuery, setSearchQuery } = useSearch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { enabled, staggerDelay, duration, type } = appConfig.animation;

  const getToolName = (id: string) => (t as any)[`${id}Name`] || id;
  const getToolDesc = (id: string) => (t as any)[`${id}Desc`] || '';

  const filteredTools = useMemo(() => appConfig.tools.filter(tool => {
    const name = getToolName(tool.id);
    const desc = getToolDesc(tool.id);
    return name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           desc.toLowerCase().includes(searchQuery.toLowerCase());
  }), [searchQuery, t]);

  // Candidates for fuzzy/dropdown matching
  const candidates = useMemo(() => {
    if (!searchQuery) return [];
    return appConfig.tools.filter(tool => 
      getToolName(tool.id).toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [searchQuery, t]);

  // Animation Helper
  const getAnimationProps = (index: number) => {
    if (!enabled) return {};
    return {
      initial: { opacity: 0, scale: 0.98, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      transition: { 
        delay: staggerDelay * index, 
        duration: duration,
        type: type,
        stiffness: 100,
        damping: 15
      }
    };
  };

  const getHeaderAnimationProps = (index: number) => {
    if (!enabled) return {};
    return {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1 }
    };
  };

  return (
    <Box sx={{ p: { xs: 3, sm: 4, md: 6 }, maxWidth: 1100, mx: 'auto' }}>
      
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <MotionH1 
          {...getHeaderAnimationProps(0)}
          style={{ 
            fontSize: isMobile ? '2.2rem' : '3.5rem', 
            fontWeight: 900, 
            letterSpacing: '-0.04em', 
            marginBottom: '1.25rem', 
            color: 'var(--mui-palette-text-primary)' 
          }}
        >
          {t.welcome}
        </MotionH1>
        <MotionP 
          {...getHeaderAnimationProps(1)}
          style={{ 
            fontSize: isMobile ? '1rem' : '1.25rem', 
            color: 'var(--mui-palette-text-secondary)', 
            fontWeight: 500, 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}
        >
          {t.description}
        </MotionP>
      </Box>

      {/*Search Bar Section*/}
      <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 100 }}>
        <MotionDiv
          {...getHeaderAnimationProps(2)}
          style={{ width: '100%', maxWidth: 600 }}
        >
          <Box sx={{ position: 'relative' }}>
            <Paper 
              elevation={isSearchFocused ? 12 : 2}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 2, 
                py: 1, 
                borderRadius: 4,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: isSearchFocused ? 'primary.main' : 'divider',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <SearchRoundedIcon sx={{ color: 'text.secondary', mr: 2 }} />
              <InputBase
                fullWidth
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                sx={{ fontSize: 16, fontWeight: 500 }}
              />
            </Paper>

            <AnimatePresence>
              {isSearchFocused && candidates.length > 0 && (
                <MotionDiv
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 8, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  style={{ 
                    position: 'absolute', 
                    top: '100%', 
                    left: 0, 
                    right: 0, 
                    zIndex: 200 
                  }}
                >
                  <Paper sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <List disablePadding>
                      {candidates.map((tool) => (
                        <ListItem key={tool.id} disablePadding>
                          <ListItemButton onClick={() => navigate(tool.path)} sx={{ py: 1.5 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <tool.icon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={getToolName(tool.id)} 
                              primaryTypographyProps={{ fontWeight: 700, fontSize: 14 }}
                              secondary={tool.version}
                              secondaryTypographyProps={{ fontSize: 11 }}
                            />
                            <ArrowForwardRoundedIcon sx={{ fontSize: 16, opacity: 0.5 }} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </MotionDiv>
              )}
            </AnimatePresence>
          </Box>
        </MotionDiv>
      </Box>

      <Grid container spacing={3}>
        {filteredTools.map((tool, index) => {
          const ToolIcon = tool.icon;
          const toolName = getToolName(tool.id);
          const toolDesc = getToolDesc(tool.id);
          
          return (
            <Grid key={tool.id} size={{ xs: 12, md: 6 }}>
              <MotionDiv {...getAnimationProps(index)}>
                <Card sx={{ 
                  borderRadius: 4,
                  border: '1px solid', 
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  boxShadow: (theme) => theme.palette.mode === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.4)' 
                    : '0 4px 20px rgba(0,0,0,0.05)',
                  height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': { 
                    transform: isMobile ? 'none' : 'translateY(-6px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark' 
                      ? '0 16px 32px rgba(0,0,0,0.6)' 
                      : '0 16px 32px rgba(0,0,0,0.08)',
                    borderColor: 'primary.main'
                  }
                }}>
                  <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box sx={{ 
                        width: 48, 
                        height: 48, 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        borderRadius: 2.5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px -6px rgba(79, 70, 229, 0.5)'
                      }}>
                        <ToolIcon sx={{ fontSize: 24 }} />
                      </Box>
                      <Chip 
                        label={tool.version} 
                        size="small" 
                        sx={{ fontSize: 10, fontWeight: 800, borderRadius: 2 }} 
                      />
                    </Box>

                    <Typography variant="h5" sx={{color: 'text.primary', fontWeight: 900, mb: 1.5, fontSize: isMobile ? '1.25rem' : '1.5rem' }}>
                      {toolName}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, lineHeight: 1.6, mb: 4, minHeight: '3.2em' }}>
                      {toolDesc}
                    </Typography>

                    <Button 
                      component={Link}
                      to={tool.path}
                      variant="contained"
                      disableElevation
                      fullWidth={isMobile}
                      endIcon={<ArrowForwardRoundedIcon />}
                      sx={{ borderRadius: 2.5, fontSize: 12, fontWeight: 800, px: 3, py: 1 }}
                    >
                      {tool.actionLabel || t.launchApp}
                    </Button>
                  </CardContent>
                </Card>
              </MotionDiv>
            </Grid>
          );
        })}

        {filteredTools.length === 0 && (
          <Grid size={12}>
             <Box sx={{ py: 10, textAlign: 'center' }}>
               <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                 {t.noToolsFound}
               </Typography>
             </Box>
          </Grid>
        )}

        {searchQuery === '' && filteredTools.length > 0 && (
          <Grid size={{ xs: 12, md: 6 }}>
            <MotionDiv {...getAnimationProps(filteredTools.length)}>
              <Box sx={{ 
                height: '100%', 
                minHeight: 200, 
                border: '2px dashed', 
                borderColor: 'divider',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                textAlign: 'center',
                bgcolor: 'action.hover',
                opacity: 0.8,
                transition: 'border-color 0.3s',
                '&:hover': { borderColor: 'primary.light' }
              }}>
                <HelpOutlineRoundedIcon sx={{ fontSize: 32, mb: 2, color: 'text.disabled' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.disabled' }}>
                  {t.comingSoon}
                </Typography>
              </Box>
            </MotionDiv>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
