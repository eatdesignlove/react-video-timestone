import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: '#000',
  borderRadius: '8px',
  overflow: 'hidden',
});

export const fullScreen = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 9999,
  borderRadius: 0,
});
