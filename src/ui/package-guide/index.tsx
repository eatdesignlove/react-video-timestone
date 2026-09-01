import { useState, type ReactNode } from 'react';
import * as styles from './package-guide.css';

const LANGUAGE_LABELS: Record<string, string> = {
  bash: 'Bash',
  tsx: 'TSX',
  typescript: 'TypeScript',
};

const TOKEN_PATTERN =
  /(\/\/.*$|#.*$|'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`|\b(?:as|const|export|from|function|import|interface|return|type|typeof|new|if|else|true|false|undefined)\b|\b\d+(?:\.\d+)?\b)/gm;

function highlightLine(line: string): ReactNode[] {
  return line.split(TOKEN_PATTERN).map((token, index) => {
    if (!token) return null;

    let className: string | undefined;
    if (/^(\/\/|#)/.test(token)) className = styles.tokenComment;
    else if (/^['"`]/.test(token)) className = styles.tokenString;
    else if (/^\d/.test(token)) className = styles.tokenNumber;
    else if (/^(true|false|undefined)$/.test(token))
      className = styles.tokenLiteral;
    else if (/^[a-z]+$/.test(token)) className = styles.tokenKeyword;

    return className ? (
      <span className={className} key={`${token}-${index}`}>
        {token}
      </span>
    ) : (
      token
    );
  });
}

interface CodeSampleProps {
  language: string;
  text: string;
}

function CodeSample({ language, text }: CodeSampleProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={styles.codeCard}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLanguage}>
          {LANGUAGE_LABELS[language] ?? language}
        </span>
        <button
          type="button"
          className={styles.copyButton}
          onClick={copyCode}
          aria-label={copied ? 'Code copied' : 'Copy code'}
        >
          {copied ? (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path
                d="m3 8 3 3 7-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <rect
                x="5.5"
                y="5.5"
                width="7"
                height="7"
                rx="1.2"
                fill="none"
                stroke="currentColor"
              />
              <path
                d="M3.5 10.5h-1v-7a1 1 0 0 1 1-1h7v1"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
          )}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className={styles.codeScroller} tabIndex={0}>
        <pre className={styles.codeBlock}>
          <code>
            {text.split('\n').map((line, index) => (
              <span className={styles.codeLine} key={index}>
                <span className={styles.lineNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.lineContent}>
                  {highlightLine(line)}
                  {'\n'}
                </span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default function PackageGuide() {
  return (
    <div className={styles.container}>
      <section>
        <h1 className={styles.title}>Get Started</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Installation</h2>
          <CodeSample
            language="bash"
            text={'npm install react-video-timestone'}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Prepare Video (GOP 1)</h2>
          <CodeSample
            language="bash"
            text={`# Basic GOP-1 conversion
ffmpeg -i input.mp4 -g 1 output-gop1.mp4

# With quality adjustment if needed
ffmpeg -i input.mp4 -g 1 -c:v libx264 -crf 23 output-gop1.mp4`}
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>Usage</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Basic</h2>
          <CodeSample
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
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Loading</h2>
          <CodeSample
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
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Add Marker</h2>
          <CodeSample
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
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Control Playback</h2>
          <CodeSample
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
          />
        </div>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Marker Directions</h2>
          <CodeSample
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
          />
        </div>
      </section>
      <section>
        <h1 className={styles.title}>API</h1>
        <div className={styles.contentWrapper}>
          <h2 className={styles.subTitle}>Props</h2>
          <CodeSample
            language="typescript"
            text={`// Constants for better developer experience
export const MARKER_DIRECTION = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD', 
  BOTH: 'BOTH',
} as const;

export const MARKER_ACTION = {
  CONTINUE: 'CONTINUE',
  PAUSE: 'PAUSE',
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
  action?: MarkerAction;         // Marker action (default: 'CONTINUE')
  direction?: MarkerDirection;   // Playback direction filter
  callback?: () => void;         // Callback function
}`}
          />
        </div>
      </section>
    </div>
  );
}
