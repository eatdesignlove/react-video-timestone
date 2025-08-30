import { useEffect, useReducer } from 'react';
import { reducer } from './video-timestone-reducer';
import { useVideoAnimation } from './use-video-animation';
import { setupMarkers } from '../utils';
import { IOnStateChangeProps, Marker } from '../types';
import { preloadVideos } from './preload-videos';

export const useVideoTimelineState = ({
  ref,
  markers,
  videoUrls,
  speed,
  fps,
  onLoading,
  onReady,
  onLoaded,
  onStateChange,
}: {
  ref: React.RefObject<HTMLVideoElement | null>;
  speed?: number;
  fps?: number;
  markers?: Marker[];
  videoUrls: string[];
  onLoading?: (progress: number) => void;
  onReady?: () => void;
  onLoaded?: () => void;
  onStateChange?: (args: IOnStateChangeProps) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    loadingProgress: 0,
    loadedVideoUrls: [],
    playerState: 'INIT',
    playDirection: 'FORWARD',
    playIndex: 0,
    markers: [],
  });

  const { play, pause, seekTo, reverse, addMarkers } = useVideoAnimation({
    videoRef: ref,
    speed,
    fps,
    playIndex: state.playIndex,
    videoCount: state.loadedVideoUrls.length,
    onEnded: ({ isTimelineEnded }) =>
      dispatch({ type: isTimelineEnded ? 'TIMELINE_ENDED' : 'ENDED' }),
  });

  useEffect(() => {
    if (state.playerState === 'INIT') {
      dispatch({ type: 'LOADING', ...(markers && { payload: markers }) });
      if (markers) {
        addMarkers(setupMarkers(markers, dispatch));
      }
    }
    if (state.playerState === 'LOADING') {
      preloadVideos({
        urls: videoUrls,
        onProgress: (progress: number) => {
          dispatch({ type: 'LOADING_PROGRESS', payload: progress });

          if (onLoading) {
            onLoading(progress);
          }
        },
      })
        .then(({ blobUrls }) => {
          dispatch({ type: 'READY', payload: blobUrls });
          onLoaded?.();
        })
        .catch(error => {
          dispatch({ type: 'ERROR', payload: error });
        });
    }
    if (state.playerState === 'READY') {
      if (onReady) {
        onReady();
      }
    }
    if (state.playerState === 'PLAYING') {
      play();
    }
    if (state.playerState === 'PAUSED') {
      pause();
    }
    if (state.playerState === 'ENDED') {
      // 남은 비디오가 있는 경우, 이어서 재생
      if (state.playDirection === 'FORWARD') {
        if (state.playIndex < state.loadedVideoUrls.length - 1) {
          dispatch({ type: 'PLAYING' });
        }
      }
      if (state.playIndex > 0) {
        dispatch({ type: 'PLAYING' });
      }
    }

    onStateChange?.({
      isPlaying: state.playerState === 'PLAYING',
      isRewind: state.playDirection === 'BACKWARD',
      playerState: state.playerState,
      currentTime: ref.current?.currentTime,
    });
  }, [state.playerState]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    state,
    play: () => {
      if (state.playDirection === 'BACKWARD') {
        dispatch({ type: 'REVERSE' });
        reverse();
      }
      dispatch({ type: 'PLAYING' });
    },
    pause: () => dispatch({ type: 'PAUSED' }),
    reverse: () => dispatch({ type: 'REVERSE' }),
    rewind: () => {
      if (state.playDirection === 'FORWARD') {
        dispatch({ type: 'REVERSE' });
        reverse();
      }
      dispatch({ type: 'PLAYING' });
    },
    seekTo,
    moveToFirstFrame: () => {
      if (
        state.playDirection === 'BACKWARD' &&
        state.playerState === 'PLAYING'
      ) {
        seekTo({
          time: ref.current!.duration,
          autoPlay: true,
        });
      }
    },
  };
};
