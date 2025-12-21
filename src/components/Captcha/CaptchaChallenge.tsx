
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const MotionDiv = (motion as any).div;
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Paper, 
  CircularProgress,
  alpha
} from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLanguage } from '../../contexts/LanguageContext';

interface CaptchaChallengeProps {
  onComplete: (success: boolean) => void;
  onCancel: () => void;
}

const CaptchaChallenge: React.FC<CaptchaChallengeProps> = ({ onComplete, onCancel }) => {
  const { t, language } = useLanguage();
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [targetIndices, setTargetIndices] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const categories = [
    { name: language === 'zh' ? '猫' : 'Cats' },
    { name: language === 'zh' ? '鲜花' : 'Flowers' },
    { name: language === 'zh' ? '桥梁' : 'Bridges' }
  ];
  const [currentCategory] = useState(categories[Math.floor(Math.random() * categories.length)]);

  const generateChallenge = () => {
    const count = Math.floor(Math.random() * 3) + 3;
    const indices: number[] = [];
    while (indices.length < count) {
      const r = Math.floor(Math.random() * 9);
      if (!indices.includes(r)) indices.push(r);
    }
    setTargetIndices(indices);
    setSelectedIndices([]);
    const newImages = Array.from({ length: 9 }).map((_, i) => 
      `https://picsum.photos/300/300?random=${Math.random() + i}`
    );
    setImages(newImages);
  };

  useEffect(() => {
    generateChallenge();
  }, []);

  const toggleSelect = (index: number) => {
    setSelectedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const isSuccess = 
        selectedIndices.length === targetIndices.length && 
        selectedIndices.every(i => targetIndices.includes(i));
      onComplete(isSuccess);
      setIsVerifying(false);
    }, 800);
  };

  return (
    <Paper 
      elevation={24}
      sx={{ 
        borderRadius: 5, 
        width: 440, 
        maxWidth: '95vw',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex', 
        flexDirection: 'column',
        userSelect: 'none', // Prevent accidental blue selection on double-click
        boxShadow: (theme) => theme.palette.mode === 'dark' 
          ? '0 32px 64px rgba(0,0,0,0.8)' 
          : '0 32px 64px rgba(0,0,0,0.15)'
      }}
    >
      {/* Header Block: Two lines only as requested */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: 'white', 
        pt: 6, 
        pb: 5, 
        px: 3, 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract Background Decoration */}
        <Box sx={{ 
          position: 'absolute', 
          top: -40, 
          right: -40, 
          width: 140, 
          height: 140, 
          borderRadius: '50%', 
          bgcolor: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none'
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.9, mb: 1.5, letterSpacing: 2, textTransform: 'uppercase' }}>
            {language === 'zh' ? '选择所有包含' : 'SELECT ALL SQUARES WITH'}
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em', textShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            {currentCategory.name}
          </Typography>
        </Box>
      </Box>

      {/* Grid Container */}
      <Box sx={{ p: 1.5, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
          {images.map((src, idx) => (
            <Box 
              key={idx}
              onClick={() => toggleSelect(idx)}
              onDoubleClick={(e) => e.preventDefault()}
              sx={{ 
                position: 'relative', 
                aspectRatio: '1/1', 
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: 1,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: selectedIndices.includes(idx) ? 'scale(0.92)' : 'scale(1)',
                '&:hover': { opacity: 0.95 }
              }}
            >
              <img 
                src={src} 
                alt="" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                  pointerEvents: 'none' // Prevent dragging image
                }} 
              />
              <AnimatePresence>
                {selectedIndices.includes(idx) && (
                  <MotionDiv 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0, 
                      backgroundColor: 'rgba(79, 70, 229, 0.5)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      zIndex: 5
                    }}
                  >
                    <Box sx={{ 
                      bgcolor: 'white', 
                      borderRadius: '50%', 
                      p: 0.75, 
                      color: 'primary.main', 
                      display: 'flex', 
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3)' 
                    }}>
                      <CheckRoundedIcon sx={{ fontSize: 28, fontWeight: 900 }} />
                    </Box>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Footer Block - Increased spacing and black verify button */}
      <Box sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        {/* Left Icons - Increased gap and size */}
        <Box sx={{ display: 'flex', gap: 4, pl: 0.5 }}>
          <IconButton 
            onClick={generateChallenge} 
            sx={{ 
              color: 'text.secondary',
              p: 0,
              '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          >
            <RefreshRoundedIcon />
          </IconButton>
          <IconButton 
            onClick={onCancel}
            sx={{ 
              color: 'text.secondary',
              p: 0,
              '&:hover': { color: 'error.main', bgcolor: 'transparent' },
              '& .MuiSvgIcon-root': { fontSize: 32 }
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Solid Black Button */}
        <Button 
          variant="contained" 
          disableElevation
          disabled={isVerifying || selectedIndices.length === 0}
          onClick={handleVerify}
          sx={{ 
            borderRadius: 10, 
            px: 4.5, 
            py: 1.5, 
            fontSize: '1rem',
            fontWeight: 800,
            textTransform: 'none',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a',
            color: (theme) => theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
            '&:hover': {
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#f0f0f0' : '#000000',
            },
            '&.Mui-disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'text.disabled',
              opacity: 0.5
            }
          }}
        >
          {isVerifying ? <CircularProgress size={24} color="inherit" /> : (language === 'zh' ? '立即验证' : t.verify)}
        </Button>
      </Box>
    </Paper>
  );
};

export default CaptchaChallenge;
