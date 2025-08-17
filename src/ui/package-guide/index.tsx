import { CopyBlock } from 'react-code-blocks';
import * as styles from './package-guide.css';

export default function PackageGuide() {
  const copyBlockProps = {
    text: 'npm install react-video-timestone',
    language: 'bash',
    // showLineNumbers: props.showLineNumbers,
    // startingLineNumber: props.startingLineNumber,
    // wrapLines: true,
  };

  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>Get Started</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Installation</h2>
          <CopyBlock
            language="bash"
            text={'npm install react-video-timestone'}
            codeBlock
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Prepare Video (GOP 1)</h2>
          <CopyBlock
            language="bash"
            text={
              'ffmpeg -i input.mp4 -g 1 -keyint_min 1 -c:v libx264 -crf 18 output.mp4'
            }
            codeBlock
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>Examples</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Basic</h2>
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Loading</h2>
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Add Marker</h2>
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Control Playback</h2>
        </div>
      </section>
      <section>
        <h1 className={styles.title}>API</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Props</h2>
        </div>
      </section>
    </div>
  );
}
