import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'absolute',
  bottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  alignItems: 'flex-start',
  padding: '0 24px',
  width: 'fit-content',
  textAlign: 'left',
  zIndex: 10,
});

export const controlButtons = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
});

export const playDirection = style({
  fontSize: '12px',
  fontWeight: 'bold',
  color: 'white',
});

export const controlButton = style({
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  background: 'rgba(255, 255, 255, 0.7)',
  selectors: {
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.9)',
    },
  },
});

export const progressPlaceholder = style({
  position: 'relative',
  width: '100%',
  height: '4px',
  backgroundColor: 'white',
});

export const progressBar = style({
  width: '100%',
  height: '4px',
  backgroundColor: '#00ff00',
  transform: 'scaleX(0.5)',
  transformOrigin: 'left',
});

export const marker = style({
  position: 'absolute',
  top: '50%',
  left: '0',
  transform: 'translate(-50%, -50%)',
  background: 'red',
  width: '16px',
  height: '16px',
  borderRadius: '100%',
  border: 'none',
  cursor: 'pointer',
});

export const markerLabel = style({
  display: 'block',
  position: 'absolute',
  top: '100%',
  fontSize: '12px',
  padding: '8px',
  border: 'none',
  borderRadius: '4px',
  background: 'rgba(255, 255, 255, 0.5)',
  width: 'max-content',
  transform: 'translate(-50%, -50%)',
  opacity: 0,
});

export const currentTime = style({
  position: 'absolute',
  top: '50%',
  right: '0',
  transform: 'translate(-50%, -50%)',
  width: '16px',
  height: '16px',
  // border: '4px solid #fff',
  borderRadius: '100%',
  background: 'red',
  cursor: 'pointer',
  zIndex: 10,
});
