import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
});

export const video = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 2,
});

export const fakePoster = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  zIndex: 1,
});
