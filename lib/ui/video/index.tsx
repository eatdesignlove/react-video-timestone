import { memo } from 'react';
import { IVideoProps } from '../../types';
import * as styles from './video.css';

const Video = memo(
  function Video({ ref, url, loop, poster, onLoadedData }: IVideoProps) {
    return (
      <div className={styles.container}>
        <video
          className={styles.video}
          key={url}
          src={url}
          ref={ref}
          loop={loop}
          onLoadedData={onLoadedData}
          muted
          playsInline
          preload="metadata"
          poster={poster}
        />
        {poster && (
          <div
            className={styles.fakePoster}
            style={{ backgroundImage: `url(${poster})` }}
          />
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.url === nextProps.url && prevProps.poster === nextProps.poster
    );
  }
);

export default Video;
