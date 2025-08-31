import { FaNpm, FaGithub } from 'react-icons/fa';
import * as styles from './header.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.logo}>React Video Timestone</h1>
      <div className={styles.packageLinks}>
        <a
          className={styles.link}
          href="https://www.npmjs.com/package/react-video-timestone"
        >
          <FaNpm size={24} style={{ transform: 'Scale(1.5)' }} />
        </a>
        <a
          className={styles.link}
          href="https://github.com/eatdesignlove/react-video-timestone"
        >
          <FaGithub size={24} />
          Github
        </a>
      </div>
    </header>
  );
}
