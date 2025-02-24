import styles from './maintenance.module.css';

export default function MaintenancePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Site en Maintenance</h1>
      <p className={styles.message}>
        Notre site est actuellement en maintenance pour des mises à jour importantes . 
      </p>
      <p className={styles.message}>
        Il sera à nouveau disponible dans peu de temps.
      </p>
      <p className={styles.message}>Merci de votre compréhension !</p>
    </div>
  );
}
