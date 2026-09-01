import { useRef, useState, useEffect, forwardRef } from 'react';
import cx from 'classnames';
import {
  IoPauseSharp,
  IoPlayBackSharp,
  IoPlaySharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from 'react-icons/io5';
import {
  VideoTimestone,
  TimelineRef,
  MARKER_DIRECTION,
  MARKER_ACTION,
} from '../../../lib';
import * as styles from './demo.css';

const PLAY_STATE = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  REWIND: 'REWIND',
} as const;

type PlayState = keyof typeof PLAY_STATE;

const SEGMENT_BOUNDARY_EPSILON = 0.01;
const REWIND_START_EPSILON = 0.05;
const PREVIOUS_RESTART_THRESHOLD = 0.25;
const END_BOUNDARY_TOLERANCE = 0.25;

const Demo = forwardRef<HTMLElement>((_, ref) => {
  const timelineRef = useRef<TimelineRef>(null);
  const trackRef = useRef<HTMLDivElement>(null); // 추가
  const playbackIntentRef = useRef<PlayState>(PLAY_STATE.PAUSE);
  const hasEnteredPlaybackRef = useRef(false);
  // 실제로 재생 중인 상태가 아니므로 PAUSE로 시작 (가짜 PLAY 상태 방지)
  const [playState, setPlayState] = useState<keyof typeof PLAY_STATE>(
    PLAY_STATE.PAUSE
  );
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');
  const [mousePosition, setMousePosition] = useState<{
    left: string;
    time: number;
  } | null>(null); // 추가

  // 사용자가 데모를 요청하기 전까지 VideoTimestone을 마운트하지 않는다.
  const [started, setStarted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleStart = () => {
    setVideoUrl(
      window.matchMedia('(min-width: 769px)').matches
        ? '/demo2-desktop.mp4'
        : '/demo2-mobile-8bit.mp4'
    );
    setStarted(true);
  };

  const handlePlay = () => {
    playbackIntentRef.current = PLAY_STATE.PLAY;
    hasEnteredPlaybackRef.current = true;
    setPlayState(PLAY_STATE.PLAY);
    timelineRef.current?.play();
  };

  const handlePause = () => {
    playbackIntentRef.current = PLAY_STATE.PAUSE;
    setPlayState(PLAY_STATE.PAUSE);
    timelineRef.current?.pause();
  };

  const isRewinding = playState === PLAY_STATE.REWIND;
  const isMoving = playState !== PLAY_STATE.PAUSE;

  const handleRewind = () => {
    if (playbackIntentRef.current === PLAY_STATE.REWIND) {
      handlePause();
      return;
    }

    if (currentTime <= REWIND_START_EPSILON) return;

    // Direction changes do not always trigger onStateChange while already playing,
    // so user intent remains authoritative until the engine actually pauses/stops.
    playbackIntentRef.current = PLAY_STATE.REWIND;
    setPlayState(PLAY_STATE.REWIND);

    // The library's READY reducer ignores its first REVERSE action even though
    // the animation direction ref flips. Queue PLAYING -> PAUSED first so both
    // internal direction stores enter rewind in sync, without changing its API.
    if (!hasEnteredPlaybackRef.current) {
      timelineRef.current?.play();
      timelineRef.current?.pause();
      hasEnteredPlaybackRef.current = true;
    }

    timelineRef.current?.rewind();
  };

  const handleSeekTo = (time: number) => {
    timelineRef.current?.seekTo({
      time,
      autoPlay: isMoving,
    });
    setCurrentTime(time);
    setCurrentSubtitle('');
  };

  // 트랙에서 마우스 이벤트 처리 (추가)
  const handleTrackMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !videoDuration) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const targetTime = (percentage / 100) * videoDuration;

    setMousePosition({
      left: `${percentage}%`,
      time: targetTime,
    });
  };

  const handleTrackMouseLeave = () => {
    setMousePosition(null);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !videoDuration) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const targetTime = (percentage / 100) * videoDuration;

    handleSeekTo(targetTime);
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const subtitleMarkers = [
    {
      time: 0,
      label: 'clear',
      direction: MARKER_DIRECTION.BOTH,
      callback: () => setCurrentSubtitle(''),
    },
    {
      time: 1.03,
      label: 'clear',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () => setCurrentSubtitle(''),
    },
    {
      time: 1.03,
      label: 'dialogue-1',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () =>
        setCurrentSubtitle(
          '여기 오느라 마지막 돈까지 썼어요. 표를 구했고, 당신은 믿음으로 치유된다고 말하네요.'
        ),
    },
    {
      time: 7.09,
      label: 'dialogue-1-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () =>
        setCurrentSubtitle(
          '여기 오느라 마지막 돈까지 썼어요. 표를 구했고, 당신은 믿음으로 치유된다고 말하네요.'
        ),
    },
    {
      time: 7.09,
      label: 'dialogue-2',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () =>
        setCurrentSubtitle(
          '당신은 열쇠구멍을 통해 세상을 보는 사람이에요. 평생 그 열쇠구멍을 넓히려 애썼죠. 더 많이 보고, 더 많이 알기 위해서요. 그리고 이제, 그 열쇠구멍이 상상도 못할 방식으로 넓어질 수 있다는 말을 듣고도, 그 가능성을 거부하네요.'
        ),
    },
    {
      time: 21.07,
      label: 'dialogue-2-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () =>
        setCurrentSubtitle(
          '당신은 열쇠구멍을 통해 세상을 보는 사람이에요. 평생 그 열쇠구멍을 넓히려 애썼죠. 더 많이 보고, 더 많이 알기 위해서요. 그리고 이제, 그 열쇠구멍이 상상도 못할 방식으로 넓어질 수 있다는 말을 듣고도, 그 가능성을 거부하네요.'
        ),
    },
    {
      time: 21.07,
      label: 'dialogue-3',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () =>
        setCurrentSubtitle(
          '저는 차크라나 에너지, 믿음의 힘 같은 동화는 믿지 않으니까요. 영혼 같은 건 없어요. 우리는 그저 물질로 이루어졌을 뿐이에요. 당신도 무관심한 우주 속의 작은 먼지일 뿐이죠.'
        ),
    },
    {
      time: 37.23,
      label: 'dialogue-3-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () =>
        setCurrentSubtitle(
          '저는 차크라나 에너지, 믿음의 힘 같은 동화는 믿지 않으니까요. 영혼 같은 건 없어요. 우리는 그저 물질로 이루어졌을 뿐이에요. 당신도 무관심한 우주 속의 작은 먼지일 뿐이죠.'
        ),
    },
    {
      time: 37.23,
      label: 'dialogue-4',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () => setCurrentSubtitle('당신은 자신을 너무 과소평가해요.'),
    },
    {
      time: 39.09,
      label: 'dialogue-4-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () => setCurrentSubtitle('당신은 자신을 너무 과소평가해요.'),
    },
    {
      time: 39.09,
      label: 'dialogue-5',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () =>
        setCurrentSubtitle(
          '아, 내가 투명인간처럼 보인다고요? 아니에요, 당신은 저를 꿰뚫어보지 못해요. 하지만 저는 당신을 꿰뚫어봤죠.'
        ),
    },
    {
      time: 45.0,
      label: 'dialogue-5-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () =>
        setCurrentSubtitle(
          '아, 내가 투명인간처럼 보인다고요? 아니에요, 당신은 저를 꿰뚫어보지 못해요. 하지만 저는 당신을 꿰뚫어봤죠.'
        ),
    },
    {
      time: 45.0,
      label: 'clear',
      direction: MARKER_DIRECTION.BOTH,
      action: MARKER_ACTION.PAUSE,
      callback: () => setCurrentSubtitle(''),
    },
    {
      time: 63.04,
      label: 'clear-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () => setCurrentSubtitle(''),
    },
    {
      time: 63.04,
      label: 'dialogue-6',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () =>
        setCurrentSubtitle(
          '지금 저한테 무슨 짓을 한 거예요? 당신의 아스트랄 형태를 육체에서 분리시켰어요.'
        ),
    },
    {
      time: 65.12,
      label: 'dialogue-6-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () =>
        setCurrentSubtitle(
          '지금 저한테 무슨 짓을 한 거예요? 당신의 아스트랄 형태를 육체에서 분리시켰어요.'
        ),
    },
    {
      time: 65.12,
      label: 'dialogue-7',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () => setCurrentSubtitle('차에 뭐가 들어있죠? 실로시빈? LSD?'),
    },
    {
      time: 66.23,
      label: 'dialogue-7-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () => setCurrentSubtitle('차에 뭐가 들어있죠? 실로시빈? LSD?'),
    },
    {
      time: 66.23,
      label: 'dialogue-8',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () => setCurrentSubtitle('그냥 차예요. 꿀을 조금 넣었죠.'),
    },
    {
      time: 75.0,
      label: 'dialogue-8-backward',
      direction: MARKER_DIRECTION.BACKWARD,
      callback: () => setCurrentSubtitle('그냥 차예요. 꿀을 조금 넣었죠.'),
    },
    {
      time: 75.0,
      label: 'clear',
      direction: MARKER_DIRECTION.FORWARD,
      callback: () => setCurrentSubtitle(''),
    },
  ];

  const segmentTimes = Array.from(
    new Set(subtitleMarkers.map(marker => marker.time))
  ).sort((a, b) => a - b);

  const currentSegmentIndex = segmentTimes.reduce(
    (lastIndex, time, index) =>
      time <= currentTime + SEGMENT_BOUNDARY_EPSILON ? index : lastIndex,
    -1
  );
  const currentSegmentTime = segmentTimes[currentSegmentIndex];
  const previousSegmentTime =
    currentSegmentTime !== undefined &&
    currentTime - currentSegmentTime > PREVIOUS_RESTART_THRESHOLD
      ? currentSegmentTime
      : segmentTimes[currentSegmentIndex - 1];
  const nextSegmentTime = segmentTimes.find(
    time =>
      time > currentTime + SEGMENT_BOUNDARY_EPSILON &&
      (!videoDuration || time <= videoDuration + END_BOUNDARY_TOLERANCE)
  );
  const lastSegmentTime = segmentTimes[segmentTimes.length - 1] ?? 0;
  const isNearLastSegment =
    currentTime >= lastSegmentTime - END_BOUNDARY_TOLERANCE;
  const isNearVideoEnd =
    videoDuration > 0 && currentTime >= videoDuration - END_BOUNDARY_TOLERANCE;
  const canGoPrevious = isLoaded && previousSegmentTime !== undefined;
  const canRewind = isLoaded && currentTime > REWIND_START_EPSILON;
  const canGoNext =
    isLoaded &&
    nextSegmentTime !== undefined &&
    !isNearLastSegment &&
    !isNearVideoEnd;

  const handlePreviousSegment = () => {
    if (previousSegmentTime !== undefined) {
      handleSeekTo(previousSegmentTime);
    }
  };

  const handleNextSegment = () => {
    if (nextSegmentTime !== undefined) {
      handleSeekTo(nextSegmentTime);
    }
  };

  // 현재 재생 시간 추적
  useEffect(() => {
    if (playState === PLAY_STATE.PAUSE || !videoDuration) return;

    const interval = setInterval(() => {
      const nextTime = timelineRef.current?.videoElement?.currentTime || 0;
      setCurrentTime(nextTime);

      if (playState === PLAY_STATE.REWIND && nextTime <= REWIND_START_EPSILON) {
        playbackIntentRef.current = PLAY_STATE.PAUSE;
        timelineRef.current?.pause();
        setPlayState(PLAY_STATE.PAUSE);
      }
    }, 100); // 100ms마다 업데이트

    return () => clearInterval(interval);
  }, [playState, videoDuration]);

  // container 위에서 마우스 움직였을 때 controlContainer 표시되었다가, 5초이상 움직임 없으면 숨기기

  return (
    <section ref={ref} id="demo-section" className={styles.container}>
      <div className={styles.stage}>
        {!started && (
          <div className={styles.startOverlay}>
            <img
              src="/demo2-poster.jpg"
              alt="React Video Timestone 인터랙티브 데모 미리보기"
              className={styles.posterImage}
            />
            <div className={styles.startScrim} />
            <button
              type="button"
              className={styles.startButton}
              onClick={handleStart}
            >
              <IoPlaySharp size={18} aria-hidden />
              View Interactive Demo
            </button>
          </div>
        )}
        {started && (
          <div className={styles.heroVideoBackground}>
            {!isLoaded && (
              <div className={styles.heroLoadingOverlay}>
                <div
                  className={styles.heroLoadingContent}
                  role="status"
                  aria-live="polite"
                >
                  <div className={styles.heroProgressBar}>
                    <div
                      className={styles.heroProgressFill}
                      style={{ width: `${loadingProgress}%` }}
                    />
                  </div>
                  <span>Loading video… {Math.round(loadingProgress)}%</span>
                </div>
              </div>
            )}
            <VideoTimestone
              ref={timelineRef}
              className={styles.heroBackgroundVideo}
              videoUrls={[videoUrl!]}
              markers={subtitleMarkers}
              onLoading={progress => setLoadingProgress(progress)}
              onLoaded={() => setIsLoaded(true)}
              onStateChange={({ isPlaying }) => {
                const playbackIntent = playbackIntentRef.current;

                if (!isPlaying) {
                  const stoppedTime =
                    timelineRef.current?.videoElement?.currentTime;

                  playbackIntentRef.current = PLAY_STATE.PAUSE;
                  if (stoppedTime !== undefined) {
                    setCurrentTime(
                      stoppedTime <= REWIND_START_EPSILON ? 0 : stoppedTime
                    );
                  }
                  setPlayState(PLAY_STATE.PAUSE);
                  return;
                }

                if (playbackIntent === PLAY_STATE.PAUSE) {
                  return;
                }

                if (playbackIntent === PLAY_STATE.REWIND) {
                  setPlayState(PLAY_STATE.REWIND);
                  return;
                }

                // A direction-only reducer update can report the old direction.
                // Explicit forward intent stays authoritative while moving.
                setPlayState(PLAY_STATE.PLAY);
              }}
              onReady={() => {
                setTimeout(() => {
                  const videoElement = document.querySelector('video');
                  if (videoElement && videoElement.duration) {
                    setVideoDuration(videoElement.duration);
                  }
                }, 500);
              }}
            />
          </div>
        )}
      </div>
      {started && (
        <div className={styles.controlTray}>
          {currentSubtitle && (
            <div className={styles.subtitleContainer}>
              <p className={styles.subtitleText}>{currentSubtitle}</p>
            </div>
          )}
          <div className={cx(styles.progressContainer, isLoaded && 'active')}>
            <div className={styles.progressTime}>{formatTime(currentTime)}</div>
            <div
              ref={trackRef}
              className={styles.progressTrack}
              onMouseMove={handleTrackMouseMove}
              onMouseLeave={handleTrackMouseLeave}
              onClick={handleTrackClick}
              style={{ cursor: 'pointer' }}
            >
              {/* 현재 재생 위치 표시 */}
              <div
                className={styles.progressPlaybackFill}
                style={{
                  width: videoDuration
                    ? `${(currentTime / videoDuration) * 100}%`
                    : '0%',
                }}
              />

              {mousePosition && (
                <div
                  className={styles.progressMarker}
                  style={{
                    left: mousePosition.left,
                    transform: 'translate(-50%, -50%)',
                  }}
                  title={`${formatTime(mousePosition.time)}`}
                >
                  {formatTime(mousePosition.time)}
                </div>
              )}

              {/* 자막 마커들 표시 */}
              {subtitleMarkers
                .filter(
                  marker => marker.time > 0 && marker.time < videoDuration
                )
                .map((marker, index) => (
                  <div
                    key={`subtitle-marker-${index}`}
                    className={styles.subtitleMarker}
                    style={{
                      left: `${(marker.time / videoDuration) * 100}%`,
                    }}
                    title={`자막 ${index + 1}: ${formatTime(marker.time)}`}
                  >
                    <span className={styles.subtitleMarkerText}>
                      {marker?.label}
                    </span>
                  </div>
                ))}
            </div>
            <div className={styles.progressTime}>
              {formatTime(videoDuration)}
            </div>
          </div>
          <div className={cx(styles.controlGroup, isLoaded && 'active')}>
            <div className={styles.rewindControl}>
              <button
                type="button"
                title={isRewinding ? 'Stop rewind' : 'Rewind'}
                aria-label={isRewinding ? 'Stop rewind' : 'Rewind'}
                aria-pressed={isRewinding}
                className={styles.rewindButton}
                onClick={handleRewind}
                disabled={!canRewind}
              >
                <IoPlayBackSharp size={16} aria-hidden />
              </button>
            </div>
            <div
              className={styles.segmentControls}
              role="group"
              aria-label="Segment playback controls"
            >
              <button
                type="button"
                title="Previous segment"
                aria-label="Previous segment"
                className={styles.segmentButton}
                onClick={handlePreviousSegment}
                disabled={!canGoPrevious}
              >
                <IoPlaySkipBackSharp size={18} aria-hidden />
              </button>
              <button
                type="button"
                title={isMoving ? 'Pause' : 'Play'}
                aria-label={isMoving ? 'Pause' : 'Play'}
                className={styles.playPauseButton}
                onClick={isMoving ? handlePause : handlePlay}
                disabled={!isLoaded}
              >
                {isMoving ? (
                  <IoPauseSharp size={22} aria-hidden />
                ) : (
                  <IoPlaySharp size={22} aria-hidden />
                )}
              </button>
              <button
                type="button"
                title="Next segment"
                aria-label="Next segment"
                className={styles.segmentButton}
                onClick={handleNextSegment}
                disabled={!canGoNext}
              >
                <IoPlaySkipForwardSharp size={18} aria-hidden />
              </button>
            </div>
            <div className={styles.transportBalance} aria-hidden />
          </div>
        </div>
      )}
    </section>
  );
});

export default Demo;
