import { style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: '224px',
  backgroundImage: 'url(/bg_hero@2x.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100svh',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
});

export const title = style({
  fontSize: '64px',
  fontWeight: '600',
  fontFamily: 'Belanosima',
  textAlign: 'center',
  lineHeight: '1.2',
});

export const description = style({
  fontSize: '24px',
  fontWeight: '400',
  fontFamily: 'Inter',
  textAlign: 'center',
  lineHeight: '1.4',
});

export const button = style({
  padding: '16px 24px',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontWeight: '600',
  borderRadius: '100px',
  backgroundColor: '#fff',
  color: '#0E1611',
  border: 'none',
});
