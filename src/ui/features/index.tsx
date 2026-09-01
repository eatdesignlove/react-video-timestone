import { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import {
  MarkerIllustration,
  PreloadIllustration,
  ReverseIllustration,
  TimelineIllustration,
} from './illustrations';
import * as styles from './features.css';

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0]?.isIntersecting) return;
        setRevealed(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

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
      <div
        ref={gridRef}
        className={styles.sectionContent}
        data-revealed={revealed}
      >
        <article className={cx(styles.featureItem, 'item-1')}>
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
          <div className={styles.illustration}>
            <PreloadIllustration className={styles.illustrationSvg} />
          </div>
        </article>
        <article className={cx(styles.featureItem, 'item-2')}>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>
              Reverse Playback <br /> Handling
            </h2>
            <p className={styles.featureDescription}>
              Smooth reverse playback is implemented via requestAnimationFrame,
              overcoming the limitations of HTML5 video’s built-in support.
            </p>
          </div>
          <div className={styles.illustration}>
            <ReverseIllustration className={styles.illustrationSvg} />
          </div>
        </article>
        <article className={cx(styles.featureItem, 'item-3')}>
          <div className={styles.illustration}>
            <MarkerIllustration className={styles.markerSvg} />
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
        </article>
        <article className={cx(styles.featureItem, 'item-4')}>
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
          <div className={styles.illustration}>
            <TimelineIllustration className={styles.illustrationSvg} />
          </div>
        </article>
      </div>
    </section>
  );
}
