import { Features, Header, Hero } from './ui';
import * as styles from './demo-app.css';

function DemoApp() {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <Features />

      <main className={styles.main}>
        {/* 여러 영상 전환 데모 */}
        <section className={styles.demoSection}>
          <h3 className={styles.sectionTitle}>
            🎬 끊김 없는 멀티 비디오 타임라인
          </h3>
          <div className={styles.videoContainer}>
            {/* <VideoTimeline
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
            /> */}
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
