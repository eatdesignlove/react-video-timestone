import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});

globalStyle('html', {
  backgroundColor: vars.color.bg,
  WebkitTextSizeAdjust: '100%',
});

globalStyle('body', {
  margin: 0,
  padding: 0,
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: vars.font.sans,
  fontSize: '16px',
  lineHeight: 1.5,
  fontSynthesis: 'none',
});

globalStyle('code, kbd, pre, samp', {
  fontFamily: vars.font.mono,
});

globalStyle('::selection', {
  backgroundColor: vars.color.accentSoft,
  color: vars.color.text,
});

/* One consistent keyboard focus ring for the whole demo site. */
globalStyle('a:focus-visible, button:focus-visible, [tabindex]:focus-visible', {
  outline: `2px solid ${vars.color.accent}`,
  outlineOffset: '2px',
  borderRadius: vars.radius.sm,
});

globalStyle('svg', {
  display: 'block',
});

globalStyle('html', {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      scrollBehavior: 'auto',
    },
  },
});

export const container = style({
  minHeight: '100vh',
  backgroundColor: vars.color.bg,
  position: 'relative',
  overflowX: 'hidden',
});
