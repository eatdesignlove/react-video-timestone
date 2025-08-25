import { CopyBlock, dracula } from 'react-code-blocks';
import * as styles from './package-guide.css';

const codeBlockProps = {
  showLineNumbers: true,
  codeBlock: true,
  theme: dracula,
  codeContainerStyle: {
    fontFamily: 'monospace',
  },
};

export default function PackageGuide() {
  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>Get Started</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Installation</h2>
          <CopyBlock
            {...codeBlockProps}
            language="bash"
            text={'npm install react-video-timestone'}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Prepare Video (GOP 1)</h2>
          <CopyBlock
            language="bash"
            text={
              'ffmpeg -i input.mp4 -g 1 -keyint_min 1 -c:v libx264 -crf 18 output.mp4'
            }
            {...codeBlockProps}
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>Examples</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Basic</h2>
          <CopyBlock
            language="tsx"
            text={`import { VideoTimestone } from 'react-video-timestone';

function App() {
  return (
    <VideoTimestone
      videoUrls={['/video.mp4']}
      onReady={() => console.log('Video ready!')}
    />
  );
}`}
            {...codeBlockProps}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Loading</h2>
          <CopyBlock
            language="tsx"
            text={`import { VideoTimestone } from 'react-video-timestone';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div>
      {isLoading && <div>Loading videos...</div>}
      <VideoTimestone
        videoUrls={['/video1.mp4', '/video2.mp4']}
        onReady={() => setIsLoading(false)}
        onError={(error) => console.error('Load failed:', error)}
      />
    </div>
  );
}`}
            {...codeBlockProps}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Add Marker</h2>
          <CopyBlock
            language="tsx"
            text={`import { VideoTimestone } from 'react-video-timestone';

function App() {
  const markers = [
    {
      time: 2.5,
      videoIndex: 0,
      label: 'intro-end',
      callback: () => console.log('Intro finished!'),
    },
    {
      time: 5.0,
      videoIndex: 0,
      label: 'main-content',
      callback: () => console.log('Main content started'),
    },
  ];

  return (
    <VideoTimestone
      videoUrls={['/story.mp4']}
      markers={markers}
      onReady={() => console.log('Ready with markers!')}
    />
  );
}`}
            {...codeBlockProps}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Control Playback</h2>
          <CopyBlock
            language="tsx"
            text={`import { VideoTimestone } from 'react-video-timestone';
import { useRef } from 'react';

function App() {
  const timelineRef = useRef(null);

  const handlePlay = () => timelineRef.current?.play();
  const handlePause = () => timelineRef.current?.pause();
  const handleSeek = (time) => timelineRef.current?.seek(time);

  return (
    <div>
      <VideoTimestone
        ref={timelineRef}
        videoUrls={['/demo.mp4']}
        onReady={() => console.log('Controls ready!')}
      />
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={() => handleSeek(10)}>Seek to 10s</button>
      </div>
    </div>
  );
}`}
            {...codeBlockProps}
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>API</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Props</h2>
          <CopyBlock
            language="typescript"
            text={`interface VideoTimelineProps {
  videoUrls: string[];           // Array of video file URLs
  markers?: Marker[];            // Timeline markers for events
  speed?: number;                // Playback speed (default: 1)
  fps?: number;                  // Frame rate (default: 30)
  controls?: boolean;            // Show playback controls
  fullScreen?: boolean;          // Enable fullscreen mode
  className?: string;            // Custom CSS class
  posters?: string[];            // Poster images for videos
  
  // Event callbacks
  onLoading?: (progress: number) => void;
  onLoaded?: () => void;
  onReady?: () => void;
  onStateChange?: (state: {
    isPlaying: boolean;
    playerState: PlayerState;
    isRewind: boolean;
    currentTime?: number;
  }) => void;
}

interface Marker {
  videoIndex?: number;           // Video index (default: 0)
  label: string;                 // Marker identifier
  time: number;                  // Time in seconds
  type?: 'pause';               // Auto-pause at marker
  callback?: () => void;         // Callback function
}`}
            {...codeBlockProps}
          />
        </div>
      </section>
    </div>
  );
}
