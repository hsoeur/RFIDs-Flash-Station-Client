import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import logoHorizon from '../assets/logo.jpg';

/**
 * Composant de style réutilisable pour les interfaces Horizon Telecom
 * Encapsule les styles communs des composants AuthenticateUser et ManufacturingOrderNotifications
 */
const StyledContainer = ({ 
  children, 
  variant = 'page', // 'page', 'auth', 'loading', 'error'
  title,
  subtitle,
  loading = false,
  error = null,
  loadingText = 'Chargement...',
  errorText = null,
  stats = null,
  actions = null,
  className = '',
  showLogo = true,
  ...props 
}) => {
  // Rendu pour l'état de chargement
  if (loading) {
    return (
      <Box 
        className={`loading-container ${className}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: variant === 'auth' ? '100vh' : '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
        {...props}
      >
        {showLogo && <BackgroundLogo src={logoHorizon} alt="Horizon Telecom" opacity={0.15} />}
        <CircularProgress sx={{ color: '#4a6fa5', mb: 2, zIndex: 1 }} />
        <Typography sx={{ color: '#1a1a1a', fontSize: '0.875rem', zIndex: 1 }}>
          {loadingText}
        </Typography>
      </Box>
    );
  }

  // Rendu pour l'état d'erreur
  if (error) {
    return (
      <Box 
        className={`error-container ${className}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: variant === 'auth' ? '100vh' : '400px',
          width: '100%',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
        {...props}
      >
        {showLogo && <BackgroundLogo src={logoHorizon} alt="Horizon Telecom" opacity={0.15} />}
        <Typography sx={{ color: '#d32f2f', fontSize: '1.1rem', zIndex: 1 }}>
          {errorText || error}
        </Typography>
      </Box>
    );
  }

  // Rendu pour l'authentification (centré)
  if (variant === 'auth') {
    return (
      <Box 
        className={`auth-container ${className}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100%',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
        {...props}
      >
        {showLogo && <BackgroundLogo src={logoHorizon} alt="Horizon Telecom" opacity={0.15} />}
        <Box sx={{
          maxWidth: '440px',
          width: '100%',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {title && (
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#1a1a1a', 
                fontWeight: 600,
                fontSize: '1.5rem',
                mb: 1,
                textAlign: 'center',
                letterSpacing: '-0.02em'
              }}
            >
              {title}
            </Typography>
          )}
          
          {subtitle && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666666',
                mb: 4,
                fontSize: '0.875rem',
                textAlign: 'center'
              }}
            >
              {subtitle}
            </Typography>
          )}

          {children}
        </Box>
      </Box>
    );
  }

  // Rendu pour les pages (par défaut)
  return (
    <Box 
      className={`page-container ${className}`}
      sx={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#ffffff'
      }}
      {...props}
    >
      {showLogo && <BackgroundLogo src={logoHorizon} alt="Horizon Telecom" opacity={0.25} />}
      {/* Header de page */}
      {(title || subtitle || stats || actions) && (
        <Box 
          className="page-header"
          sx={{ 
            borderBottom: '1px solid #e0e0e0',
            padding: '20px 32px',
            backgroundColor: 'transparent',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3
          }}>
            <Box>
              {title && (
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: '#1a1a1a', 
                    fontWeight: 600,
                    fontSize: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#666666',
                    mt: 0.5,
                    fontSize: '0.875rem'
                  }}
                >
                  {subtitle}
                </Typography>
              )}
            </Box>
            
            {(stats || actions) && (
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}>
                {stats}
                {actions}
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Contenu principal */}
      <Box sx={{ 
        padding: '32px',
        position: 'relative',
        zIndex: 1
      }}>
        {children}
      </Box>
    </Box>
  );
};

/**
 * Composant pour les éléments de statistiques dans le header
 */
export const StatBadge = ({ children, color = '#dc2626', ...props }) => (
  <Typography 
    variant="body2" 
    sx={{ 
      color,
      fontSize: '0.875rem',
      fontWeight: 600
    }}
    {...props}
  >
    {children}
  </Typography>
);

/**
 * Composant pour les actions dans le header
 */
export const HeaderActions = ({ children, ...props }) => (
  <Box 
    sx={{ 
      display: 'flex',
      alignItems: 'center',
      gap: 2
    }}
    {...props}
  >
    {children}
  </Box>
);

/**
 * Composant pour l'état vide
 */
export const EmptyState = ({ children, text = 'Aucune donnée disponible' }) => (
  <Box sx={{
    textAlign: 'center',
    padding: '80px 20px',
    color: '#999999'
  }}>
    {children || (
      <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
        {text}
      </Typography>
    )}
  </Box>
);

/**
 * Composant pour l'arrière-plan avec logo
 */
export const BackgroundLogo = ({ src, alt = 'Logo', opacity = 0.35 }) => (
  <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 0,
      opacity,
      pointerEvents: 'none',
      width: '800px',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: '100%',
        height: 'auto',
        objectFit: 'contain'
      }}
    />
  </Box>
);

/**
 * Composant de bouton professionnel standardisé
 */
export const ProfessionalButton = ({ 
  children, 
  variant = 'primary', // 'primary', 'secondary', 'success', 'warning', 'danger', 'info'
  startIcon,
  endIcon,
  disabled = false,
  fullWidth = false,
  size = 'medium', // 'small', 'medium', 'large'
  ...props 
}) => {
  const variantStyles = {
    primary: {
      backgroundColor: '#4a6fa5',
      '&:hover': {
        backgroundColor: '#3a5a85',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(74, 111, 165, 0.3)'
      }
    },
    secondary: {
      backgroundColor: '#5a6c7d',
      '&:hover': {
        backgroundColor: '#4a5c6d',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(90, 108, 125, 0.3)'
      }
    },
    success: {
      backgroundColor: '#2d7a4f',
      '&:hover': {
        backgroundColor: '#246a3f',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(45, 122, 79, 0.3)'
      }
    },
    warning: {
      backgroundColor: '#d4a017',
      color: '#1a1a1a',
      '&:hover': {
        backgroundColor: '#b88b14',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(212, 160, 23, 0.3)'
      }
    },
    danger: {
      backgroundColor: '#c23934',
      '&:hover': {
        backgroundColor: '#a82e2a',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(194, 57, 52, 0.3)'
      }
    },
    info: {
      backgroundColor: '#5b4a8f',
      '&:hover': {
        backgroundColor: '#4a3a7f',
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(91, 74, 143, 0.3)'
      }
    }
  };

  const sizeStyles = {
    small: {
      height: 42,
      fontSize: '0.875rem',
      padding: '8px 16px'
    },
    medium: {
      height: 52,
      fontSize: '0.95rem',
      padding: '12px 24px'
    },
    large: {
      height: 62,
      fontSize: '1rem',
      padding: '16px 32px'
    }
  };

  return (
    <Box
      component="button"
      disabled={disabled}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        width: fullWidth ? '100%' : 'auto',
        color: variant === 'warning' ? '#1a1a1a' : '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 500,
        letterSpacing: '0.02em',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        opacity: disabled ? 0.5 : 1,
        position: 'relative',
        overflow: 'hidden',
        '&:active': {
          transform: disabled ? 'none' : 'translateY(0)',
          boxShadow: disabled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.1)'
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none'
        },
        ...variantStyles[variant],
        ...sizeStyles[size]
      }}
      {...props}
    >
      {startIcon && <Box sx={{ display: 'flex', alignItems: 'center' }}>{startIcon}</Box>}
      {children}
      {endIcon && <Box sx={{ display: 'flex', alignItems: 'center' }}>{endIcon}</Box>}
    </Box>
  );
};

export default StyledContainer;

