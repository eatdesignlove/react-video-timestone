import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const heroEnter = keyframes({
  from: { opacity: 0, transform: 'translateY(10px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const frameEnter = keyframes({
  from: { opacity: 0, transform: 'translateY(14px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeOnly = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

export const container = style({
  position: 'relative',
  paddingTop: '104px',
  '@media': { '(min-width: 769px)': { paddingTop: '148px' } },
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      height: '520px',
      backgroundImage: 'url(/bg-hero.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.8,
      maskImage:
        'linear-gradient(to bottom, #000 0%, #000 42%, transparent 100%)',
      WebkitMaskImage:
        'linear-gradient(to bottom, #000 0%, #000 42%, transparent 100%)',
      pointerEvents: 'none',
      '@media': { '(min-width: 769px)': { height: '760px' } },
    },
  },
});

export const content = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '720px',
  minWidth: 0,
  margin: '0 auto',
  padding: `0 ${vars.space[5]}`,
  gap: vars.space[4],
  textAlign: 'center',
});

export const title = style({
  width: '100%',
  minWidth: 0,
  margin: 0,
  color: vars.color.text,
  fontFamily: "'Belanosima', 'Inter', sans-serif",
  fontSize: 'clamp(29px, 8.1vw, 38px)',
  fontWeight: 600,
  letterSpacing: '-0.015em',
  lineHeight: 1.08,
  overflowWrap: 'anywhere',
  textWrap: 'balance',
  animation: `${heroEnter} 420ms ${vars.transition.easeOut} both`,
  '@media': {
    '(min-width: 769px)': { fontSize: '56px' },
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      animation: `${fadeOnly} 180ms ease both`,
    },
  },
});

export const titleAccent = style({
  display: 'inline-block',
  maxWidth: '100%',
  paddingBottom: '0.07em',
  color: '#49E78B',
  backgroundImage: 'linear-gradient(180deg, #FFFFFF 4%, #49E78B 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

export const description = style({
  width: '100%',
  maxWidth: '520px',
  minWidth: 0,
  margin: 0,
  color: vars.color.textMuted,
  fontFamily: vars.font.sans,
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: 1.6,
  overflowWrap: 'anywhere',
  textWrap: 'pretty',
  animation: `${heroEnter} 420ms 55ms ${vars.transition.easeOut} both`,
  '@media': {
    '(min-width: 769px)': { fontSize: '17px' },
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      animation: `${fadeOnly} 180ms 40ms ease both`,
    },
  },
});

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: vars.size.target,
  marginTop: vars.space[2],
  padding: `0 ${vars.space[5]}`,
  border: '1px solid transparent',
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.accent,
  color: vars.color.accentText,
  fontFamily: vars.font.sans,
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  cursor: 'pointer',
  animation: `${heroEnter} 420ms 110ms ${vars.transition.easeOut} both`,
  transition: `transform 140ms ${vars.transition.easeOut}, background-color ${vars.transition.fast}`,
  ':active': { transform: 'scale(0.97)' },
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      ':hover': { backgroundColor: vars.color.accentHover },
    },
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      animation: `${fadeOnly} 180ms 80ms ease both`,
      transition: `background-color ${vars.transition.fast}`,
    },
  },
});

export const demoContainer = style({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  maxWidth: vars.size.wideWidth,
  minWidth: 0,
  margin: `${vars.space[7]} auto 0`,
  padding: `0 ${vars.space[4]}`,
  '@media': {
    '(min-width: 769px)': {
      margin: `${vars.space[8]} auto 0`,
      padding: `0 ${vars.space[5]}`,
    },
  },
});

export const demoFrame = style({
  minWidth: 0,
  padding: vars.space[2],
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  backgroundColor: vars.color.surface,
  boxShadow: vars.shadow.frame,
  animation: `${frameEnter} 520ms 165ms ${vars.transition.easeOut} both`,
  '@media': {
    '(min-width: 769px)': {
      padding: vars.space[3],
      borderRadius: vars.radius.xl,
    },
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      animation: `${fadeOnly} 200ms 100ms ease both`,
    },
  },
});
