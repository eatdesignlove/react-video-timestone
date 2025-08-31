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
            text={`# Basic GOP-1 conversion
ffmpeg -i input.mp4 -g 1 output-gop1.mp4

# With quality adjustment if needed
ffmpeg -i input.mp4 -g 1 -c:v libx264 -crf 23 output-gop1.mp4`}
            {...codeBlockProps}
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>Usage</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Basic</h2>
          <CopyBlock
            language="tsx"
            text={`import { VideoTimestone } from 'react-video-timestone';

function App() {
  return (
    <VideoTimestone
      videoUrls={['/video.mp4']}
      controls
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
        onLoading={(progress) => console.log('Progress:', progress + '%')}
        onLoaded={() => console.log('Download complete')}
        onReady={() => setIsLoading(false)}
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
            text={`import { VideoTimestone, MARKER_ACTION } from 'react-video-timestone';

function App() {
  const markers = [
    {
      time: 2.5,
      videoIndex: 0,
      label: 'intro-end',
      action: MARKER_ACTION.PAUSE,
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
  const handleSeek = (time) => timelineRef.current?.seekTo({ time, autoPlay: true });

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
        <button onClick={() => handleSeek(10)}>Jump to 10s</button>
      </div>
    </div>
  );
}`}
            {...codeBlockProps}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Marker Directions</h2>
          <CopyBlock
            language="tsx"
            text={`import { VideoTimestone, MARKER_DIRECTION } from 'react-video-timestone';

function App() {
  const markers = [
    {
      time: 2.0,
      label: 'forward-only',
      direction: MARKER_DIRECTION.FORWARD,  // Only triggers when playing forward
      callback: () => console.log('Forward playback marker'),
    },
    {
      time: 5.0,
      label: 'backward-only', 
      direction: MARKER_DIRECTION.BACKWARD, // Only triggers when playing backward
      callback: () => console.log('Backward playback marker'),
    },
    {
      time: 8.0,
      label: 'both-directions',
      direction: MARKER_DIRECTION.BOTH,     // Triggers in both directions (default)
      callback: () => console.log('Bi-directional marker'),
    },
  ];

  return (
    <VideoTimestone
      videoUrls={['/video.mp4']}
      markers={markers}
      onReady={() => console.log('Direction-based markers ready!')}
    />
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
            text={`// Constants for better developer experience
export const MARKER_DIRECTION = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD', 
  BOTH: 'BOTH',
} as const;

export const MARKER_ACTION = {
  CONTINUE: 'continue',
  PAUSE: 'pause',
} as const;

type MarkerDirection = typeof MARKER_DIRECTION[keyof typeof MARKER_DIRECTION];
type MarkerAction = typeof MARKER_ACTION[keyof typeof MARKER_ACTION];

interface VideoTimestoneProps {
  videoUrls: string[];           // Array of video URLs (required)
  markers?: Marker[];            // Timeline markers
  speed?: number;                // Playback speed (default: 1)
  controls?: boolean;            // Show default controls
  fullScreen?: boolean;          // Fullscreen mode
  className?: string;            // Custom CSS class
  posters?: string[];            // Poster images for each video
  
  // Event callbacks
  onLoading?: (progress: number) => void;    // Download progress (0-100)
  onLoaded?: () => void;                     // All videos downloaded and blob converted
  onReady?: () => void;                      // Video elements ready for playback
  onStateChange?: (state) => void;           // State change callback
}

interface Marker {
  videoIndex?: number;           // Video index (default: 0)
  label: string;                 // Marker label
  time: number;                  // Time in seconds
  action?: MarkerAction;         // Marker action (default: 'continue')
  direction?: MarkerDirection;   // Playback direction filter
  callback?: () => void;         // Callback function
}`}
            {...codeBlockProps}
          />
        </div>
      </section>
    </div>
  );
}
