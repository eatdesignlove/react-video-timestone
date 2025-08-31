import { useEffect, useRef, useState } from 'react';
import { ISeekToProps, IUseVideoAnimationProps, Marker } from '../types';

export const useVideoAnimation = ({
  videoRef,
  onEnded,
  speed = 1.0,
  videoCount,
  playIndex,
}: IUseVideoAnimationProps) => {
  const updateIntervalMs = 1000 / 30; // 30fps 고정
  const animationFrameId = useRef<number | null>(null);
  const playDirection = useRef<'FORWARD' | 'BACKWARD'>('FORWARD');
  const startTime = useRef<number>(0);
  const currentMarkerName = useRef<string>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  function play() {
    let lastTimestamp: number | null = null;

    if (!videoRef.current) {
      throw new Error('videoRef 가 존재하지 않습니다.');
    }

    startTime.current = videoRef.current.currentTime;

    function clear() {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }

    function checkMarker({
      markers,
      prevCurrentTime,
      newCurrentTime,
    }: {
      markers: Marker[];
      prevCurrentTime: number;
      newCurrentTime: number;
    }) {
      if (!markers || markers.length === 0) {
        return;
      }

      if (
        currentMarkerName.current &&
        Math.abs(startTime.current - newCurrentTime) > 0.2
      ) {
        currentMarkerName.current = null;
      }

      // currentTime이 실행 환경에 따라 조금씩 차이가 날 수 있음 = 실행되지 않고 넘어가는 경우 발생
      // 시간이 지나면 해당 마커는 반드시 실행이 되어야 함
      // 실행 시점이 지났는데도, 해당 마커가 실행되지 않았다면 강제로 실행시킴
      const marker = markers.find(marker => {
        if (
          typeof marker?.videoIndex !== 'undefined' &&
          playIndex !== marker.videoIndex
        ) {
          return null;
        }

        const isForward = playDirection.current === 'FORWARD';
        const markerDirection = marker.direction || 'BOTH';

        // 마커 방향 필터링
        if (markerDirection === 'FORWARD' && !isForward) {
          return null;
        }
        if (markerDirection === 'BACKWARD' && isForward) {
          return null;
        }

        const prevTime = Number(prevCurrentTime.toFixed(2));
        const markerTime = Number(marker.time.toFixed(2));
        const current = Number(newCurrentTime.toFixed(2));

        if (isForward && markerTime > prevTime && markerTime <= current) {
          return marker;
        }
        if (!isForward && current <= markerTime && markerTime < prevTime) {
          return marker;
        }
        return null;
      });

      if (!marker) {
        return;
      }

      if (currentMarkerName.current !== marker.label) {
        if (marker.action === 'pause') {
          marker.triggerPause?.();
          clear();
        }
        marker.callback?.();
        currentMarkerName.current = marker.label;
      }
    }

    function animate(timestamp: number) {
      const isForward = playDirection.current === 'FORWARD';

      if (!videoRef.current) {
        throw new Error('videoRef 가 존재하지 않습니다.');
      }

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      // 프레임 시간 확인
      const elapsed = timestamp - lastTimestamp;

      if (elapsed >= updateIntervalMs) {
        const deltaTime = (elapsed / 1000) * speed;
        lastTimestamp = timestamp;

        const prevCurrentTime = videoRef.current.currentTime;
        const newCurrentTime = isForward
          ? videoRef.current.currentTime + deltaTime
          : videoRef.current.currentTime - deltaTime;

        videoRef.current.currentTime = newCurrentTime;

        checkMarker({
          markers,
          prevCurrentTime,
          newCurrentTime,
        });

        if (
          isForward
            ? videoRef.current.duration > newCurrentTime
            : 0 < newCurrentTime
        ) {
          animationFrameId.current = requestAnimationFrame(animate);
        } else {
          if (animationFrameId.current) {
            clear();

            if (onEnded) {
              onEnded({
                isTimelineEnded: isForward
                  ? playIndex === videoCount - 1
                  : playIndex === 0,
              }); // 타임라인 종료 여부 확인
            }
          }
        }
      } else {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    }
    animationFrameId.current = requestAnimationFrame(animate);
  }

  function pause() {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }

  function reverse() {
    playDirection.current =
      playDirection.current === 'FORWARD' ? 'BACKWARD' : 'FORWARD';
  }

  function seekTo({ time, autoPlay = false }: ISeekToProps) {
    if (videoRef.current) {
      pause();
      videoRef.current.currentTime = time;

      if (autoPlay) {
        play();
      }
    }
  }

  function addMarkers(markers: Marker[]) {
    setMarkers(prevMarkers => [...prevMarkers, ...markers]);
  }

  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    };
  }, []);

  return {
    play,
    pause,
    reverse,
    seekTo,
    addMarkers,
  };
};
