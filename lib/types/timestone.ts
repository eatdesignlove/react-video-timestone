export type TimelineRef = {
  videoElement: HTMLVideoElement | undefined;
  play: () => void;
  pause: () => void;
  rewind: () => void;
  seekTo: ({ time, autoPlay }: ISeekToProps) => void;
} | null;

export type PlayerState =
  | 'INIT'
  | 'LOADING'
  | 'LOADING_PROGRESS'
  | 'READY'
  | 'PLAYING'
  | 'PAUSED'
  | 'ENDED'
  | 'TIMELINE_ENDED'
  | 'REVERSE'
  | 'ERROR';

export type PlayDirection = 'FORWARD' | 'BACKWARD';

export type MarkerDirection = 'FORWARD' | 'BACKWARD' | 'BOTH';

export type Marker = {
  videoIndex?: number;
  label: string;
  time: number;
  type?: 'pause';
  direction?: MarkerDirection;
  callback?: () => void;
  triggerPause?: () => void;
};

export interface ITimelineState {
  loadedVideoUrls: string[];
  loadingProgress: number;
  playerState: PlayerState;
  playDirection: PlayDirection;
  playIndex: number;
  markers?: Marker[];
}

export type TimelineAction =
  | { type: 'INIT' }
  | { type: 'LOADING'; payload?: Marker[] }
  | { type: 'LOADING_PROGRESS'; payload: number }
  | { type: 'READY'; payload: string[] }
  | { type: 'PLAYING'; payload?: number }
  | { type: 'PAUSED' }
  | { type: 'ENDED' }
  | { type: 'TIMELINE_ENDED' }
  | { type: 'REVERSE' }
  | { type: 'ERROR'; payload: string };

export interface IUseVideoAnimationProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  speed?: number;
  fps?: number;
  onEnded: ({ isTimelineEnded }: { isTimelineEnded?: boolean }) => void;
  playIndex: number;
  videoCount: number;
}

export interface IVideoProps {
  ref: React.RefObject<HTMLVideoElement | null>;
  url: string;
  loop?: boolean;
  poster?: string;
  onLoadedData?: () => void;
}

export interface ISeekToProps {
  time: number;
  autoPlay?: boolean;
}
export interface IVideoControlProps {
  onPlay: () => void;
  onPause: () => void;
  onRewind: () => void;
}

export interface IOnStateChangeProps {
  isPlaying: boolean;
  playerState: PlayerState;
  isRewind: boolean;
  currentTime?: number;
}
