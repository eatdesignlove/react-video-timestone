import { useRef, useState, useEffect } from 'react';
import { VideoTimeline, TimelineRef } from '../lib';
import * as styles from './demo-app.css';
import { Header } from './ui';
import Hero from './ui/hero';

function DemoApp() {
  const timelineRef = useRef<TimelineRef>(null);
  const multiTimelineRef = useRef<TimelineRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>('');

  const handlePlay = () => {
    timelineRef.current?.play();
    // isPlaying 상태는 onStateChange에서 자동으로 업데이트됨
  };

  const handlePause = () => {
    timelineRef.current?.pause();
    // isPlaying 상태는 onStateChange에서 자동으로 업데이트됨
  };

  const handleRewind = () => {
    timelineRef.current?.rewind();
    // isPlaying 상태는 onStateChange에서 자동으로 업데이트됨
  };

  const handleSeekTo = (time: number) => {
    timelineRef.current?.seekTo({ time, autoPlay: isPlaying });
  };

  // 시간 포맷팅 함수
  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 자막 마커들 (실제 자막 분석 기반)
  const subtitleMarkers = [
    {
      time: 1.03,
      label: 'dialogue-1',
      callback: () =>
        setCurrentSubtitle(
          '여기 오느라 마지막 돈까지 썼어요. 표를 구했고, 당신은 믿음으로 치유된다고 말하네요.'
        ),
    },
    {
      time: 7.09,
      label: 'dialogue-2',
      callback: () =>
        setCurrentSubtitle(
          '당신은 열쇠구멍을 통해 세상을 보는 사람이에요. 평생 그 열쇠구멍을 넓히려 애썼죠. 더 많이 보고, 더 많이 알기 위해서요. 그리고 이제, 그 열쇠구멍이 상상도 못할 방식으로 넓어질 수 있다는 말을 듣고도, 그 가능성을 거부하네요.'
        ),
    },
    {
      time: 21.07,
      label: 'dialogue-3',
      callback: () =>
        setCurrentSubtitle(
          '저는 차크라나 에너지, 믿음의 힘 같은 동화는 믿지 않으니까요. 영혼 같은 건 없어요. 우리는 그저 물질로 이루어졌을 뿐이에요. 당신도 무관심한 우주 속의 작은 먼지일 뿐이죠.'
        ),
    },
    {
      time: 37.23,
      label: 'dialogue-4',
      callback: () => setCurrentSubtitle('당신은 자신을 너무 과소평가해요.'),
    },
    {
      time: 39.09,
      label: 'dialogue-5',
      callback: () =>
        setCurrentSubtitle(
          '아, 내가 투명인간처럼 보인다고요? 아니에요, 당신은 저를 꿰뚫어보지 못해요. 하지만 저는 당신을 꿰뚫어봤죠.'
        ),
    },
    {
      time: 63.04,
      label: 'dialogue-6',
      callback: () =>
        setCurrentSubtitle(
          '지금 저한테 무슨 짓을 한 거예요? 당신의 아스트랄 형태를 육체에서 분리시켰어요.'
        ),
    },
    {
      time: 67.12,
      label: 'dialogue-7',
      callback: () => setCurrentSubtitle('차에 뭐가 들어있죠? 실로시빈? LSD?'),
    },
    {
      time: 70.23,
      label: 'dialogue-8',
      callback: () => setCurrentSubtitle('그냥 차예요. 꿀을 조금 넣었죠.'),
    },
    {
      time: 75.0,
      label: 'clear',
      callback: () => setCurrentSubtitle(''),
    },
  ];

  // 현재 재생 시간 추적
  useEffect(() => {
    if (!isPlaying || !videoDuration) return;

    const interval = setInterval(() => {
      const videoElement = document.querySelector('video');
      if (videoElement) {
        setCurrentTime(videoElement.currentTime);
      }
    }, 100); // 100ms마다 업데이트

    return () => clearInterval(interval);
  }, [isPlaying, videoDuration]);

  return (
    <div className={styles.container}>
      <Header />
      {/* 히어로 섹션 */}
      <Hero />

      <main className={styles.main}>
        {/* 여러 영상 전환 데모 */}
        <section className={styles.demoSection}>
          <h3 className={styles.sectionTitle}>
            🎬 끊김 없는 멀티 비디오 타임라인
          </h3>
          <div className={styles.videoContainer}>
            <VideoTimeline
              ref={multiTimelineRef}
              className={styles.video}
              videoUrls={['/demo2.mp4', '/demo_original.mp4']}
              markers={[
                {
                  time: 2.0,
                  videoIndex: 0,
                  label: 'first-video-info',
                  callback: () => console.log('첫 번째 영상 재생 중'),
                },
                {
                  time: 1.5,
                  videoIndex: 1,
                  label: 'second-video-info',
                  callback: () => console.log('두 번째 영상으로 전환됨'),
                },
              ]}
              onReady={() => console.log('멀티 영상 준비 완료')}
            />
            <div className={styles.videoOverlay}>
              <div className={styles.overlayContent}>
                <h2 className={styles.overlayTitle}>
                  Automatic Video Transitions ✨
                </h2>
                <p style={{ color: '#fff', opacity: 0.9 }}>
                  첫 번째 비디오가 끝나면 자동으로 다음 비디오로 seamless
                  전환됩니다
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 기술적 장점 섹션 */}
        <section className={styles.codeSection}>
          <h3 className={styles.codeSectionTitle}>🛠️ 4가지 핵심 기능 구현</h3>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>
                🚀 프리로드 기반 무버퍼링 재생
              </h4>
              <p className={styles.featureCardText}>
                Blob URL을 이용해 모든 비디오를 미리 로드하여 중요한 순간에 끊김
                없는 경험을 제공합니다
              </p>
              <pre className={styles.miniCode}>
                {`// 실시간 로딩 진행률
onLoading: (progress) => {
  setProgress(progress); // 0-100%
}`}
              </pre>
            </div>

            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>
                📍 마커 기반 이벤트 처리
              </h4>
              <p className={styles.featureCardText}>
                복잡한 타이밍 로직 없이 선언적 API로 정확한 순간의 UI 동기화를
                구현합니다
              </p>
              <pre className={styles.miniCode}>
                {`// 간단한 마커 정의
markers={[
  { time: 1.5, callback: () => showText() },
  { time: 3.0, callback: () => showButton() }
]}`}
              </pre>
            </div>

            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>
                🎬 Multi-Video Timeline
              </h4>
              <p className={styles.featureCardText}>
                여러 비디오를 하나의 연속된 스토리로 관리하여 끊김 없는 seamless
                전환을 구현합니다
              </p>
              <pre className={styles.miniCode}>
                {`// 다중 영상 자동 전환
videoUrls={[
  '/intro.mp4',
  '/main.mp4', 
  '/outro.mp4'
]}`}
              </pre>
            </div>

            <div className={styles.featureCard}>
              <h4 className={styles.featureCardTitle}>⏯️ 역재생 처리</h4>
              <p className={styles.featureCardText}>
                HTML5 video로는 구현하기 어려운 부드러운 역재생을
                RequestAnimationFrame으로 처리합니다
              </p>
              <pre className={styles.miniCode}>
                {`// 간단한 역재생 제어
timelineRef.current?.reverse();

// 또는 프로그래매틱 제어
timelineRef.current?.seekTo({ 
  time: 5.0, 
  autoPlay: true 
});`}
              </pre>
            </div>
          </div>

          <div className={styles.architectureSection}>
            <h4 className={styles.architectureTitle}>⚙️ Quick Start Guide</h4>
            <pre className={styles.codeExample}>
              {`// 1. Install package
npm install react-video-timestone

// 2. Basic usage
import { VideoTimeline } from 'react-video-timestone';

<VideoTimeline
  videoUrls={['/video1.mp4', '/video2.mp4']}
  markers={[
    { time: 1.5, type: 'pause', triggerPause: () => showUI() },
    { time: 3.0, callback: () => console.log('marker reached') }
  ]}
  onLoading={(progress) => setProgress(progress)}
  onReady={() => console.log('ready to play')}
/>`}
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DemoApp;

// const DemoSection = () => {
//   return (
//     <section className={styles.heroSection}>
//       <div className={styles.heroVideoBackground}>
//         {!isLoaded && (
//           <div className={styles.heroLoadingOverlay}>
//             <div className={styles.heroLoadingContent}>
//               <div className={styles.heroProgressBar}>
//                 ㅑ
//                 <div
//                   className={styles.heroProgressFill}
//                   style={{ width: `${loadingProgress}%` }}
//                 />
//               </div>
//               <span>영상 로딩 중... {Math.round(loadingProgress)}%</span>
//             </div>
//           </div>
//         )}
//         <VideoTimeline
//           ref={timelineRef}
//           className={styles.heroBackgroundVideo}
//           videoUrls={['/demo2.mp4']}
//           markers={subtitleMarkers}
//           onLoading={progress => setLoadingProgress(progress)}
//           onLoaded={() => setIsLoaded(true)}
//           onReady={() => {
//             setTimeout(() => {
//               const videoElement = document.querySelector('video');
//               if (videoElement && videoElement.duration) {
//                 setVideoDuration(videoElement.duration);
//               }
//               // 히어로 영상 자동 재생 시작
//               timelineRef.current?.play();
//             }, 500);
//           }}
//           onStateChange={({ isPlaying }) => setIsPlaying(isPlaying)}
//         />
//       </div>

//       <div className={styles.heroOverlay}>
//         <div className={styles.heroContent}>
//           <div className={styles.heroText}>
//             <h1 className={styles.heroTitle}>
//               React Video
//               <span className={styles.gradientText}>Timestone</span>
//             </h1>
//             <p className={styles.heroSubtitle}>
//               직접 만들려면 번거로운 비디오 기능들을 간단한 API로 제공합니다.
//             </p>
//             <div className={styles.heroFeatures}>
//               <div className={styles.featureBadge}>⏯️ 부드러운 역재생</div>
//               <div className={styles.featureBadge}>🚀 버퍼링 없는 재생</div>
//               <div className={styles.featureBadge}>🎬 멀티 비디오 타임라인</div>
//               <div className={styles.featureBadge}>📍 정밀한 마커 이벤트</div>
//             </div>

//             {/* 프로그래매틱 제어 */}
//             <div className={styles.syncIndicator}>
//               <h4 className={styles.heroControlsTitle}>⏯️ 직접 제어해보세요</h4>
//               <div className={styles.controlGroup}>
//                 <button
//                   className={styles.controlButton}
//                   onClick={handlePlay}
//                   disabled={isPlaying}
//                 >
//                   ▶️ 재생
//                 </button>
//                 <button
//                   className={styles.controlButton}
//                   onClick={handlePause}
//                   disabled={!isPlaying}
//                 >
//                   ⏸️ 일시정지
//                 </button>
//                 <button className={styles.controlButton} onClick={handleRewind}>
//                   ⏪ 리와인드
//                 </button>
//               </div>

//               <div className={styles.progressSection}>
//                 <span className={styles.controlLabel}>빠른 이동:</span>
//                 <div className={styles.progressContainer}>
//                   <div className={styles.progressTrack}>
//                     {/* 현재 재생 위치 표시 */}
//                     <div
//                       className={styles.progressPlaybackFill}
//                       style={{
//                         width: videoDuration
//                           ? `${(currentTime / videoDuration) * 100}%`
//                           : '0%',
//                       }}
//                     />

//                     {/* 자막 마커들 표시 */}
//                     {subtitleMarkers
//                       .filter(
//                         marker => marker.time > 0 && marker.time < videoDuration
//                       )
//                       .map((marker, index) => (
//                         <div
//                           key={`subtitle-marker-${index}`}
//                           className={styles.subtitleMarker}
//                           style={{
//                             left: `${(marker.time / videoDuration) * 100}%`,
//                           }}
//                           title={`자막 ${index + 1}: ${formatTime(marker.time)}`}
//                         />
//                       ))}

//                     <div
//                       className={styles.progressMarker}
//                       style={{ left: '33.33%' }}
//                       onClick={() => handleSeekTo(videoDuration / 3)}
//                       title="1/3 지점"
//                     />
//                     <div
//                       className={styles.progressMarker}
//                       style={{ left: '50%' }}
//                       onClick={() => handleSeekTo(videoDuration / 2)}
//                       title="1/2 지점"
//                     />
//                     <div
//                       className={styles.progressMarker}
//                       style={{ left: '66.66%' }}
//                       onClick={() => handleSeekTo((videoDuration * 2) / 3)}
//                       title="2/3 지점"
//                     />
//                   </div>
//                   {/* 시간 표시 */}
//                   <div className={styles.progressTimeDisplay}>
//                     <span>{formatTime(currentTime)}</span>
//                     <span>{formatTime(videoDuration)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* 자막 표시 */}
//       {currentSubtitle && (
//         <div
//           className={
//             styles.subtitleContainer + ' ' + styles.heroSubtitlePosition
//           }
//         >
//           <p className={styles.subtitleText}>{currentSubtitle}</p>
//         </div>
//       )}
//     </section>
//   );
// };
