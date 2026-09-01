import { useId } from 'react';
import cx from 'classnames';
import * as styles from './features.css';

interface IllustrationProps {
  className?: string;
}

function svgId(id: string, suffix: string) {
  return `${id.replace(/:/g, '')}-${suffix}`;
}

export function PreloadIllustration({ className }: IllustrationProps) {
  const id = useId();
  const bottomGradientId = svgId(id, 'preload-bottom-gradient');
  const middleGradientId = svgId(id, 'preload-middle-gradient');
  const topGradientId = svgId(id, 'preload-top-gradient');
  const playFilterId = svgId(id, 'preload-play-filter');

  return (
    <svg
      className={className}
      width="113"
      height="221"
      viewBox="0 0 113 221"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g
        className={cx(styles.preloadLayerBottom, styles.motionGroup)}
        data-preload-step="bottom"
      >
        <path
          d="M113 210.604H112.941C111.598 216.293 86.8429 220.827 56.5 220.827C26.1571 220.827 1.40199 216.293 0.0585938 210.604H0V178.962H113V210.604Z"
          fill={`url(#${bottomGradientId})`}
        />
        <ellipse cx="56.5" cy="177.921" rx="56.5" ry="10.3704" fill="#333335" />
      </g>
      <g
        className={cx(styles.preloadLayerMiddle, styles.motionGroup)}
        data-preload-step="middle"
      >
        <path
          d="M113 173.328H112.942C111.6 179.017 86.8435 183.551 56.5 183.551C26.1565 183.551 1.40013 179.017 0.0576172 173.328H0V141.687H113V173.328Z"
          fill={`url(#${middleGradientId})`}
        />
        <ellipse cx="56.5" cy="140.646" rx="56.5" ry="10.3704" fill="#333335" />
      </g>
      <g
        className={cx(styles.preloadLayerTop, styles.motionGroup)}
        data-preload-step="top"
      >
        <path
          d="M113 136.053H112.942C111.6 141.742 86.8434 146.276 56.5 146.276C26.1566 146.276 1.40026 141.742 0.0576172 136.053H0V104.411H113V136.053Z"
          fill={`url(#${topGradientId})`}
        />
        <ellipse cx="56.5" cy="103.37" rx="56.5" ry="10.3704" fill="#49E78B" />
      </g>
      <g
        className={cx(styles.preloadPlayer, styles.motionGroup)}
        data-preload-step="player"
      >
        <rect
          x="2.5"
          y="16.5"
          width="108"
          height="63"
          rx="3.5"
          fill="#333335"
          stroke="#49E78B"
        />
        <g filter={`url(#${playFilterId})`}>
          <path
            d="M55.0815 40.981C53.7505 40.1253 52 41.081 52 42.6633V53.3367C52 54.919 53.7505 55.8747 55.0815 55.019L63.383 49.6824C64.6076 48.8951 64.6076 47.1049 63.383 46.3176L55.0815 40.981Z"
            fill="#49E78B"
          />
          <path
            d="M52.5 42.6631C52.5002 41.4765 53.8133 40.7597 54.8115 41.4014L63.1123 46.7383C64.0308 47.3287 64.0308 48.6713 63.1123 49.2617L54.8115 54.5986C53.8133 55.2403 52.5002 54.5235 52.5 53.3369V42.6631Z"
            stroke="#49E78B"
          />
        </g>
      </g>
      <line
        className={cx(styles.preloadFlow, styles.motionGroup)}
        data-preload-step="connector"
        x1="56.5"
        y1="106"
        x2="56.5"
        y2="80"
        stroke="#49E78B"
      />
      <defs>
        <filter
          id={playFilterId}
          x="12"
          y="0.660034"
          width="92.3015"
          height="94.6799"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.286275 0 0 0 0 0.905882 0 0 0 0 0.545098 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id={bottomGradientId}
          x1="56.5"
          y1="178.962"
          x2="56.5"
          y2="220.827"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#151414" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id={middleGradientId}
          x1="56.5"
          y1="141.687"
          x2="56.5"
          y2="183.551"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#151414" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id={topGradientId}
          x1="56.5"
          y1="104.411"
          x2="56.5"
          y2="146.275"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3CD57C" />
          <stop offset="1" stopColor="#0B602F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ReverseIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      width="174"
      height="174"
      viewBox="0 0 174 174"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="86.5126"
        cy="86.5126"
        r="85.5126"
        fill="#151414"
        stroke="#FF7049"
        strokeWidth="2"
      />
      <g className={cx(styles.reverseRays, styles.motionGroup)}>
        <line
          x1="87.0143"
          y1="0.0050049"
          x2="87.0143"
          y2="173.027"
          stroke="#FF7049"
        />
        <line
          x1="109.388"
          y1="3.08327"
          x2="64.6065"
          y2="170.209"
          stroke="#FF7049"
        />
        <line
          x1="130.202"
          y1="11.847"
          x2="43.6916"
          y2="161.688"
          stroke="#FF7049"
        />
        <line
          x1="148.039"
          y1="25.6995"
          x2="25.6945"
          y2="148.044"
          stroke="#FF7049"
        />
        <line
          x1="161.683"
          y1="43.6967"
          x2="11.8421"
          y2="130.207"
          stroke="#FF7049"
        />
        <line
          x1="170.204"
          y1="64.6116"
          x2="3.07814"
          y2="109.393"
          stroke="#FF7049"
        />
        <line
          x1="173.022"
          y1="87.0193"
          x2="0.0000609914"
          y2="87.0193"
          stroke="#FF7049"
        />
        <line
          x1="169.943"
          y1="109.393"
          x2="2.81749"
          y2="64.6116"
          stroke="#FF7049"
        />
        <line
          x1="161.179"
          y1="130.207"
          x2="11.3383"
          y2="43.6964"
          stroke="#FF7049"
        />
        <line
          x1="147.327"
          y1="148.044"
          x2="24.9823"
          y2="25.6995"
          stroke="#FF7049"
        />
        <line
          x1="129.33"
          y1="161.688"
          x2="42.8191"
          y2="11.8469"
          stroke="#FF7049"
        />
        <line
          x1="108.415"
          y1="170.209"
          x2="63.6337"
          y2="3.08301"
          stroke="#FF7049"
        />
        <line
          x1="108.415"
          y1="170.209"
          x2="63.6337"
          y2="3.08301"
          stroke="#FF7049"
        />
      </g>
      <circle cx="86.5126" cy="86.5126" r="75.0729" fill="#151414" />
      <path
        className={cx(styles.reverseHand, styles.motionGroup)}
        d="M86.0243 86.646L70.0422 27"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MarkerIllustration({ className }: IllustrationProps) {
  const id = useId();
  const markerXs = [52, 112, 172, 232];
  const markerGradientIds = markerXs.map(x =>
    svgId(id, `marker-gradient-${x}`)
  );
  const markerPulseClasses = [
    styles.markerPulseOne,
    styles.markerPulseTwo,
    styles.markerPulseThree,
    styles.markerPulseFour,
  ];

  return (
    <svg
      className={className}
      width="479"
      height="32"
      viewBox="0 0 479 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        x1="0.0000000437114"
        y1="15.5"
        x2="479"
        y2="15.5"
        stroke="#333335"
      />
      {markerXs.map(x => (
        <circle key={`base-${x}`} cx={x} cy="16" r="16" fill="#333335" />
      ))}
      {markerXs.map((x, index) => (
        <circle
          key={`highlight-${x}`}
          className={markerPulseClasses[index]}
          data-marker-highlight={x}
          cx={x}
          cy="16"
          r="15"
          fill={`url(#${markerGradientIds[index]})`}
          stroke="#FFD0BC"
          strokeWidth="2"
        />
      ))}
      <defs>
        {markerXs.map((x, index) => (
          <radialGradient
            key={x}
            id={markerGradientIds[index]}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform={`translate(${x} 16) rotate(90) scale(16)`}
          >
            <stop stopColor="#FF7049" />
            <stop offset="1" stopColor="#FF643A" />
          </radialGradient>
        ))}
      </defs>
    </svg>
  );
}

export function TimelineIllustration({ className }: IllustrationProps) {
  const id = useId();
  const backFilterId = svgId(id, 'timeline-back-filter');
  const middleFilterId = svgId(id, 'timeline-middle-filter');
  const frontFilterId = svgId(id, 'timeline-front-filter');

  const glowFilter = (
    filterId: string,
    x: string,
    y: string,
    width: string,
    height: string
  ) => (
    <filter
      id={filterId}
      x={x}
      y={y}
      width={width}
      height={height}
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        result="hardAlpha"
      />
      <feOffset />
      <feGaussianBlur stdDeviation="20" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix
        type="matrix"
        values="0 0 0 0 0.286275 0 0 0 0 0.905882 0 0 0 0 0.545098 0 0 0 1 0"
      />
      <feBlend
        mode="normal"
        in2="BackgroundImageFix"
        result="effect1_dropShadow"
      />
      <feBlend
        mode="normal"
        in="SourceGraphic"
        in2="effect1_dropShadow"
        result="shape"
      />
    </filter>
  );

  return (
    <svg
      className={className}
      width="188"
      height="112"
      viewBox="0 0 188 112"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <g className={styles.timelineCardBack} data-timeline-card="back">
        <rect
          x="0.5"
          y="16.6592"
          width="92.3973"
          height="78.6816"
          rx="3.5"
          fill="#333335"
          stroke="#3C453E"
        />
        <g filter={`url(#${backFilterId})`}>
          <path
            d="M46.8592 50.2043C44.1963 48.5097 40.7117 50.4226 40.7117 53.5789V58.8171C40.7117 61.9734 44.1963 63.8863 46.8592 62.1917L50.9749 59.5727C53.4449 58.0008 53.4449 54.3952 50.9749 52.8234L46.8592 50.2043Z"
            fill="#49E78B"
          />
        </g>
        <rect
          className={styles.timelineFillBack}
          data-timeline-fill="back"
          x="0.5"
          y="16.6592"
          width="92.3973"
          height="78.6816"
          rx="3.5"
        />
      </g>
      <g className={styles.timelineCardMiddle} data-timeline-card="middle">
        <rect
          x="27.9315"
          y="9.41553"
          width="109.379"
          height="93.1692"
          rx="3.5"
          fill="#333335"
          stroke="#3C453E"
        />
        <g filter={`url(#${middleFilterId})`}>
          <path
            d="M81.6927 48.4394C79.0298 46.7448 75.5452 48.6577 75.5452 51.814V60.6543C75.5452 63.8107 79.0298 65.7235 81.6927 64.0289L88.6386 59.6088C91.1086 58.037 91.1086 54.4313 88.6386 52.8595L81.6927 48.4394Z"
            fill="#49E78B"
          />
        </g>
        <rect
          className={styles.timelineFillMiddle}
          data-timeline-fill="middle"
          x="27.9315"
          y="9.41553"
          width="109.379"
          height="93.1692"
          rx="3.5"
        />
      </g>
      <g className={styles.timelineCardFront} data-timeline-card="front">
        <rect
          x="57.1691"
          y="1"
          width="129.279"
          height="110"
          rx="3"
          fill="#333335"
          stroke="#49E78B"
          strokeWidth="2"
        />
        <g filter={`url(#${frontFilterId})`}>
          <path
            d="M116.467 44.3111C115.135 43.4638 113.393 44.4203 113.393 45.9984V66.5588C113.393 68.1369 115.135 69.0934 116.467 68.2461L132.621 57.9659C133.856 57.18 133.856 55.3772 132.621 54.5913L116.467 44.3111Z"
            fill="#49E78B"
          />
          <path
            d="M114.393 45.9987C114.393 45.2096 115.265 44.7313 115.93 45.1549L132.085 55.4352C132.702 55.8282 132.702 56.7298 132.085 57.1227L115.93 67.402C115.265 67.8255 114.394 67.348 114.393 66.5592V45.9987Z"
            stroke="#49E78B"
            strokeWidth="2"
          />
        </g>
        <rect
          className={styles.timelineFillFront}
          data-timeline-fill="front"
          x="57.1691"
          y="1"
          width="129.279"
          height="110"
          rx="3"
        />
      </g>
      <defs>
        {glowFilter(backFilterId, '0.71167', '9.57239', '92.1157', '93.2512')}
        {glowFilter(middleFilterId, '35.5452', '7.8075', '94.9459', '96.8533')}
        {glowFilter(frontFilterId, '73.3932', '3.99524', '100.155', '104.567')}
      </defs>
    </svg>
  );
}
