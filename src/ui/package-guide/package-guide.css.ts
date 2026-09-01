import { style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: vars.size.contentWidth,
  width: '100%',
  minWidth: 0,
  margin: '0 auto',
  padding: `${vars.space[9]} ${vars.space[5]} 0`,
  '@media': {
    '(min-width: 769px)': { padding: `120px ${vars.space[5]} 0` },
  },
});

export const title = style({
  fontFamily: vars.font.sans,
  fontSize: '24px',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: 1.2,
  color: vars.color.text,
  marginBottom: vars.space[6],
  paddingBottom: vars.space[4],
  borderBottom: `1px solid ${vars.color.border}`,
  '@media': {
    '(min-width: 769px)': {
      fontSize: '28px',
      marginBottom: vars.space[7],
    },
  },
});

export const subTitle = style({
  fontFamily: vars.font.sans,
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  lineHeight: 1.3,
  color: vars.color.textMuted,
  marginBottom: vars.space[3],
  '@media': { '(min-width: 769px)': { fontSize: '16px' } },
});

export const contentWrapper = style({
  minWidth: 0,
  marginBottom: vars.space[6],
});

export const codeCard = style({
  minWidth: 0,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.bgSubtle,
  overflow: 'hidden',
});

export const codeHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space[3],
  minHeight: vars.size.target,
  padding: `0 ${vars.space[2]} 0 ${vars.space[4]}`,
  borderBottom: `1px solid ${vars.color.border}`,
});

export const codeLanguage = style({
  fontFamily: vars.font.mono,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: vars.color.textFaint,
});

export const copyButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  minWidth: '68px',
  minHeight: '34px',
  padding: `0 ${vars.space[3]}`,
  borderRadius: vars.radius.sm,
  border: '1px solid transparent',
  backgroundColor: 'transparent',
  color: vars.color.textMuted,
  fontFamily: vars.font.sans,
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  transition: `transform 140ms ${vars.transition.easeOut}, color ${vars.transition.fast}, background-color ${vars.transition.fast}, border-color ${vars.transition.fast}`,
  ':active': { transform: 'scale(0.97)' },
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      transform: 'none',
      transition: `color ${vars.transition.fast}, background-color ${vars.transition.fast}, border-color ${vars.transition.fast}`,
    },
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        color: vars.color.text,
        backgroundColor: vars.color.surfaceHover,
        borderColor: vars.color.border,
      },
    },
  },
});

export const codeScroller = style({
  width: '100%',
  minWidth: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
  overscrollBehaviorX: 'contain',
  scrollbarColor: `${vars.color.borderStrong} transparent`,
  ':focus-visible': {
    outline: `2px solid ${vars.color.accent}`,
    outlineOffset: '-2px',
  },
});

export const codeBlock = style({
  width: 'max-content',
  minWidth: '100%',
  margin: 0,
  padding: `${vars.space[3]} 0`,
  backgroundColor: 'transparent',
  color: '#D8DDE0',
  fontFamily: vars.font.mono,
  fontSize: '12.5px',
  fontWeight: 400,
  lineHeight: 1.65,
  tabSize: 2,
  '@media': { '(min-width: 769px)': { fontSize: '13px' } },
});

export const codeLine = style({ display: 'flex', minHeight: '1.65em' });

export const lineNumber = style({
  position: 'sticky',
  left: 0,
  zIndex: 1,
  width: '44px',
  flex: '0 0 44px',
  paddingRight: vars.space[3],
  backgroundColor: vars.color.bgSubtle,
  color: 'rgba(242, 244, 245, 0.28)',
  fontVariantNumeric: 'tabular-nums',
  textAlign: 'right',
  userSelect: 'none',
});

export const lineContent = style({
  display: 'block',
  paddingRight: vars.space[5],
  whiteSpace: 'pre',
});

export const tokenComment = style({ color: 'rgba(216, 221, 224, 0.42)' });
export const tokenKeyword = style({ color: '#A9BCEC' });
export const tokenString = style({ color: '#8FCBA2' });
export const tokenNumber = style({ color: '#DDB28B' });
export const tokenLiteral = style({ color: '#75C9C3' });
