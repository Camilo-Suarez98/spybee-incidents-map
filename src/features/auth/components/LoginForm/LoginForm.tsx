"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Avatar } from "@/components/ui/Avatar";
import { TextField } from "@/components/ui/Field";
import { ChevronRightIcon } from "@/components/ui/icons";
import { useAuthStore } from "../../store";
import { DEMO_ACCOUNTS } from "../../users";
import { useT } from "@/i18n";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const router = useRouter();
  const t = useT();
  const signIn = useAuthStore((state) => state.signIn);
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/map");
    }
  }, [hydrated, user, router]);

  const authenticate = async (nextEmail: string, nextPassword: string) => {
    setError(null);
    setLoading(true);
    const result = await signIn(nextEmail, nextPassword);
    setLoading(false);
    setPendingEmail(null);
    if (!result.ok) {
      setError(result.message ?? t.auth.signInError);
      return;
    }
    router.replace("/map");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    authenticate(email, password);
  };

  const chooseAccount = (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail);
    setPassword(accountPassword);
    setPendingEmail(accountEmail);
    authenticate(accountEmail, accountPassword);
  };

  return (
    <div className={styles.screen}>
      <section className={styles.panel}>
        <div className={styles.brand}>
          <Logo size={30} />
        </div>

        <div className={styles.heading}>
          <h1>{t.auth.welcome}</h1>
          <p>{t.auth.welcomeSubtitle}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <TextField
            id="email"
            label={t.auth.emailLabel}
            type="email"
            autoComplete="email"
            placeholder={t.auth.emailPlaceholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <TextField
            id="password"
            label={t.auth.passwordLabel}
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <p className={styles.error}>{error}</p>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading && !pendingEmail ? t.auth.signingIn : t.auth.signIn}
          </Button>
        </form>

        <div className={styles.accounts}>
          <span className={styles.accountsLabel}>{t.auth.demoLabel}</span>
          <ul className={styles.accountList}>
            {DEMO_ACCOUNTS.map((account) => (
              <li key={account.id}>
                <button
                  type="button"
                  className={styles.account}
                  onClick={() => chooseAccount(account.email, account.password)}
                  disabled={loading}
                >
                  <Avatar person={account} size={38} />
                  <span className={styles.accountInfo}>
                    <span className={styles.accountName}>{account.name}</span>
                    <span className={styles.accountRole}>
                      {t.roles[account.role] ?? account.role}
                    </span>
                  </span>
                  {pendingEmail === account.email ? (
                    <span className={styles.accountSpinner} />
                  ) : (
                    <ChevronRightIcon
                      width={18}
                      height={18}
                      className={styles.accountArrow}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className={styles.aside}>
        <div className={styles.asideInner}>
          <Logo tone="light" size={28} />
          <h2>{t.auth.asideTitle}</h2>
          <p>{t.auth.asideText}</p>
          <ul className={styles.highlights}>
            <li>{t.auth.highlight1}</li>
            <li>{t.auth.highlight2}</li>
            <li>{t.auth.highlight3}</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
