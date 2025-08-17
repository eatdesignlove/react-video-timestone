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
  padding: '40px 48px',
});

export const logo = style({
  fontSize: '18px',
  color: 'white',
  fontFamily: 'Belanosima',
  fontWeight: '600',
});

export const packageLinks = style({
  display: 'flex',
  gap: '24px',
  color: 'white',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'white',
  textDecoration: 'none',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontWeight: 'bold',
});
