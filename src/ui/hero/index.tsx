import { RefObject } from 'react';
import Demo from '../demo';
import * as styles from './hero.css';

interface HeroProps {
  onGetStarted: () => void;
  demoSectionRef: RefObject<HTMLElement | null>;
}

export default function Hero({ onGetStarted, demoSectionRef }: HeroProps) {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Master Time, <br />
          <span className={styles.titleAccent}>Just Like Doctor Strange</span>
        </h1>
        <p className={styles.description}>
          Shape time. Design moments.
          <br /> Make your interactive web experience truly extraordinary.
        </p>
        <button type="button" className={styles.button} onClick={onGetStarted}>
          Get Started
        </button>
      </div>
      <div className={styles.demoContainer}>
        <div className={styles.demoFrame}>
          <Demo ref={demoSectionRef} />
        </div>
      </div>
    </section>
  );
}
