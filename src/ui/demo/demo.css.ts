import { style, keyframes } from '@vanilla-extract/css';

// 다크 테마 컬러 시스템
const colors = {
  // 기본 다크 컬러
  dark: '#0a0a0b',
  darkSecondary: '#1a1a1d',
  darkCard: '#161618',

  // 그라데이션 컬러
  gradientPrimary: '#f18463',
  gradientSecondary: '#e2f65c',
  gradientAccent: '#06b6d4',

  // 텍스트 컬러
  textPrimary: '#ffffff',
  textSecondary: '#a1a1aa',
  textMuted: '#71717a',

  // 액센트 컬러
  accent: '#10b981',
  accentHover: '#059669',
  warning: '#f59e0b',

  // 글래스모피즘
  glass: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

// 애니메이션
const fadeInUp = keyframes({
  '0%': { opacity: 0, transform: 'translateY(30px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const gradientShift = keyframes({
  '0%, 100%': { backgroundPosition: '0% 50%' },
  '50%': { backgroundPosition: '100% 50%' },
});

// 메인 컨테이너
export const container = style({
  width: '100%',
  height: '0',
  paddingBottom: '56.25%',
  marginBottom: '120px',
  backgroundColor: colors.dark,
  position: 'relative',
  borderRadius: '8px',
  '@media': {
    '(min-width: 769px)': {
      overflow: 'hidden',
      marginBottom: '0',
    },
  },
});

// 히어로 배경 영상
export const heroVideoBackground = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
});

export const heroBackgroundVideo = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  objectFit: 'cover',
  objectPosition: 'center',
});

// 히어로 오버레이
export const heroOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: `
    linear-gradient(135deg, 
      ${colors.dark}e6 0%, 
      ${colors.dark}cc 30%, 
      ${colors.dark}80 60%, 
      ${colors.dark}b3 100%
    )
  `,
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const heroContent = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 20px',
  position: 'relative',
  zIndex: 3,
  textAlign: 'center',
});

export const heroText = style({
  animation: `${fadeInUp} 1s ease-out`,
});

export const heroTitle = style({
  fontSize: '4rem',
  fontWeight: 900,
  lineHeight: 1.1,
  marginBottom: '24px',
  background: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.textSecondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '2.5rem',
    },
  },
});

export const gradientText = style({
  display: 'block',
  background: `linear-gradient(135deg, ${colors.gradientPrimary}, ${colors.gradientSecondary}, ${colors.gradientAccent})`,
  backgroundSize: '200% 200%',
  animation: `${gradientShift} 4s ease infinite`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const heroSubtitle = style({
  fontSize: '1.5rem',
  color: colors.textSecondary,
  lineHeight: 1.6,
  maxWidth: '500px',
  margin: '0 auto 40px',
  wordBreak: 'keep-all',

  '@media': {
    '(max-width: 768px)': {
      fontSize: '1.2rem',
    },
  },
});

export const heroFeatures = style({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',

  '@media': {
    '(max-width: 768px)': {
      justifyContent: 'center',
    },
  },
});

export const featureBadge = style({
  padding: '8px 16px',
  background: colors.glass,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: '50px',
  fontSize: '0.9rem',
  color: colors.textPrimary,
  fontWeight: 500,
});

// 동기화 인디케이터
export const syncIndicator = style({
  marginTop: '50px',
  padding: '30px',
  background: colors.glass,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: '16px',
  maxWidth: '500px',
  margin: '50px auto 0',
});

export const syncText = style({
  textAlign: 'center',
});

export const syncLabel = style({
  display: 'block',
  fontSize: '1.1rem',
  fontWeight: 600,
  color: colors.textPrimary,
  marginBottom: '20px',
  transition: 'all 0.6s ease',
});

export const heroCtaButton = style({
  padding: '16px 32px',
  background: `linear-gradient(135deg, ${colors.gradientPrimary}, ${colors.gradientSecondary})`,
  color: colors.textPrimary,
  border: 'none',
  borderRadius: '50px',
  fontSize: '1.1rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.4)',

  ':hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)',
  },
});

// 히어로 로딩 오버레이 (배경영상용)

export const heroLoadingOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(10, 10, 11, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  backdropFilter: 'blur(5px)',
});

export const heroLoadingContent = style({
  textAlign: 'center',
  color: colors.textPrimary,
  padding: '30px',
  borderRadius: '16px',
});

export const heroProgressBar = style({
  width: '300px',
  height: '6px',
  backgroundColor: colors.glass,
  borderRadius: '3px',
  overflow: 'hidden',
  marginBottom: '15px',
  border: `1px solid ${colors.glassBorder}`,
});

export const heroProgressFill = style({
  height: '100%',
  background: `linear-gradient(90deg, ${colors.gradientPrimary}, ${colors.gradientSecondary})`,
  borderRadius: '3px',
  transition: 'width 0.3s ease',
  boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
});

// 메인 컨텐츠
export const main = style({
  backgroundColor: colors.dark,
  position: 'relative',
  zIndex: 1,
});

export const demoSection = style({
  padding: '80px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
});

export const sectionTitle = style({
  fontSize: '2.5rem',
  fontWeight: 800,
  textAlign: 'center',
  marginBottom: '60px',
  background: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.textSecondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const video = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const videoOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const overlayContent = style({
  textAlign: 'center',
  color: colors.textPrimary,
});

export const overlayTitle = style({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '20px',
  transition: 'all 0.6s ease',
});

export const overlayButton = style({
  padding: '12px 24px',
  background: `linear-gradient(135deg, ${colors.gradientPrimary}, ${colors.gradientSecondary})`,
  color: colors.textPrimary,
  border: 'none',
  borderRadius: '50px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',

  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
  },
});

export const visible = style({
  opacity: 1,
  transform: 'translateY(0)',
});

export const hidden = style({
  opacity: 0,
  transform: 'translateY(20px)',
});

export const controlGroup = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '0 auto',
  zIndex: 200,
  opacity: 0,
  '@media': {
    '(min-width: 481px)': {
      gap: '12px',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  selectors: {
    '&.active': {
      opacity: 0.7,
    },
  },
});

export const controlButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#fff',
  borderRadius: '100%',
  cursor: 'pointer',
  width: '40px',
  height: '40px',
  border: 'none',
  '@media': {
    '(min-width: 481px)': {
      width: '70px',
      height: '70px',
    },
  },

  ':hover': {
    background: colors.accent,
    borderColor: colors.accent,
  },

  selectors: {
    '&.active': {
      background: colors.accent,
      cursor: 'default',
    },
  },
});

export const controlLabel = style({
  fontSize: '0.9rem',
  color: colors.textSecondary,
  fontWeight: 500,
});

// 기능 섹션
export const codeSection = style({
  padding: '80px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  background: colors.darkSecondary,
  borderRadius: '24px',
  border: `1px solid ${colors.glassBorder}`,
  marginTop: '80px',
});

export const codeSectionTitle = style({
  fontSize: '2rem',
  fontWeight: 700,
  marginBottom: '50px',
  textAlign: 'center',
  background: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.textSecondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

export const featureGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '30px',
  marginBottom: '60px',

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const featureCard = style({
  padding: '30px',
  background: colors.glass,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${colors.glassBorder}`,
  borderRadius: '16px',
  transition: 'all 0.3s ease',

  ':hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  },
});

export const featureCardTitle = style({
  margin: '0 0 15px',
  fontSize: '1.3rem',
  color: colors.textPrimary,
  fontWeight: 700,
});

export const featureCardText = style({
  margin: '0 0 20px',
  fontSize: '1rem',
  color: colors.textSecondary,
  lineHeight: 1.6,
});

export const miniCode = style({
  backgroundColor: colors.dark,
  color: colors.textPrimary,
  padding: '16px',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontFamily: 'JetBrains Mono, Consolas, monospace',
  margin: 0,
  border: `1px solid ${colors.glassBorder}`,
});

export const architectureSection = style({
  marginTop: '50px',
  padding: '40px',
  background: colors.glass,
  borderRadius: '16px',
  border: `1px solid ${colors.glassBorder}`,
});

export const architectureTitle = style({
  margin: '0 0 20px',
  fontSize: '1.5rem',
  color: colors.textPrimary,
  fontWeight: 700,
});

export const codeExample = style({
  backgroundColor: colors.dark,
  color: colors.textPrimary,
  padding: '30px',
  borderRadius: '12px',
  fontSize: '0.9rem',
  lineHeight: 1.6,
  overflow: 'auto',
  fontFamily: 'JetBrains Mono, Consolas, monospace',
  border: `1px solid ${colors.glassBorder}`,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
});

// 로딩 관련 스타일 (기존 유지하되 다크 테마에 맞게 조정)
export const loadingOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(10, 10, 11, 0.95)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 20,
  borderRadius: '16px',
});

export const loadingContent = style({
  textAlign: 'center',
  color: colors.textPrimary,
  maxWidth: '300px',
});

export const loadingTitle = style({
  fontSize: '1.2rem',
  marginBottom: '20px',
  margin: 0,
  fontWeight: 600,
});

export const loadingText = style({
  fontSize: '0.9rem',
  margin: '10px 0 0',
  opacity: 0.8,
  color: colors.textSecondary,
});

export const progressBar = style({
  width: '100%',
  height: '8px',
  backgroundColor: colors.glass,
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: '10px',
});

export const progressFill = style({
  height: '100%',
  background: `linear-gradient(90deg, ${colors.gradientPrimary}, ${colors.gradientSecondary})`,
  borderRadius: '4px',
  transition: 'width 0.3s ease',
});

export const heroControls = style({
  marginTop: '30px',
  padding: '25px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '12px',
  border: `1px solid ${colors.glassBorder}`,
  transition: 'all 0.3s ease',
});

export const heroControlsTitle = style({
  fontSize: '1.2rem',
  fontWeight: 600,
  color: colors.textPrimary,
  textAlign: 'center',
  opacity: 0.9,
  margin: '0 auto 20px',
});

// 진행바 섭션 스타일
export const progressSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginTop: '20px',
});

export const progressContainer = style({
  position: 'absolute',
  bottom: '20px',
  left: 0,
  right: 0,
  zIndex: 1000,
  width: '100%',
  gap: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: 'white',
  padding: '0 16px',
  opacity: 0,
  transition: 'transform 0.3s ease',
  selectors: {
    '&.active': {
      opacity: 1,
    },
  },
  '@media': {
    '(min-width: 481px)': {
      bottom: '30px',
      padding: '0 24px',
      gap: '16px',
    },
  },
});

export const progressTime = style({
  width: '50px',
  textAlign: 'center',
  fontSize: '14px',
  color: 'white',
  fontWeight: 700,
  fontFamily: 'Inter',
});

export const progressTrack = style({
  position: 'relative',
  width: '100%',
  height: '4px',
  background: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '4px',
  cursor: 'pointer',
});

export const progressPlaybackFill = style({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  background: `#27EC7A`,
  borderRadius: '4px',
  transition: 'width 0.1s ease',
  zIndex: 1,
});

export const progressMarker = style({
  position: 'absolute',
  zIndex: 300,
  top: '50%',
  padding: '6px 16px',
  background: '#27EC7A',
  color: '#0D0C0C',
  borderRadius: '24px',
  fontSize: '12px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'box-shadow 0.2s ease',
  boxShadow: '0 2px 8px rgba(99, 241, 156, 0)',
  pointerEvents: 'none',

  ':hover': {
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 2px 12px rgba(99, 241, 149, 0.5)',
  },

  ':active': {
    transform: 'translate(-50%, -50%) scale(0.95)',
  },
});

// 자막 스타일
export const subtitleContainer = style({
  position: 'absolute',
  top: 'calc(100% + 40px)',
  left: 0,
  right: 0,
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  // bottom: '80px',
  textAlign: 'center',
  animation: `${fadeInUp} 0.8s ease-out`,
  pointerEvents: 'none',
  padding: '0 20px',
  '@media': {
    '(min-width: 481px)': {
      top: 'initial',
      bottom: '90px',
    },
  },
});

export const subtitleText = style({
  fontSize: '14px',
  color: colors.textPrimary,
  fontWeight: 700,
  lineHeight: 1.4,
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  letterSpacing: '0.5px',
  textAlign: 'center',
  maxWidth: '90%',
  wordBreak: 'keep-all',
  '@media': {
    '(min-width: 481px)': {
      fontSize: '16px',
      maxWidth: '600px',
    },
  },
});

export const subtitleMarker = style({
  position: 'absolute',
  top: '-10px',
  width: '4px',
  height: '24px',
  background: '#fff',
  zIndex: 3,
});

export const subtitleMarkerText = style({
  fontSize: '12px',
  background: '#fff',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  padding: '4px 8px',
  borderRadius: '4px',
  color: '#000',
  fontWeight: 700,
  opacity: 0,
  pointerEvents: 'none',
  position: 'absolute',
  bottom: '100%',
  left: '50%',
  transform: 'translateX(-50%)',
  selectors: {
    [`${subtitleMarker}:hover &`]: {
      opacity: 1,
    },
  },
});
