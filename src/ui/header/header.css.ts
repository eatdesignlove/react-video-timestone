import { style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

export const container = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  width: '100%',
  borderBottom: `1px solid ${vars.color.border}`,
  backgroundColor: 'rgba(10, 11, 12, 0.72)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
});

export const inner = style({
  maxWidth: vars.size.wideWidth,
  margin: '0 auto',
  minHeight: vars.size.headerHeight,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: vars.space[4],
  padding: `0 ${vars.space[4]}`,
  '@media': {
    '(min-width: 769px)': {
      padding: `0 ${vars.space[5]}`,
    },
  },
});

export const logo = style({
  fontFamily: vars.font.sans,
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  color: vars.color.text,
  whiteSpace: 'nowrap',
});

export const packageLinks = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[1],
});

export const link = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[2],
  minHeight: '36px',
  padding: `0 ${vars.space[3]}`,
  borderRadius: vars.radius.md,
  border: '1px solid transparent',
  color: vars.color.textMuted,
  textDecoration: 'none',
  fontFamily: vars.font.sans,
  fontSize: '13px',
  fontWeight: 500,
  transition: `color ${vars.transition.fast}, background-color ${vars.transition.fast}, border-color ${vars.transition.fast}`,

  ':hover': {
    color: vars.color.text,
    backgroundColor: vars.color.surface,
    borderColor: vars.color.border,
  },
});
