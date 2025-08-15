import { useContext } from 'react';
import { IVideoControlProps } from '../../types';
import { VideoTimelineContext } from '../../model/video-timestone-context';
import * as styles from './video-control.css.ts';

export default function VideoControl({
  onPlay,
  onPause,
  onRewind,
}: IVideoControlProps) {
  const timelineState = useContext(VideoTimelineContext);
  return (
    <div className={styles.container}>
      <p className={styles.playDirection}>{timelineState?.playDirection}</p>
      <div className={styles.controlButtons}>
        <button className={styles.controlButton} type="button" onClick={onPlay}>
          Play
        </button>
        <button
          className={styles.controlButton}
          type="button"
          onClick={onPause}
        >
          Pause
        </button>
        <button
          className={styles.controlButton}
          type="button"
          onClick={onRewind}
        >
          Rewind
        </button>
      </div>
    </div>
  );
}
