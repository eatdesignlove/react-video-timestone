import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

const reveal = keyframes({
  from: { opacity: 0, transform: 'translateY(12px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

/* Each 16s cycle animates briefly, then preserves the canonical idle frame. */
const preloadBottomIdle = keyframes({
  '0%': { opacity: 0, transform: 'translateY(5px)' },
  '2%, 100%': { opacity: 1, transform: 'translateY(0)' },
});
const preloadMiddleIdle = keyframes({
  '0%, 1.75%': { opacity: 0, transform: 'translateY(5px)' },
  '3.75%, 100%': { opacity: 1, transform: 'translateY(0)' },
});
const preloadTopIdle = keyframes({
  '0%, 3.5%': { opacity: 0, transform: 'translateY(5px)' },
  '5.5%, 100%': { opacity: 1, transform: 'translateY(0)' },
});
const preloadConnectorIdle = keyframes({
  '0%, 5.25%': { opacity: 0, transform: 'translateY(4px)' },
  '7.25%, 100%': { opacity: 1, transform: 'translateY(0)' },
});
const preloadPlayerIdle = keyframes({
  '0%, 7%': { opacity: 0, transform: 'translateY(5px)' },
  '9%, 100%': { opacity: 1, transform: 'translateY(0)' },
});
const preloadRevealHover = keyframes({
  from: { opacity: 0, transform: 'translateY(5px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const reverseHandIdle = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '10%': { transform: 'rotate(-360deg)' },
  '10.01%, 100%': { transform: 'rotate(0deg)' },
});
const reverseHandHover = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(-360deg)' },
});
const reverseRaysIdle = keyframes({
  '0%, 5%, 100%': { opacity: 1 },
  '2.5%': { opacity: 0.88 },
});

const markerOneIdle = keyframes({
  '0%, 1%': { opacity: 0 },
  '2%, 4%': { opacity: 1 },
  '6%, 100%': { opacity: 0 },
});
const markerTwoIdle = keyframes({
  '0%, 5%': { opacity: 0 },
  '6%, 8%': { opacity: 1 },
  '10%, 100%': { opacity: 0 },
});
const markerThreeIdle = keyframes({
  '0%, 9%': { opacity: 0 },
  '10%, 12%': { opacity: 1 },
  '14%, 100%': { opacity: 0 },
});
const markerFourIdle = keyframes({
  '0%, 13%': { opacity: 0 },
  '14%, 100%': { opacity: 1 },
});
const markerPulseHover = keyframes({
  '0%': { opacity: 0 },
  '30%, 65%': { opacity: 1 },
  '100%': { opacity: 0 },
});
const markerFinalHover = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const timelineBackIdle = keyframes({
  '0%': { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  '1%': { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
  '3%': { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  '4.5%, 100%': { opacity: 0, clipPath: 'inset(0 0 0 0)' },
});
const timelineMiddleIdle = keyframes({
  '0%, 4.5%': { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  '5.5%': { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
  '7.5%': { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  '9%, 100%': { opacity: 0, clipPath: 'inset(0 0 0 0)' },
});
const timelineFrontIdle = keyframes({
  '0%, 9%': { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  '10%': { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
  '12%': { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  '13.5%, 100%': { opacity: 0, clipPath: 'inset(0 0 0 0)' },
});
const timelineFillHover = keyframes({
  '0%': { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  '15%': { opacity: 1, clipPath: 'inset(0 100% 0 0)' },
  '75%': { opacity: 1, clipPath: 'inset(0 0 0 0)' },
  '100%': { opacity: 0, clipPath: 'inset(0 0 0 0)' },
});

export const container = style({
  maxWidth: vars.size.contentWidth,
  margin: '0 auto',
  padding: `${vars.space[9]} ${vars.space[5]} 0`,
  '@media': {
    '(min-width: 769px)': { padding: `140px ${vars.space[5]} 0` },
  },
});

export const sectionHeader = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.space[4],
  marginBottom: vars.space[7],
  '@media': {
    '(min-width: 769px)': { marginBottom: vars.space[8] },
  },
});

export const sectionContent = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: vars.space[3],
  '@media': {
    '(min-width: 769px)': {
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gap: vars.space[4],
    },
  },
});

export const title = style({
  fontFamily: vars.font.sans,
  fontSize: '26px',
  fontWeight: 600,
  letterSpacing: '-0.025em',
  lineHeight: 1.16,
  color: vars.color.text,
  textAlign: 'center',
  textWrap: 'balance',
  '@media': {
    '(min-width: 769px)': { fontSize: '32px' },
    '(min-width: 1024px)': { fontSize: '38px' },
  },
});

export const highlight = style({ color: vars.color.accent });

export const description = style({
  fontFamily: vars.font.sans,
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: 1.6,
  color: vars.color.textMuted,
  textAlign: 'center',
  maxWidth: '620px',
  textWrap: 'pretty',
  '@media': { '(min-width: 769px)': { fontSize: '17px' } },
});

export const featureItem = style({
  minWidth: 0,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: vars.space[5],
  opacity: 0,
  transform: 'translateY(12px)',
  transition: `border-color ${vars.transition.base}, background-color ${vars.transition.base}, transform 220ms ${vars.transition.easeOut}`,
  '@media': {
    '(min-width: 769px)': { padding: vars.space[6] },
    '(hover: hover) and (pointer: fine)': {
      ':hover': {
        backgroundColor: vars.color.surfaceHover,
        borderColor: vars.color.borderStrong,
      },
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 1,
      transform: 'none',
      transition: `border-color ${vars.transition.base}, background-color ${vars.transition.base}, opacity 180ms ease`,
    },
  },
  selectors: {
    [`${sectionContent}[data-revealed='true'] &`]: {
      animation: `${reveal} 420ms ${vars.transition.easeOut} forwards`,
    },
    [`${sectionContent}[data-revealed='true'] &:nth-child(2)`]: {
      animationDelay: '55ms',
    },
    [`${sectionContent}[data-revealed='true'] &:nth-child(3)`]: {
      animationDelay: '110ms',
    },
    [`${sectionContent}[data-revealed='true'] &:nth-child(4)`]: {
      animationDelay: '165ms',
    },
    '&.item-1, &.item-2, &.item-4': {
      display: 'flex',
      flexDirection: 'column',
      gap: vars.space[5],
      '@media': {
        '(min-width: 769px)': {
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
      },
    },
    '&.item-3': {
      display: 'flex',
      flexDirection: 'column',
      gap: vars.space[5],
      padding: `${vars.space[5]} 0 0`,
      '@media': { '(min-width: 769px)': { padding: `${vars.space[6]} 0 0` } },
    },
  },
});

export const featureContent = style({
  display: 'flex',
  flex: '1 1 0',
  minWidth: 0,
  flexDirection: 'column',
  gap: vars.space[3],
  selectors: {
    '.item-3 &': {
      padding: `0 ${vars.space[5]} ${vars.space[5]}`,
      '@media': {
        '(min-width: 769px)': {
          padding: `0 ${vars.space[6]} ${vars.space[6]}`,
        },
      },
    },
  },
});

export const illustration = style({
  display: 'flex',
  flex: '0 0 auto',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
  selectors: {
    '.item-3 &': { width: '100%', overflow: 'hidden' },
  },
});

export const illustrationSvg = style({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  overflow: 'visible',
});

export const markerSvg = style({
  display: 'block',
  width: '100%',
  maxWidth: '100%',
  height: 'auto',
  overflow: 'visible',
});

export const featureTitle = style({
  fontFamily: vars.font.sans,
  fontSize: '18px',
  fontWeight: 600,
  letterSpacing: '-0.015em',
  lineHeight: 1.3,
  color: vars.color.text,
});

export const featureDescription = style({
  fontFamily: vars.font.sans,
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: 1.6,
  color: vars.color.textMuted,
  textWrap: 'pretty',
});

const idleCycle = '16s cubic-bezier(0.22, 1, 0.36, 1) infinite';

export const preloadFlow = style({
  animation: `${preloadConnectorIdle} ${idleCycle}`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-1:hover &': {
          animation: `${preloadRevealHover} 280ms 840ms ease-out 1 both`,
        },
      },
    },
  },
});

export const preloadLayerBottom = style({
  animation: `${preloadBottomIdle} ${idleCycle}`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-1:hover &': {
          animation: `${preloadRevealHover} 280ms ease-out 1 both`,
        },
      },
    },
  },
});

export const preloadLayerMiddle = style({
  animation: `${preloadMiddleIdle} ${idleCycle}`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-1:hover &': {
          animation: `${preloadRevealHover} 280ms 280ms ease-out 1 both`,
        },
      },
    },
  },
});

export const preloadLayerTop = style({
  animation: `${preloadTopIdle} ${idleCycle}`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-1:hover &': {
          animation: `${preloadRevealHover} 280ms 560ms ease-out 1 both`,
        },
      },
    },
  },
});

export const preloadPlayer = style({
  animation: `${preloadPlayerIdle} ${idleCycle}`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-1:hover &': {
          animation: `${preloadRevealHover} 280ms 1120ms ease-out 1 both`,
        },
      },
    },
  },
});

export const reverseRays = style({
  animation: `${reverseRaysIdle} ${idleCycle} -4s`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-2:hover &': { animation: 'none' },
      },
    },
  },
});

export const reverseHand = style({
  animation: `${reverseHandIdle} ${idleCycle} -4s`,
  transformBox: 'view-box',
  transformOrigin: '86.5126px 86.5126px',
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-2:hover &': {
          animation: `${reverseHandHover} 900ms cubic-bezier(0.4, 0, 0.2, 1) 1 both`,
        },
      },
    },
  },
});

const markerPulseBase = {
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 0,
    },
  },
} as const;

export const markerPulseOne = style({
  ...markerPulseBase,
  animation: `${markerOneIdle} ${idleCycle} -8s`,
  '@media': {
    ...markerPulseBase['@media'],
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-3:hover &': {
          animation: `${markerPulseHover} 320ms ease-in-out 1 both`,
        },
      },
    },
  },
});

export const markerPulseTwo = style({
  ...markerPulseBase,
  animation: `${markerTwoIdle} ${idleCycle} -8s`,
  '@media': {
    ...markerPulseBase['@media'],
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-3:hover &': {
          animation: `${markerPulseHover} 320ms 300ms ease-in-out 1 both`,
        },
      },
    },
  },
});

export const markerPulseThree = style({
  ...markerPulseBase,
  animation: `${markerThreeIdle} ${idleCycle} -8s`,
  '@media': {
    ...markerPulseBase['@media'],
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-3:hover &': {
          animation: `${markerPulseHover} 320ms 600ms ease-in-out 1 both`,
        },
      },
    },
  },
});

export const markerPulseFour = style({
  animation: `${markerFourIdle} ${idleCycle} -8s`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-3:hover &': {
          animation: `${markerFinalHover} 280ms 900ms ease-out 1 both`,
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 1,
    },
  },
});

export const timelineCardBack = style({ opacity: 1 });
export const timelineCardMiddle = style({ opacity: 1 });
export const timelineCardFront = style({ opacity: 1 });

const timelineFillPaint = {
  fill: 'rgba(73, 231, 139, 0.14)',
  stroke: '#49E78B',
  strokeWidth: 1,
  pointerEvents: 'none',
} as const;

export const timelineFillBack = style({
  ...timelineFillPaint,
  animation: `${timelineBackIdle} ${idleCycle} -12s`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-4:hover &': {
          animation: `${timelineFillHover} 480ms ease-out 1 both`,
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 0,
      clipPath: 'none',
    },
  },
});

export const timelineFillMiddle = style({
  ...timelineFillPaint,
  animation: `${timelineMiddleIdle} ${idleCycle} -12s`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-4:hover &': {
          animation: `${timelineFillHover} 480ms 500ms ease-out 1 both`,
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 0,
      clipPath: 'none',
    },
  },
});

export const timelineFillFront = style({
  ...timelineFillPaint,
  animation: `${timelineFrontIdle} ${idleCycle} -12s`,
  '@media': {
    '(hover: hover) and (pointer: fine)': {
      selectors: {
        '.item-4:hover &': {
          animation: `${timelineFillHover} 480ms 1000ms ease-out 1 both`,
        },
      },
    },
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 0,
      clipPath: 'none',
    },
  },
});

export const motionGroup = style({
  '@media': {
    '(prefers-reduced-motion: reduce)': {
      animation: 'none !important',
      opacity: 1,
      transform: 'none',
      strokeDashoffset: 0,
    },
  },
});
