import { style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

export const container = style({
  marginTop: vars.space[9],
  borderTop: `1px solid ${vars.color.border}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: `${vars.space[6]} ${vars.space[5]} ${vars.space[8]}`,
  fontFamily: vars.font.sans,
  fontSize: '13px',
  lineHeight: 1.6,
  color: vars.color.textFaint,
  textAlign: 'center',
});
