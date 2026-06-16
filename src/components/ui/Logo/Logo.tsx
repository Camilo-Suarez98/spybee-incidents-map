import styles from "./Logo.module.scss";

interface LogoProps {
  tone?: "light" | "dark";
  showWordmark?: boolean;
  size?: number;
}

export function Logo({ tone = "dark", showWordmark = true, size = 26 }: LogoProps) {
  return (
    <span className={`${styles.logo} ${styles[tone]}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M16 2.5 27.6 9v14L16 29.5 4.4 23V9L16 2.5Z"
          fill="#fab915"
        />
        <path
          d="M16 9.5c3.4 0 6 1.7 6 4.2 0 1.7-1.2 3-3 3.6 2.2.5 3.6 1.9 3.6 3.9 0 2.8-2.8 4.6-6.6 4.6s-6.6-1.8-6.6-4.6c0-2 1.4-3.4 3.6-3.9-1.8-.6-3-1.9-3-3.6 0-2.5 2.6-4.2 6-4.2Z"
          fill="#1d1300"
        />
      </svg>
      {showWordmark && <span className={styles.wordmark}>Spybee</span>}
    </span>
  );
}
