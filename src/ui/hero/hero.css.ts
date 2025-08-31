import { style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: '120px',
  '@media': {
    '(min-width: 769px)': {
      paddingTop: '224px',
    },
  },
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: -1,
      width: '100%',
      height: '100%',
      maxHeight: '654px',
      backgroundImage: 'url(/bg_hero@2x.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
      backgroundRepeat: 'no-repeat',
      '@media': {
        '(min-width: 769px)': {
          maxHeight: '1054px',
        },
      },
    },
  },
});

export const content = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
});

export const title = style({
  fontSize: '32px',
  fontWeight: '600',
  fontFamily: 'Belanosima',
  textAlign: 'center',
  lineHeight: '1.2',
  background: 'linear-gradient(180deg, #fff 0%, #fff 55%, #49E78B 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
  '@media': {
    '(min-width: 481px)': {
      fontSize: '40px',
    },
    '(min-width: 769px)': {
      fontSize: '64px',
    },
  },
});

export const description = style({
  fontSize: '16px',
  fontWeight: '400',
  fontFamily: 'Inter',
  textAlign: 'center',
  lineHeight: '1.4',
  padding: '0 20px',
  '@media': {
    '(min-width: 481px)': {
      fontSize: '18px',
    },
    '(min-width: 769px)': {
      fontSize: '24px',
      padding: '0',
    },
  },
});

export const button = style({
  padding: '16px 24px',
  fontFamily: 'Inter',
  fontSize: '14px',
  borderRadius: '100px',
  backgroundColor: '#fff',
  color: '#0E1611',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 700,
  transition: 'background-color 0.3s ease',

  ':hover': {
    backgroundColor: '#e9e9e9',
  },
});

export const demoContainer = style({
  maxWidth: '1400px',
  width: '100%',
  margin: '60px auto 0',
  padding: '0 20px',
  '@media': {
    '(min-width: 769px)': {
      margin: '96px auto 0',
    },
  },
});