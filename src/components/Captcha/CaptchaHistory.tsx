
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const MotionDiv = (motion as any).div;
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress,
  List,
  ListItem,
  Avatar
} from '@mui/material';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { CaptchaAttempt } from '../../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface CaptchaHistoryProps {
  attempts: CaptchaAttempt[];
}

const CaptchaHistory: React.FC<CaptchaHistoryProps> = ({ attempts }) => {
  const { t } = useLanguage();
  
  const passRate = attempts.length > 0 
    ? Math.round((attempts.filter(a => a.success).length / attempts.length) * 100) 
    : 0;

  // Newest attempts at the top
  const sortedAttempts = [...attempts].sort((a, b) => b.timestamp - a.timestamp);

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toTimeString().split(' ')[0];
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Pass Rate Card */}
      <Paper sx={{ 
        p: 4, 
        borderRadius: 6, 
        border: '1px solid', 
        borderColor: 'divider', 
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <TimelineRoundedIcon color="primary" sx={{ fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>{t.passRate}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, lineHeight: 1 }}>{passRate}%</Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>/ 100%</Typography>
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={passRate} 
          sx={{ 
            height: 10, 
            borderRadius: 5, 
            bgcolor: 'action.hover',
            '& .MuiLinearProgress-bar': { borderRadius: 5 }
          }} 
        />
        <Typography variant="caption" sx={{ mt: 2, display: 'block', color: 'text.secondary', fontWeight: 600 }}>
          {t.basedOnAttempts.replace('{count}', attempts.length.toString())}
        </Typography>
      </Paper>

      {/* History Card */}
      <Paper sx={{ 
        p: 4, 
        borderRadius: 6, 
        border: '1px solid', 
        borderColor: 'divider', 
        bgcolor: 'background.paper' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <HistoryRoundedIcon color="primary" sx={{ fontSize: 20 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.5 }}>{t.history}</Typography>
        </Box>

        {/* Scrollable Container */}
        <Box sx={{ 
          maxHeight: 400, 
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
          },
        }}>
          <List disablePadding>
            <AnimatePresence initial={false}>
              {sortedAttempts.length > 0 ? (
                sortedAttempts.map((attempt) => (
                  <ListItem 
                    key={attempt.id} 
                    disablePadding 
                    component={MotionDiv}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    sx={{ mb: 1.5 }}
                  >
                    <Box sx={{ 
                      width: '100%', 
                      p: 2, 
                      borderRadius: 3, 
                      bgcolor: 'action.hover', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      border: '1px solid transparent',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: 'divider', bgcolor: 'action.selected' }
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32, 
                          bgcolor: attempt.success ? 'success.main' : 'error.main',
                          boxShadow: attempt.success ? '0 4px 12px rgba(46, 125, 50, 0.3)' : '0 4px 12px rgba(211, 47, 47, 0.3)'
                        }}>
                          {attempt.success ? <CheckCircleRoundedIcon sx={{ fontSize: 18 }} /> : <CancelRoundedIcon sx={{ fontSize: 18 }} />}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.2 }}>
                            {attempt.success ? t.success : t.failed}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            {formatTime(attempt.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', fontFamily: 'monospace' }}>
                        {attempt.timeTaken}ms
                      </Typography>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <Box sx={{ py: 6, textAlign: 'center', opacity: 0.5 }}>
                   <Typography variant="body2" sx={{ fontWeight: 600 }}>{t.noRecords}</Typography>
                </Box>
              )}
            </AnimatePresence>
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default CaptchaHistory;
