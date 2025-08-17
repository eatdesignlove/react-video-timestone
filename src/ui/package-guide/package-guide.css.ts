import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '1000px',
  width: '100%',
  margin: '0 auto',
  paddingTop: '120px',
});

export const title = style({
  fontSize: '36px',
  fontWeight: 600,
  marginBottom: '70px',
  fontFamily: 'Belanosima',
});

export const subTitle = style({
  fontSize: '24px',
  fontWeight: 400,
  marginBottom: '33px',
  fontFamily: 'Belanosima',
});

export const contentWrapper = style({
  marginBottom: '40px',
});
