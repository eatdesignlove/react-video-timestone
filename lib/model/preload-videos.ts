async function getTotalVideoSize(urls: string[]) {
  const response = await Promise.all(
    urls.map(url => fetch(url, { method: 'HEAD' }))
  );
  const contentLengths = response.map(res => res.headers.get('content-length'));
  return contentLengths.reduce((acc, length) => acc + Number(length), 0);
}

export const preloadVideos = async ({
  urls,
  onProgress,
  onReady,
}: {
  urls: string[];
  onProgress?: (progress: number) => void;
  onReady?: (blobUrls: string[]) => void;
}) => {
  // 1. 비디오 전체 크기 확인
  let progress = 0;
  const totalSize = await getTotalVideoSize(urls);

  // 2. 비디오 다운로드 (TODO: 성능에 따라 처음 다운로드할 영상 개수 제어 -> playIndex 상태에 따라 나머지 부분 추가 로드)
  // - urls 기준으로 loadedProgress 배열 구성
  // - 각 인덱스에 따라 비디오 다운로드 및 loadedProgress 업데이트
  // - onProgress 함수 호출. 동일하게 처리하되 progress 넘기는 값은 전체 progress 값 합산해서 처리
  const loadedSizes: number[] = urls.map(() => 0);
  const responses = await Promise.all(
    urls.map(async (url, idx) => await loadVideoWithStream(url, idx))
  );

  async function loadVideoWithStream(url: string, idx: number) {
    const targetUrl = url;
    const response = await fetch(targetUrl, { method: 'GET' });
    const stream = new Response(
      new ReadableStream({
        start(controller) {
          const reader = response.body?.getReader();
          readStream();

          function readStream() {
            reader?.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              loadedSizes[idx] =
                (loadedSizes?.[idx] ?? 0) + (value?.byteLength ?? 0);
              progress =
                (loadedSizes.reduce((acc, size) => acc + size, 0) / totalSize) *
                100;

              if (onProgress) {
                onProgress(progress);
              }

              controller.enqueue(value);
              readStream();
            });
          }
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'video/mp4',
        },
      }
    );

    return await stream.blob();
  }

  // 3. blob 목록 반환
  const blobUrls = responses.map(res => URL.createObjectURL(res));

  if (onReady) {
    onReady(blobUrls);
  }

  return {
    blobUrls,
    cleanup: () => {
      blobUrls.forEach(res => URL.revokeObjectURL(res));
    },
  };
};
