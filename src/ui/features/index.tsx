import cx from 'classnames';

import FeatureIcon1 from '../../../public/feature-1.svg?react';
import FeatureIcon2 from '../../../public/feature-2.svg?react';
import FeatureIcon3 from '../../../public/feature-3.svg?react';
import FeatureIcon4 from '../../../public/feature-4.svg?react';

import * as styles from './features.css';

export default function Features() {
  return (
    <section className={styles.container}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.title}>
          Video Control <br /> for{' '}
          <span className={styles.highlight}>Storytelling Website</span>
        </h1>
        <p className={styles.description}>
          React Video Timestone is a React component built for video-based
          storytelling. It gives you the power to seamlessly control playback,
          reverse, and skip.
        </p>
      </div>
      <div className={styles.sectionContent}>
        <div className={cx(styles.featureItem, 'item-1')}>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>
              Preload-Based,
              <br />
              Buffer-Free Playback
            </h2>
            <p className={styles.featureDescription}>
              Ensures a seamless experience at critical moments by preloading
              all videos using Blob URLs, eliminating buffering interruptions.
            </p>
          </div>
          <div>
            <FeatureIcon1 />
          </div>
        </div>
        <div className={cx(styles.featureItem, 'item-2')}>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>
              Reverse Playback <br /> Handling
            </h2>
            <p className={styles.featureDescription}>
              Smooth reverse playback is implemented via requestAnimationFrame,
              overcoming the limitations of HTML5 video’s built-in support.
            </p>
          </div>
          <div>
            <FeatureIcon2 />
          </div>
        </div>
        <div className={cx(styles.featureItem, 'item-3')}>
          <div>
            <FeatureIcon3 />
          </div>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>
              Marker-Based
              <br />
              Event Handling
            </h2>
            <p className={styles.featureDescription}>
              Achieves precise UI synchronization at exact moments with a
              declarative API, without the need for complex timing logic.
            </p>
          </div>
        </div>
        <div className={cx(styles.featureItem, 'item-4')}>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>
              Multi-Video
              <br />
              Timeline
            </h2>
            <p className={styles.featureDescription}>
              Manages multiple videos as a single continuous story, enabling
              seamless, interruption-free transitions.
            </p>
          </div>
          <div>
            <FeatureIcon4 />
          </div>
        </div>
      </div>
    </section>
  );
}
