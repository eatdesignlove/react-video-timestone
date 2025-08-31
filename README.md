**EN** | [KO](README.ko.md)

# React Video Timestone

A React component library that provides seamless multi-video timeline experiences through instant navigation without buffering interruptions.

## Why This Library?

Every time you implement interactive video storytelling, you need to repeatedly develop complex logic for specific point events, reverse playback, multi-video connections, and more. It's difficult to create smooth storytelling experiences with HTML5 video alone, and implementing similar features from scratch each time makes it hard to focus on core storytelling. This library was created to address these pain points.

## Our Solution

React Video Timestone provides video control features essential for storytelling in a single component:

1. **Ready-to-use Timeline**: Smooth storytelling connecting multiple videos
2. **Interactive Marker System**: Automatic callback execution and control at specific points
3. **Buffer-free Instant Navigation**: Seamless navigation experience using preloading and Blob caching
4. **Play/Reverse/Seek**: Control forward and reverse playback with simple API
5. **Consistent Development Experience**: Implement all interactive videos the same way

## When to Use

✅ **Ideal for:**

- Storytelling with short videos where flow is important
- Storytelling connecting multiple videos
- Interfaces where play/reverse playback is crucial
- Experiences requiring interaction at specific points

❌ **Not suitable for:**

- Simple single video playback (regular video tag is sufficient)
- Very long video content (increased memory usage)
- Real-time streaming content

## Technical Considerations

### Advantages

- Buffer-free playback
- Smooth play/reverse experience
- Interaction through marker system

### Limitations

- **Memory Usage**: All videos cached as blobs in memory
- **Initial Loading**: Initial delay due to preloading all videos
- **File Size**: Increased file size with GOP-1 optimization

## Installation

```bash
npm install react-video-timestone
```

## Quick Start

```jsx
import {
  VideoTimestone,
  MARKER_DIRECTION,
  MARKER_ACTION,
} from 'react-video-timestone';

function App() {
  return (
    <VideoTimestone
      videoUrls={['/video1.mp4', '/video2.mp4', '/video3.mp4']}
      speed={1}
      controls
      onStateChange={({ currentTime, playerState }) => {
        console.log('Current time:', currentTime, 'State:', playerState);
      }}
    />
  );
}
```

## Usage Examples

### Basic Multi-video Timeline

```jsx
function VideoExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [canPlay, setCanPlay] = useState(false);

  return (
    <VideoTimestone
      videoUrls={['/intro.mp4', '/main.mp4', '/outro.mp4']}
      controls
      onLoading={progress => console.log(`Downloading: ${progress}%`)}
      onLoaded={() => {
        console.log('Download complete');
        setIsLoading(false);
      }}
      onReady={() => {
        console.log('Ready to play');
        setCanPlay(true);
      }}
    />
  );
}
```

### Interactive Timeline with Markers

```jsx
<VideoTimestone
  videoUrls={['/story.mp4']}
  markers={[
    {
      time: 5,
      label: 'Choice Point',
      action: MARKER_ACTION.PAUSE,
      callback: () => showChoiceDialog(),
    },
    {
      time: 10,
      label: 'Reverse Point',
      direction: MARKER_DIRECTION.BACKWARD,
    },
  ]}
  onStateChange={({ playerState, currentTime }) => {
    console.log(`State: ${playerState}, Time: ${currentTime}`);
  }}
/>
```

### External Control with Ref

```jsx
function ControlledTimeline() {
  const timelineRef = useRef(null);

  return (
    <>
      <VideoTimestone
        ref={timelineRef}
        videoUrls={['/demo.mp4']}
        controls={false}
      />
      <button onClick={() => timelineRef.current?.play()}>Play</button>
      <button onClick={() => timelineRef.current?.pause()}>Pause</button>
      <button
        onClick={() =>
          timelineRef.current?.seekTo({ time: 10, autoPlay: true })
        }
      >
        Jump to 10s
      </button>
    </>
  );
}
```

## Video Preparation

For optimal performance, videos should be encoded with:

- **GOP Size**: 1 (each frame is a keyframe)
- **Format**: MP4 with H.264
- **Duration**: Set appropriately for your use case
- **Resolution**: Match your display requirements
- **Mobile**: Recommend preparing separate mobile-optimized videos for performance

FFmpeg command examples:

```bash
# Basic GOP-1 conversion
ffmpeg -i input.mp4 -g 1 output-gop1.mp4

# With quality adjustment if needed
ffmpeg -i input.mp4 -g 1 -c:v libx264 -crf 23 output-gop1.mp4
```

## API Reference

### VideoTimestone Props

- `videoUrls` (string[]): Array of video URLs to play (required)
- `markers?` (Marker[]): Array of timeline markers
- `speed?` (number): Playback speed (default: 1)
- `controls?` (boolean): Show default controls
- `fullScreen?` (boolean): Fullscreen mode
- `className?` (string): Custom CSS class
- `posters?` (string[]): Array of poster images for each video
- `onLoading?` ((progress: number) => void): Video download progress callback (0-100)
- `onLoaded?` (() => void): Called when all video downloads and blob conversion complete
- `onReady?` (() => void): Called when video elements finish loading and are ready for actual playback
- `onStateChange?` ((state) => void): State change callback

### Marker Type

```typescript
// Convenient constants
export const MARKER_DIRECTION = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  BOTH: 'BOTH',
} as const;

export const MARKER_ACTION = {
  CONTINUE: 'continue',
  PAUSE: 'pause',
} as const;

// Marker types
type MarkerDirection = (typeof MARKER_DIRECTION)[keyof typeof MARKER_DIRECTION];
type MarkerAction = (typeof MARKER_ACTION)[keyof typeof MARKER_ACTION];

type Marker = {
  videoIndex?: number; // Video index (default: 0)
  label: string; // Marker label
  time: number; // Marker time (seconds)
  action?: MarkerAction; // Marker action (default: 'continue')
  direction?: MarkerDirection; // Direction
  callback?: () => void; // Callback function
};
```

### Ref Methods

```typescript
type TimelineRef = {
  videoElement: HTMLVideoElement | undefined; // Video element
  play: () => void; // Play
  pause: () => void; // Pause
  rewind: () => void; // Reverse play
  seekTo: ({ time, autoPlay }) => void; // Seek to specific time
};
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [eatdesignlove](https://github.com/eatdesignlove)