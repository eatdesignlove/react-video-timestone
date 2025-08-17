import { Features, Footer, Header, Hero, PackageGuide } from './ui';
import * as styles from './demo-app.css';

function DemoApp() {
  return (
    <div className={styles.container}>
      <Header />
      <Hero />
      <Features />
      <PackageGuide />
      <Footer />
    </div>
  );
}

export default DemoApp;
