"use client";

import { useActionState, type ReactNode } from "react";
import { sendContactMessage } from "@/lib/contact-action";
import {
  HONEYPOT_FIELD,
  initialContactFormState,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact-form";

export function ContactForm({
  submitLabel,
  successMessage,
}: {
  submitLabel: string;
  successMessage: ReactNode;
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialContactFormState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line p-8 text-lg">
        {successMessage}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" autoComplete="name" required state={state} />
        <Field name="email" label="Email" type="email" autoComplete="email" required state={state} />
      </div>
      <Field name="organisation" label="Organisation (optional)" autoComplete="organization" state={state} />
      <Field name="message" label="Message" multiline required state={state} />

      {/* Spam trap: hidden from people and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {pending ? "Sending…" : submitLabel}
        </button>
        <p aria-live="polite" className="text-sm text-muted">
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  state,
  type = "text",
  multiline = false,
  required = false,
  autoComplete,
}: {
  name: ContactField;
  label: string;
  state: ContactFormState;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  const error = state.errors?.[name];
  const errorId = `${id}-error`;
  const className = `w-full rounded-xl border bg-transparent px-4 py-3 outline-none transition-colors focus:border-foreground ${
    error ? "border-red-500" : "border-line"
  }`;
  const shared = {
    id,
    name,
    required,
    autoComplete,
    defaultValue: state.values?.[name] ?? "",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className,
  };

  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      {multiline ? <textarea rows={6} {...shared} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
