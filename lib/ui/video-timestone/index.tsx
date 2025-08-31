import cx from 'classnames';
import { RefObject, useImperativeHandle, useRef } from 'react';
import { useVideoTimelineState } from '../../model/use-video-timestone-state';
import VideoControl from '../video-control';
import Video from '../video';
import { IOnStateChangeProps, Marker, TimelineRef } from '../../types';
import * as styles from './video-timestone.css';
import { VideoTimelineContext } from '../../model/video-timestone-context';

export default function VideoTimestone({
  speed,
  className,
  videoUrls,
  markers,
  controls,
  posters,
  onLoading,
  onLoaded,
  onReady,
  onStateChange,
  fullScreen,
  ref,
}: {
  speed?: number;
  posters?: string[];
  className?: string;
  videoUrls: string[];
  markers?: Marker[];
  onLoading?: (progress: number) => void;
  onLoaded?: () => void;
  onReady?: () => void;
  onStateChange?: (args: IOnStateChangeProps) => void;
  controls?: boolean;
  fullScreen?: boolean;
  ref: RefObject<TimelineRef | null>;
}) {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const { state, play, pause, rewind, seekTo, moveToFirstFrame } =
    useVideoTimelineState({
      ref: videoPlayerRef,
      speed,
      videoUrls,
      markers,
      onLoading,
      onLoaded,
      onReady,
      onStateChange: onStateChange,
    });
  useImperativeHandle(ref, () => ({
    videoElement: videoPlayerRef.current || undefined,
    play,
    pause,
    rewind,
    seekTo,
  }));

  return (
    <div
      className={cx(
        styles.container,
        fullScreen && styles.fullScreen,
        className
      )}
    >
      <VideoTimelineContext.Provider value={state}>
        <Video
          poster={posters && posters[state.playIndex]}
          ref={videoPlayerRef}
          url={state.loadedVideoUrls[state.playIndex] || ''}
          onLoadedData={() => moveToFirstFrame()}
        />
        {controls && (
          <VideoControl onPlay={play} onPause={pause} onRewind={rewind} />
        )}
      </VideoTimelineContext.Provider>
    </div>
  );
}
