import { isFilled, type Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { Section } from "@/components/Container";
import { RichText } from "@/components/RichText";
import { ContactForm as Form } from "@/components/ContactForm";

export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

export default function ContactForm({ slice }: ContactFormProps) {
  const { label, heading, body, submit_label, success_message } = slice.primary;

  return (
    <Section label={label} sliceType={slice.slice_type}>
      <div className="max-w-2xl">
        <RichText field={heading} />
        {isFilled.richText(body) && (
          <div className="mt-6 text-lg text-muted">
            <RichText field={body} />
          </div>
        )}
        <div className="mt-10">
          <Form
            submitLabel={submit_label || "Send message"}
            successMessage={
              isFilled.richText(success_message) ? (
                <RichText field={success_message} />
              ) : (
                <p>Thanks for getting in touch. We&apos;ll get back to you soon.</p>
              )
            }
          />
        </div>
      </div>
    </Section>
  );
}
