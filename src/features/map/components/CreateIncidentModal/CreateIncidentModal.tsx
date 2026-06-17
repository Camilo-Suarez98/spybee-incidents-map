"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { TextField, TextArea, SelectField } from "@/components/ui/Field";
import { PinIcon } from "@/components/ui/icons";
import { INCIDENT_TYPES, PRIORITY_META } from "@features/incidents/constants";
import { useIncidentsStore } from "@features/incidents/store";
import { useAuthStore } from "@features/auth/store";
import type { IncidentPriority } from "@features/incidents/types";
import { useMapStore } from "@features/map/store";
import { useT, useLocale, typeName } from "@/i18n";
import styles from "./CreateIncidentModal.module.scss";

interface FormState {
  title: string;
  description: string;
  dueDate: string;
  typeKey: string;
  priority: IncidentPriority | "";
  locationDescription: string;
}

const EMPTY: FormState = {
  title: "",
  description: "",
  dueDate: "",
  typeKey: "",
  priority: "",
  locationDescription: "",
};

export function CreateIncidentModal() {
  const t = useT();
  const locale = useLocale();
  const createOpen = useMapStore((state) => state.createOpen);
  const draft = useMapStore((state) => state.draft);
  const closeCreate = useMapStore((state) => state.closeCreate);

  const createIncident = useIncidentsStore((state) => state.createIncident);
  const user = useAuthStore((state) => state.user);

  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );

  const priorityOptions = (
    Object.keys(PRIORITY_META) as IncidentPriority[]
  ).map((value) => ({ value, label: t.priority[value] }));

  const typeOptions = useMemo(
    () =>
      INCIDENT_TYPES.map((type) => ({
        value: type.key,
        label: typeName(type, locale),
      })),
    [locale],
  );

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
  };

  const handleClose = () => {
    reset();
    closeCreate();
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.title.trim()) next.title = t.createModal.errTitle;
    if (!form.description.trim()) next.description = t.createModal.errDesc;
    if (!form.dueDate) next.dueDate = t.createModal.errDate;
    if (!form.typeKey) next.typeKey = t.createModal.errCategory;
    if (!form.priority) next.priority = t.createModal.errPriority;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft || !user) return;
    if (!validate()) return;

    createIncident(
      {
        title: form.title,
        description: form.description,
        dueDate: new Date(form.dueDate).toISOString(),
        typeKey: form.typeKey,
        priority: form.priority as IncidentPriority,
        locationDescription: form.locationDescription,
        coordinates: draft,
      },
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    );

    reset();
    closeCreate();
  };

  return (
    <Modal
      open={createOpen}
      onClose={handleClose}
      title={t.createModal.title}
      subtitle={t.createModal.subtitle}
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            {t.createModal.cancel}
          </Button>
          <Button type="submit" form="create-incident-form">
            {t.createModal.submit}
          </Button>
        </>
      }
    >
      {draft && (
        <div className={styles.location}>
          <PinIcon width={18} height={18} />
          <span>
            {draft.lat.toFixed(5)}, {draft.lng.toFixed(5)}
          </span>
        </div>
      )}

      <form
        id="create-incident-form"
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <TextField
          id="title"
          label={t.createModal.titleLabel}
          required
          placeholder={t.createModal.titlePlaceholder}
          value={form.title}
          error={errors.title}
          onChange={(event) => update("title", event.target.value)}
        />

        <TextArea
          id="description"
          label={t.createModal.descLabel}
          required
          placeholder={t.createModal.descPlaceholder}
          value={form.description}
          error={errors.description}
          onChange={(event) => update("description", event.target.value)}
        />

        <div className={styles.row}>
          <TextField
            id="dueDate"
            label={t.createModal.dueDateLabel}
            type="date"
            value={form.dueDate}
            error={errors.dueDate}
            onChange={(event) => update("dueDate", event.target.value)}
          />
          <SelectField
            id="priority"
            label={t.createModal.priorityLabel}
            required
            placeholder={t.createModal.priorityPlaceholder}
            options={priorityOptions}
            value={form.priority}
            error={errors.priority}
            onChange={(event) => update("priority", event.target.value)}
          />
        </div>

        <SelectField
          id="typeKey"
          label={t.createModal.categoryLabel}
          required
          placeholder={t.createModal.categoryPlaceholder}
          options={typeOptions}
          value={form.typeKey}
          error={errors.typeKey}
          onChange={(event) => update("typeKey", event.target.value)}
        />

        <TextField
          id="locationDescription"
          label={t.createModal.locationLabel}
          placeholder={t.createModal.locationPlaceholder}
          value={form.locationDescription}
          onChange={(event) => update("locationDescription", event.target.value)}
        />
      </form>
    </Modal>
  );
}
