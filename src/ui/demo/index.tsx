import { useRef, useState, useEffect, forwardRef } from 'react';
import cx from 'classnames';
import { IoPauseSharp, IoPlayBackSharp, IoPlaySharp } from 'react-icons/io5';
import { VideoTimestone, TimelineRef, MARKER_DIRECTION } from '../../../lib';
import * as styles from './demo.css';

const PLAY_STATE = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  REWIND: 'REWIND',
} as const;

const Demo = forwardRef<HTMLElement>((_, ref) => {
  const timelineRef = useRef<TimelineRef>(null);
  const trackRef = useRef<HTMLDivElement>(null); // 추가
  const [playState, setPlayState] = useState<keyof typeof PLAY_STATE>(
    PLAY_STATE.PLAY
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

  // 화면 크기에 따른 비디오 선택 (초기에만)
  const [videoUrl] = useState(() => {
    return window.innerWidth < 769 ? '/demo2-mobile.mp4' : '/demo2.mp4';
  });

  const handlePlay = () => {
    timelineRef.current?.play();
  };

  const handlePause = () => {
    timelineRef.current?.pause();
  };

  const handleRewind = () => {
    timelineRef.current?.rewind();
  };

  const handleSeekTo = (time: number) => {
    timelineRef.current?.seekTo({
      time,
      autoPlay:
        playState === PLAY_STATE.PLAY || playState === PLAY_STATE.REWIND,
    });
    setCurrentTime(timelineRef.current?.videoElement?.currentTime || 0);
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
      direction: MARKER_DIRECTION.FORWARD,
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

  // 현재 재생 시간 추적
  useEffect(() => {
    if (playState === PLAY_STATE.PAUSE || !videoDuration) return;

    const interval = setInterval(() => {
      setCurrentTime(timelineRef.current?.videoElement?.currentTime || 0);
    }, 100); // 100ms마다 업데이트

    return () => clearInterval(interval);
  }, [playState, videoDuration]);

  // container 위에서 마우스 움직였을 때 controlContainer 표시되었다가, 5초이상 움직임 없으면 숨기기

  return (
    <section ref={ref} id="demo-section" className={styles.container}>
      <div className={styles.heroVideoBackground}>
        {!isLoaded && (
          <div className={styles.heroLoadingOverlay}>
            <div className={styles.heroLoadingContent}>
              <div className={styles.heroProgressBar}>
                <div
                  className={styles.heroProgressFill}
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <span>영상 로딩 중... {Math.round(loadingProgress)}%</span>
            </div>
          </div>
        )}
        <VideoTimestone
          ref={timelineRef}
          className={styles.heroBackgroundVideo}
          videoUrls={[videoUrl]}
          markers={subtitleMarkers}
          onLoading={progress => setLoadingProgress(progress)}
          onLoaded={() => setIsLoaded(true)}
          onStateChange={({ isPlaying, isRewind }) => {
            setPlayState(
              isPlaying
                ? isRewind
                  ? PLAY_STATE.REWIND
                  : PLAY_STATE.PLAY
                : PLAY_STATE.PAUSE
            );
          }}
          onReady={() => {
            setTimeout(() => {
              const videoElement = document.querySelector('video');
              if (videoElement && videoElement.duration) {
                setVideoDuration(videoElement.duration);
              }
              // 히어로 영상 자동 재생 시작
              timelineRef.current?.play();
            }, 500);
          }}
        />
      </div>
      <div className={cx(styles.controlGroup, isLoaded && 'active')}>
        <button
          title="Rewind"
          className={cx(
            styles.controlButton,
            playState === PLAY_STATE.REWIND && 'active'
          )}
          onClick={handleRewind}
          disabled={playState === PLAY_STATE.REWIND}
        >
          <IoPlayBackSharp size={16} />
        </button>
        <button
          title="Pause"
          className={cx(
            styles.controlButton,
            playState === PLAY_STATE.PAUSE && 'active'
          )}
          onClick={handlePause}
          disabled={playState === PLAY_STATE.PAUSE}
        >
          <IoPauseSharp size={16} />
        </button>
        <button
          title="Play"
          className={cx(
            styles.controlButton,
            playState === PLAY_STATE.PLAY && 'active'
          )}
          onClick={handlePlay}
          disabled={playState === PLAY_STATE.PLAY}
        >
          <IoPlaySharp size={16} />
        </button>
      </div>
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
            .filter(marker => marker.time > 0 && marker.time < videoDuration)
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
        <div className={styles.progressTime}>{formatTime(videoDuration)}</div>
      </div>
      {currentSubtitle && (
        <div className={styles.subtitleContainer}>
          <p className={styles.subtitleText}>{currentSubtitle}</p>
        </div>
      )}
    </section>
  );
});

export default Demo;
