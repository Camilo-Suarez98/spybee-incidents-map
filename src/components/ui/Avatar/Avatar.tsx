import Image from "next/image";
import { getInitials } from "@features/incidents/utils";
import type { Person } from "@features/incidents/types";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  person: Person;
  size?: number;
}

export function Avatar({ person, size = 32 }: AvatarProps) {
  return (
    <span
      className={styles.avatar}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      title={person?.name || "Demo user"}
    >
      <span className={styles.fallback}>{getInitials(person?.name || "")}</span>
      <Image
        src={person?.avatarUrl || "https://i.pravatar.cc/150?u=nicolas.fernandez"}
        alt={`${person?.name} avatar`}
        width={size}
        height={size}
        className={styles.image}
        unoptimized
      />
    </span>
  );
}

interface AvatarGroupProps {
  people: Person[];
  max?: number;
  size?: number;
}

export function AvatarGroup({ people, max = 3, size = 30 }: AvatarGroupProps) {
  const visible = people.slice(0, max);
  const rest = people.length - visible.length;

  return (
    <div className={styles.group}>
      {visible.map((person) => (
        <Avatar key={person.id} person={person} size={size} />
      ))}
      {rest > 0 && (
        <span
          className={styles.more}
          style={{ width: size, height: size, fontSize: size * 0.36 }}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}
