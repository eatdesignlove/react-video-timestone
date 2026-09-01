import { useRef } from 'react';
import { Features, Footer, Header, Hero, PackageGuide } from './ui';
import * as styles from './demo-app.css';

function DemoApp() {
  const demoSectionRef = useRef<HTMLElement | null>(null);

  const scrollToDemo = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    demoSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className={styles.container}>
      <Header />
      <Hero onGetStarted={scrollToDemo} demoSectionRef={demoSectionRef} />
      <Features />
      <PackageGuide />
      <Footer />
    </div>
  );
}

export default DemoApp;
