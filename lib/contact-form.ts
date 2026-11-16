/** Shared between the contact form (client) and its server action. */

export type ContactField = "name" | "email" | "organisation" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the visitor doesn't lose what they typed. */
  values?: Partial<Record<ContactField, string>>;
};

export const initialContactFormState: ContactFormState = { status: "idle" };

/** Hidden field that people never see; bots tend to fill it in. */
export const HONEYPOT_FIELD = "website";
