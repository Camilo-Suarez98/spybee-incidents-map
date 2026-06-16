import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tone?: "default" | "light";
  active?: boolean;
  children: ReactNode;
}

export function IconButton({
  label,
  tone = "default",
  active = false,
  className,
  children,
  type = "button",
  ...rest
}: IconButtonProps) {
  const classes = [
    styles.iconButton,
    styles[tone],
    active ? styles.active : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  );
}
