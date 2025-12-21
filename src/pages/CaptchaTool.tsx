
import React, { useState } from 'react';
import { motion } from 'framer-motion';
const MotionDiv = (motion as any).div;
const MotionTypography = (motion as any).p; // Using variant mapping or raw element

import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Modal,
  Fade,
  Backdrop,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { useLanguage } from '../contexts/LanguageContext';
import CaptchaChallenge from '../components/Captcha/CaptchaChallenge';
import CaptchaHistory from '../components/Captcha/CaptchaHistory';
import { CaptchaAttempt } from '../../types';
import { appConfig } from '../config/appConfig';

const CaptchaTool: React.FC = () => {
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [showModal, setShowModal] = useState(false);
  const [attempts, setAttempts] = useState<CaptchaAttempt[]>([]);
  const [startTime, setStartTime] = useState(0);

  const { enabled, staggerDelay, duration, type } = appConfig.animation;

  const startChallenge = () => {
    setStartTime(Date.now());
    setShowModal(true);
  };

  const handleComplete = (success: boolean) => {
    const timeTaken = Date.now() - startTime;
    const newAttempt: CaptchaAttempt = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      success,
      timeTaken
    };
    setAttempts(prev => [...prev, newAttempt]);
    setShowModal(false);
  };

  const toolName = (t as any).captchaName || t.captcha;
  const toolDesc = (t as any).captchaDesc || t.description;

  // Animation Helper for staggered components
  const getAnimationProps = (index: number) => {
    if (!enabled) return {};
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        delay: staggerDelay * index, 
        duration: duration,
        type: type,
        stiffness: 100,
        damping: 15
      }
    };
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4, md: 6 }, maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={{ xs: 3, md: 6 }} alignItems="flex-start">
        {/* Left Section - Main Interaction */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <MotionDiv {...getAnimationProps(0)}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 4, sm: 6 }, 
                  borderRadius: 4, 
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: (theme) => theme.palette.mode === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.4)' 
                    : '0 4px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 10 }}>
                  <Box sx={{ 
                    width: 56, 
                    height: 56, 
                    bgcolor: 'primary.main', 
                    borderRadius: 2.5, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: 'white', 
                    boxShadow: '0 8px 16px -4px rgba(79, 70, 229, 0.4)',
                    mb: 4
                  }}>
                    <ShieldRoundedIcon sx={{ fontSize: 28 }} />
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2rem', md: '3rem' }, letterSpacing: '-0.02em' }}>
                    {toolName}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5, maxWidth: 500, lineHeight: 1.7 }}>
                    {toolDesc}
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    size="large"
                    fullWidth={isMobile}
                    disableElevation
                    startIcon={<PlayArrowRoundedIcon />}
                    onClick={startChallenge}
                    sx={{ 
                      borderRadius: 2.5, 
                      px: 5, 
                      py: 1.5, 
                      fontSize: '1rem', 
                      fontWeight: 800,
                    }}
                  >
                    {t.startChallenge}
                  </Button>
                </Box>

                <Box sx={{ 
                  position: 'absolute', 
                  top: -40, 
                  right: -40, 
                  width: 140, 
                  height: 140, 
                  border: '10px solid', 
                  borderColor: 'action.hover', 
                  borderRadius: '50%',
                  opacity: 0.4
                }} />
              </Paper>
            </MotionDiv>

            <Grid container spacing={3}>
               <Grid size={{ xs: 12, md: 6 }}>
                 <MotionDiv {...getAnimationProps(1)}>
                   <Paper sx={{ p: 3, height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <HelpRoundedIcon color="primary" sx={{ fontSize: 18 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{t.howItWorks}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
                        {t.howItWorksDesc}
                      </Typography>
                   </Paper>
                 </MotionDiv>
               </Grid>
               <Grid size={{ xs: 12, md: 6 }}>
                 <MotionDiv {...getAnimationProps(2)}>
                   <Paper sx={{ p: 3, height: '100%', borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <AnalyticsRoundedIcon color="primary" sx={{ fontSize: 18 }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{t.analytics}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
                        {t.analyticsDesc}
                      </Typography>
                   </Paper>
                 </MotionDiv>
               </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right Section - Statistics */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <MotionDiv {...getAnimationProps(3)}>
            <CaptchaHistory attempts={attempts} />
          </MotionDiv>
        </Grid>
      </Grid>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            sx: { bgcolor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' },
            timeout: 500,
          },
        }}
      >
        <Fade in={showModal}>
          <Box sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            outline: 'none',
            width: { xs: '90%', sm: 'auto' }
          }}>
            <CaptchaChallenge 
              onComplete={handleComplete} 
              onCancel={() => setShowModal(false)} 
            />
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CaptchaTool;
