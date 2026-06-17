"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import { useAuthStore } from "../../store";
import { useT } from "@/i18n";
import styles from "./AuthGuard.module.scss";

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const t = useT();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace("/login");
    }
  }, [hydrated, user, router]);

  if (!hydrated || !user) {
    return (
      <div className={styles.gate}>
        <Spinner size={32} label={t.auth.loadingWorkspace} />
      </div>
    );
  }

  return <>{children}</>;
}
