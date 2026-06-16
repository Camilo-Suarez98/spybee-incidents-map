import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { ChevronDownIcon } from "../icons";
import styles from "./Field.module.scss";

interface FieldShellProps {
  label?: string;
  required?: boolean;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}

function FieldShell({ label, required, error, htmlFor, children }: FieldShellProps) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function TextField({ label, error, id, required, ...rest }: TextFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} htmlFor={id}>
      <input
        id={id}
        className={`${styles.control} ${error ? styles.invalid : ""}`}
        {...rest}
      />
    </FieldShell>
  );
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, id, required, ...rest }: TextAreaProps) {
  return (
    <FieldShell label={label} required={required} error={error} htmlFor={id}>
      <textarea
        id={id}
        className={`${styles.control} ${styles.textarea} ${
          error ? styles.invalid : ""
        }`}
        {...rest}
      />
    </FieldShell>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export function SelectField({
  label,
  error,
  id,
  required,
  options,
  placeholder,
  ...rest
}: SelectFieldProps) {
  return (
    <FieldShell label={label} required={required} error={error} htmlFor={id}>
      <div className={styles.selectWrap}>
        <select
          id={id}
          className={`${styles.control} ${styles.select} ${
            error ? styles.invalid : ""
          }`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.chevron}>
          <ChevronDownIcon width={18} height={18} />
        </span>
      </div>
    </FieldShell>
  );
}
