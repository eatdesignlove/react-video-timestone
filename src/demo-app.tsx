import { useRef } from 'react';
import { Features, Footer, Header, Hero, PackageGuide } from './ui';
import * as styles from './demo-app.css';

function DemoApp() {
  const demoSectionRef = useRef<HTMLElement | null>(null);

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
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
