import { FaNpm, FaGithub } from 'react-icons/fa';
import * as styles from './header.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.inner}>
        <span className={styles.logo}>React Video Timestone</span>
        <nav className={styles.packageLinks}>
          <a
            className={styles.link}
            href="https://www.npmjs.com/package/react-video-timestone"
            target="_blank"
            rel="noreferrer"
            aria-label="react-video-timestone on npm"
          >
            <FaNpm size={28} aria-hidden />
          </a>
          <a
            className={styles.link}
            href="https://github.com/eatdesignlove/react-video-timestone"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub size={16} aria-hidden />
            Github
          </a>
        </nav>
      </div>
    </header>
  );
}
