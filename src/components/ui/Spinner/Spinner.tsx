import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: number;
  label?: string;
}

export function Spinner({ size = 28, label }: SpinnerProps) {
  return (
    <div className={styles.wrap} role="status">
      <span
        className={styles.spinner}
        style={{ width: size, height: size }}
      />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
