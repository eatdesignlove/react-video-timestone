import { style } from '@vanilla-extract/css';

export const container = style({
  paddingTop: '80px',
  maxWidth: '1000px',
  margin: '0 auto',
  padding: '80px 20px 0',
  '@media': {
    '(min-width: 769px)': {
      paddingTop: '140px',
      padding: '140px 20px 0',
    },
  },
});

export const sectionHeader = style({
  marginBottom: '45px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
});

export const sectionContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  '@media': {
    '(min-width: 769px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
  },
});

export const title = style({
  fontSize: '24px',
  fontWeight: 600,
  fontFamily: 'Belanosima',
  textAlign: 'center',
  lineHeight: '1.2',
  '@media': {
    '(min-width: 769px)': {
      fontSize: '28px',
    },
    '(min-width: 1024px)': {
      fontSize: '36px',
    },
  },
});

export const highlight = style({
  background: 'linear-gradient(180deg, #fff 0%, #49E78B 50%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
});

export const description = style({
  fontSize: '16px',
  fontWeight: 400,
  color: 'rgba(255, 255, 255, 0.8)',
  fontFamily: 'Inter',
  textAlign: 'center',
  lineHeight: '1.2',
  maxWidth: '670px',
  '@media': {
    '(min-width: 769px)': {
      fontSize: '18px',
    },
  },
});

export const featureItem = style({
  background: '#151414',
  border: '1px solid #504C4C',
  borderRadius: '16px',
  padding: '24px',
  '@media': {
    '(min-width: 769px)': {
      padding: '36px',
    },
  },
  selectors: {
    '&.item-1': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      '@media': {
        '(min-width: 769px)': {
          flexDirection: 'row',
          gap: '33px',
        },
      },
    },
    '&.item-2': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      '@media': {
        '(min-width: 769px)': {
          flexDirection: 'row',
        },
      },
    },
    '&.item-3': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '24px 0 0',
      '@media': {
        '(min-width: 769px)': {
          padding: '36px 0 0',
        },
      },
    },
    '&.item-4': {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      '@media': {
        '(min-width: 769px)': {
          flexDirection: 'row',
        },
      },
    },
  },
});

export const featureContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  selectors: {
    '.item-3 &': {
      padding: '0 24px 24px',
      '@media': {
        '(min-width: 769px)': {
          padding: '0 36px 36px',
        },
      },
    },
  },
});

export const featureTitle = style({
  fontSize: '21px',
  fontFamily: 'Belanosima',
  lineHeight: '1.2',
});

export const featureDescription = style({
  fontSize: '16px',
  fontWeight: 400,
  fontFamily: 'Inter',
  lineHeight: '1.4',
  color: 'rgba(255, 255, 255, 0.8)',
});