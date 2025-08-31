import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  '@media': {
    '(min-width: 481px)': {
      padding: '20px 24px',
    },
    '(min-width: 769px)': {
      padding: '40px 48px',
    },
  },
});

export const logo = style({
  fontSize: '18px',
  color: 'white',
  fontFamily: 'Belanosima',
  fontWeight: '600',
});

export const packageLinks = style({
  display: 'flex',
  gap: '16px',
  color: 'white',
  '@media': {
    '(min-width: 481px)': {
      gap: '24px',
    },
  },
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: 'white',
  textDecoration: 'none',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontWeight: 'bold',
  '@media': {
    '(min-width: 481px)': {
      fontSize: '14px',
      gap: '8px',
    },
  },
});