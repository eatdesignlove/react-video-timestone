import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '1000px',
  width: '100%',
  margin: '0 auto',
  paddingTop: '80px',
  padding: '80px 20px 0',
  '@media': {
    '(min-width: 769px)': {
      paddingTop: '120px',
      padding: '120px 20px 0',
    },
  },
});

export const title = style({
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '40px',
  fontFamily: 'Belanosima',
  '@media': {
    '(min-width: 769px)': {
      fontSize: '28px',
      marginBottom: '70px',
    },
    '(min-width: 1024px)': {
      fontSize: '36px',
    },
  },
});

export const subTitle = style({
  fontSize: '20px',
  fontWeight: 400,
  marginBottom: '20px',
  fontFamily: 'Belanosima',
  '@media': {
    '(min-width: 769px)': {
      fontSize: '24px',
      marginBottom: '33px',
    },
  },
});

export const contentWrapper = style({
  marginBottom: '40px',
});

export const codeBlock = style({
  fontFamily: 'monospace !important',
});