"use server";

import { getSettings } from "@/lib/content";
import { HONEYPOT_FIELD, type ContactField, type ContactFormState } from "@/lib/contact-form";

/**
 * Sends contact form submissions by email using Resend (https://resend.com).
 *
 * Environment variables (set in Vercel and .env.local):
 *   RESEND_API_KEY      – API key from Resend
 *   CONTACT_FROM_EMAIL  – sender on a domain verified in Resend,
 *                         e.g. "loop website <website@loopdesign.org>"
 *   CONTACT_TO_EMAIL    – (optional) where to send messages; defaults to the
 *                         contact email on the Settings document in Prismic
 *
 * Without RESEND_API_KEY, submissions are logged to the server console in
 * development so the form can be tested, and rejected in production.
 */
export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    organisation: text(formData, "organisation"),
    message: text(formData, "message"),
  } satisfies Record<ContactField, string>;

  // Spam trap: pretend it worked so bots don't retry.
  if (text(formData, HONEYPOT_FIELD)) return { status: "success" };

  const errors: ContactFormState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  else if (values.name.length > 200) errors.name = "That name is too long.";
  if (!values.email) errors.email = "Please give us an email address to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 320)
    errors.email = "That email address doesn't look right.";
  if (values.organisation.length > 200) errors.organisation = "That's too long.";
  if (!values.message) errors.message = "Please add a message.";
  else if (values.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values };
  }

  const settings = await getSettings();
  const to = process.env.CONTACT_TO_EMAIL || settings?.data.email;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  const subject = `Website enquiry from ${values.name}${values.organisation ? ` (${values.organisation})` : ""}`;
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Organisation: ${values.organisation || "-"}`,
    "",
    values.message,
  ].join("\n");

  if (!apiKey || !from || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact form] Email not configured; submission would be sent:\n", { to, subject, body });
      return { status: "success" };
    }
    console.error("[contact form] Missing RESEND_API_KEY, CONTACT_FROM_EMAIL or recipient.");
    return failure(values, settings?.data.email);
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, reply_to: values.email, subject, text: body }),
    });
    if (!res.ok) {
      console.error("[contact form] Resend error", res.status, await res.text());
      return failure(values, settings?.data.email);
    }
  } catch (error) {
    console.error("[contact form] Failed to send", error);
    return failure(values, settings?.data.email);
  }

  return { status: "success" };
}

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function failure(values: ContactFormState["values"], email?: string | null): ContactFormState {
  return {
    status: "error",
    message: email
      ? `Sorry, your message couldn't be sent. Please try again, or email us at ${email}.`
      : "Sorry, your message couldn't be sent. Please try again later.",
    values,
  };
}
