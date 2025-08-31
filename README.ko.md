[EN](README.md) | **KO**

# React Video Timestone

버퍼링 끊김 없이 즉시 탐색을 통해 매끄러운 멀티 비디오 타임라인 경험을 제공하는 React 컴포넌트 라이브러리입니다.

## 왜 필요한가

인터랙티브 비디오 스토리텔링을 구현할 때마다 특정 시점 이벤트, 역재생, 멀티 비디오 연결 등의 복잡한 로직을 반복해서 개발해야 합니다. 기존 HTML5 비디오만으로는 매끄러운 스토리텔링 경험을 만들기 어렵고, 매번 비슷한 기능을 새로 구현하느라 핵심 스토리텔링에 집중하기 어려운 상황에 대한 문제의식으로 만들게 되었습니다.

## 해결책

React Video Timestone은 스토리텔링에 필요한 비디오 컨트롤 기능을 하나의 컴포넌트로 제공합니다:

1. **즉시 사용 가능한 타임라인**: 여러 비디오를 연결한 매끄러운 스토리텔링
2. **인터랙티브 마커 시스템**: 특정 시점에서 자동으로 콜백 실행 및 제어
3. **버퍼링 없는 즉시 탐색**: 사전 로딩 및 Blob 캐싱을 이용한 끊김 없는 탐색 경험
4. **재생/역재생/특정 시점 이동**: 정방향 및 역방향 재생을 간단한 API로 제어
5. **일관된 개발 경험**: 동일한 방식으로 모든 인터랙티브 비디오 구현

## 언제 사용하면 좋을까

✅ **이런 경우에 적합:**

- 짧지만 흐름이 중요한 영상을 활용한 스토리텔링
- 복수의 비디오를 연결한 스토리텔링
- 재생/역재생이 중요한 인터페이스
- 특정 시점에서 상호작용이 필요한 경험

❌ **이런 경우에는 부적합:**

- 단일 비디오 단순 재생 (일반 video 태그로 충분)
- 매우 긴 비디오 콘텐츠 (메모리 사용량 증가)
- 스트리밍이 필요한 실시간 콘텐츠

## 기술적 고려사항

### 장점

- 버퍼링 없는 재생
- 재생/역재생의 매끄러운 경험
- 마커 시스템을 통한 상호작용

### 한계점

- **메모리 사용**: 모든 비디오를 blob으로 메모리에 캐싱
- **초기 로딩**: 모든 비디오를 사전 로딩하므로 초기 지연
- **파일 크기**: GOP-1 최적화 시 파일 크기 증가

## 설치

```bash
npm install react-video-timestone
```

## 빠른 시작

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
        console.log('현재 시간:', currentTime, '상태:', playerState);
      }}
    />
  );
}
```

## 사용 예제

### 기본 멀티 비디오 타임라인

```jsx
function VideoExample() {
  const [isLoading, setIsLoading] = useState(true);
  const [canPlay, setCanPlay] = useState(false);

  return (
    <VideoTimestone
      videoUrls={['/intro.mp4', '/main.mp4', '/outro.mp4']}
      controls
      onLoading={progress => console.log(`다운로드 중: ${progress}%`)}
      onLoaded={() => {
        console.log('다운로드 완료');
        setIsLoading(false);
      }}
      onReady={() => {
        console.log('재생 준비 완료');
        setCanPlay(true);
      }}
    />
  );
}
```

### 마커가 있는 인터랙티브 타임라인

```jsx
<VideoTimestone
  videoUrls={['/story.mp4']}
  markers={[
    {
      time: 5,
      label: '선택 지점',
      action: MARKER_ACTION.PAUSE,
      callback: () => showChoiceDialog(),
    },
    {
      time: 10,
      label: '역재생 포인트',
      direction: MARKER_DIRECTION.BACKWARD,
    },
  ]}
  onStateChange={({ playerState, currentTime }) => {
    console.log(`상태: ${playerState}, 시간: ${currentTime}`);
  }}
/>
```

### Ref를 통한 외부 제어

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
      <button onClick={() => timelineRef.current?.play()}>재생</button>
      <button onClick={() => timelineRef.current?.pause()}>일시정지</button>
      <button
        onClick={() =>
          timelineRef.current?.seekTo({ time: 10, autoPlay: true })
        }
      >
        10초로 이동
      </button>
    </>
  );
}
```

## 비디오 준비

최적의 성능을 위해 비디오는 다음과 같이 인코딩되어야 합니다:

- **GOP 크기**: 1 (각 프레임이 키프레임)
- **포맷**: H.264를 사용한 MP4
- **길이**: 사용 목적에 따라 적절히 설정
- **해상도**: 표시 요구사항에 맞게 설정
- **모바일**: 성능 최적화를 위해 모바일용 영상을 별도 준비하는 것을 권장

FFmpeg 명령어 예제:

```bash
# 기본 GOP-1 변환
ffmpeg -i input.mp4 -g 1 output-gop1.mp4

# 품질 조정이 필요한 경우
ffmpeg -i input.mp4 -g 1 -c:v libx264 -crf 23 output-gop1.mp4
```

## API 레퍼런스

### VideoTimestone Props

- `videoUrls` (string[]): 재생할 비디오 URL 배열 (필수)
- `markers?` (Marker[]): 타임라인 마커 배열
- `speed?` (number): 재생 속도 (기본값: 1)
- `controls?` (boolean): 기본 컨트롤 표시 여부
- `fullScreen?` (boolean): 풀스크린 모드
- `className?` (string): 커스텀 CSS 클래스
- `posters?` (string[]): 각 비디오의 포스터 이미지 배열
- `onLoading?` ((progress: number) => void): 비디오 다운로드 진행률 콜백 (0-100)
- `onLoaded?` (() => void): 모든 비디오 다운로드 및 blob 변환 완료 시 호출
- `onReady?` (() => void): 비디오 엘리먼트 로딩 완료 후 실제 재생 가능 상태가 되면 호출
- `onStateChange?` ((state) => void): 상태 변경 콜백

### Marker 타입

```typescript
// 편리한 상수들
export const MARKER_DIRECTION = {
  FORWARD: 'FORWARD',
  BACKWARD: 'BACKWARD',
  BOTH: 'BOTH',
} as const;

export const MARKER_ACTION = {
  CONTINUE: 'CONTINUE',
  PAUSE: 'PAUSE',
} as const;

// 마커 타입
type MarkerDirection = (typeof MARKER_DIRECTION)[keyof typeof MARKER_DIRECTION];
type MarkerAction = (typeof MARKER_ACTION)[keyof typeof MARKER_ACTION];

type Marker = {
  videoIndex?: number; // 비디오 인덱스 (기본값: 0)
  label: string; // 마커 라벨
  time: number; // 마커 시간 (초)
  action?: MarkerAction; // 마커 액션 (기본값: 'CONTINUE')
  direction?: MarkerDirection; // 방향
  callback?: () => void; // 콜백 함수
};
```

### Ref 메서드

```typescript
type TimelineRef = {
  videoElement: HTMLVideoElement | undefined; // 비디오 엘리먼트
  play: () => void; // 재생
  pause: () => void; // 일시정지
  rewind: () => void; // 역재생
  seekTo: ({ time, autoPlay }) => void; // 특정 시점 이동
};
```

## 기여

기여를 환영합니다! 자세한 내용은 [기여 가이드](CONTRIBUTING.md)를 참조해주세요.

## 라이선스

MIT © [eatdesignlove](https://github.com/eatdesignlove)
