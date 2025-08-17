import * as styles from './hero.css';

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Master Time, <br />
          Just Like Doctor Strange
        </h1>
        <p className={styles.description}>
          Shape time. Design moments.
          <br /> Make your interactive web experience truly extraordinary.
        </p>
        <button className={styles.button}>Get Started</button>
      </div>
    </section>
  );
}
