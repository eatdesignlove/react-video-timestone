import { style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

export const container = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minWidth: 0,
  overflow: 'hidden',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.bgSubtle,
  '@media': {
    '(min-width: 769px)': { borderRadius: vars.radius.lg },
  },
});

export const stage = style({
  position: 'relative',
  width: '100%',
  minWidth: 0,
  aspectRatio: '16 / 9',
  flex: '0 0 auto',
  overflow: 'hidden',
  backgroundColor: '#070809',
});

export const startOverlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

export const posterImage = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const startScrim = style({
  position: 'absolute',
  inset: 0,
  background:
    'linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.56))',
});

export const startButton = style({
  position: 'relative',
  zIndex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.space[2],
  minHeight: vars.size.target,
  padding: `0 ${vars.space[5]}`,
  borderRadius: vars.radius.pill,
  border: `1px solid ${vars.color.borderStrong}`,
  backgroundColor: vars.color.scrim,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color: vars.color.text,
  fontFamily: vars.font.sans,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  cursor: 'pointer',
  transition: `transform 140ms ${vars.transition.easeOut}, background-color ${vars.transition.fast}, border-color ${vars.transition.fast}`,
  ':active': { transform: 'scale(0.97)' },
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: vars.color.surfaceHover,
        borderColor: vars.color.accent,
      },
    },
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      transition: `background-color ${vars.transition.fast}, border-color ${vars.transition.fast}`,
    },
  },
});

export const heroVideoBackground = style({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
});

export const heroBackgroundVideo = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
});

export const heroLoadingOverlay = style({
  position: 'absolute',
  inset: 0,
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space[4],
  backgroundColor: vars.color.bgSubtle,
});

export const heroLoadingContent = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space[3],
  width: '100%',
  maxWidth: '280px',
  color: vars.color.textMuted,
  fontSize: '13px',
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'center',
});

export const heroProgressBar = style({
  width: '100%',
  height: '3px',
  overflow: 'hidden',
  borderRadius: vars.radius.pill,
  backgroundColor: vars.color.borderStrong,
});

export const heroProgressFill = style({
  height: '100%',
  borderRadius: 'inherit',
  backgroundColor: vars.color.accent,
});

export const controlTray = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[3],
  minWidth: 0,
  padding: vars.space[3],
  borderTop: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgSubtle,
  '@media': {
    '(min-width: 769px)': {
      position: 'absolute',
      inset: 0,
      zIndex: 30,
      display: 'block',
      padding: 0,
      borderTop: 0,
      backgroundColor: 'transparent',
      pointerEvents: 'none',
    },
  },
});

export const controlGroup = style({
  display: 'grid',
  gridTemplateColumns: '57px auto 57px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minWidth: 0,
  opacity: 0,
  pointerEvents: 'none',
  transition: `opacity ${vars.transition.base}`,
  selectors: {
    '&.active': { opacity: 1, pointerEvents: 'auto' },
  },
  '@media': {
    '(min-width: 769px)': {
      position: 'absolute',
      zIndex: 2,
      bottom: vars.space[5],
      left: '50%',
      width: '360px',
      transform: 'translateX(-50%)',
    },
  },
});

export const rewindControl = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingRight: vars.space[3],
  borderRight: `1px solid ${vars.color.borderStrong}`,
});

export const segmentControls = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[3],
  padding: `0 ${vars.space[3]}`,
  '@media': {
    '(min-width: 769px)': { gap: vars.space[4] },
  },
});

export const transportBalance = style({
  width: '57px',
  height: '1px',
});

export const controlButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: vars.size.target,
  height: vars.size.target,
  padding: 0,
  borderRadius: vars.radius.pill,
  border: `1px solid ${vars.color.borderStrong}`,
  backgroundColor: vars.color.scrim,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color: vars.color.text,
  cursor: 'pointer',
  transition: `transform 140ms ${vars.transition.easeOut}, background-color ${vars.transition.fast}, border-color ${vars.transition.fast}, color ${vars.transition.fast}`,
  ':active': { transform: 'scale(0.97)' },
  selectors: {
    '&:focus-visible': {
      outline: `2px solid ${vars.color.accent}`,
      outlineOffset: '3px',
    },
    '&:disabled': { cursor: 'not-allowed', opacity: 0.5 },
  },
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: vars.color.surfaceHover,
        borderColor: vars.color.borderStrong,
      },
    },
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      transition: `background-color ${vars.transition.fast}, border-color ${vars.transition.fast}, color ${vars.transition.fast}`,
    },
  },
});

export const segmentButton = style([
  controlButton,
  {
    width: vars.size.target,
    height: vars.size.target,
    color: vars.color.textMuted,
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          borderColor: vars.color.borderStrong,
          backgroundColor: vars.color.surfaceHover,
          color: vars.color.text,
        },
      },
    },
  },
]);

export const rewindButton = style([
  controlButton,
  {
    width: vars.size.target,
    height: vars.size.target,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    color: vars.color.textMuted,
    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    selectors: {
      '&[aria-pressed="true"]': {
        borderColor: vars.color.accentBorder,
        backgroundColor: vars.color.accentSoft,
        color: vars.color.accent,
      },
    },
    '@media': {
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          borderColor: vars.color.borderStrong,
          backgroundColor: vars.color.surfaceHover,
          color: vars.color.text,
        },
      },
    },
  },
]);

export const playPauseButton = style([
  controlButton,
  {
    width: '56px',
    height: '56px',
    borderColor: vars.color.accent,
    backgroundColor: vars.color.accent,
    color: vars.color.accentText,
    boxShadow: '0 8px 24px rgba(39, 236, 122, 0.2)',
    '@media': {
      '(min-width: 769px)': { width: '64px', height: '64px' },
      '(hover: hover) and (pointer: fine)': {
        ':hover': {
          borderColor: vars.color.accent,
          backgroundColor: vars.color.accentHover,
        },
      },
    },
  },
]);

export const progressContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[2],
  width: '100%',
  minWidth: 0,
  color: vars.color.text,
  opacity: 0,
  pointerEvents: 'none',
  transition: `opacity ${vars.transition.base}`,
  selectors: {
    '&.active': { opacity: 1, pointerEvents: 'auto' },
  },
  '@media': {
    '(min-width: 769px)': {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      bottom: '108px',
      left: 0,
      gap: vars.space[4],
      padding: `0 ${vars.space[5]}`,
    },
  },
});

export const progressTime = style({
  width: '38px',
  flexShrink: 0,
  color: vars.color.textMuted,
  fontFamily: vars.font.mono,
  fontSize: '11px',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'center',
  '@media': {
    '(min-width: 769px)': {
      width: '44px',
      color: vars.color.text,
      fontSize: '12px',
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)',
    },
  },
});

export const progressTrack = style({
  position: 'relative',
  width: '100%',
  minWidth: 0,
  height: '3px',
  borderRadius: vars.radius.pill,
  backgroundColor: 'rgba(255, 255, 255, 0.24)',
  cursor: 'pointer',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: '-14px',
      right: 0,
      bottom: '-14px',
      left: 0,
    },
  },
});

export const progressPlaybackFill = style({
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  height: '100%',
  borderRadius: 'inherit',
  backgroundColor: vars.color.accent,
});

export const progressMarker = style({
  position: 'absolute',
  zIndex: 4,
  top: '50%',
  padding: `4px ${vars.space[2]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.text,
  color: vars.color.bg,
  fontFamily: vars.font.mono,
  fontSize: '11px',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
});

export const subtitleContainer = style({
  display: 'flex',
  justifyContent: 'center',
  minWidth: 0,
  padding: `0 ${vars.space[1]} ${vars.space[1]}`,
  textAlign: 'center',
  pointerEvents: 'none',
  '@media': {
    '(min-width: 769px)': {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      bottom: '144px',
      left: 0,
      padding: `0 ${vars.space[5]}`,
    },
  },
});

export const subtitleText = style({
  maxWidth: '100%',
  margin: 0,
  color: vars.color.text,
  fontSize: '13px',
  fontWeight: 500,
  lineHeight: 1.5,
  letterSpacing: '-0.005em',
  overflowWrap: 'anywhere',
  textAlign: 'center',
  textWrap: 'pretty',
  '@media': {
    '(min-width: 769px)': {
      maxWidth: '620px',
      fontSize: '15px',
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)',
    },
  },
});

export const subtitleMarker = style({
  position: 'absolute',
  zIndex: 3,
  top: '-4px',
  width: '2px',
  height: '11px',
  borderRadius: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.62)',
  transition: `background-color ${vars.transition.fast}`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': { backgroundColor: vars.color.text },
    },
  },
});

export const subtitleMarkerText = style({
  position: 'absolute',
  bottom: 'calc(100% + 6px)',
  left: '50%',
  width: 'fit-content',
  padding: `3px ${vars.space[2]}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.text,
  color: vars.color.bg,
  fontFamily: vars.font.mono,
  fontSize: '11px',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  opacity: 0,
  transform: 'translateX(-50%)',
  pointerEvents: 'none',
  transition: `opacity ${vars.transition.fast}`,
  selectors: {
    [`${subtitleMarker}:hover &`]: { opacity: 1 },
  },
});
