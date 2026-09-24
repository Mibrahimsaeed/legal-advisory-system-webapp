"use client";

import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/forms/form-field";
import { FormTextareaField } from "@/components/forms/form-textarea-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { useFormState } from "@/hooks/use-form-state";
import { validateContact } from "@/lib/validators/contact";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };
const MOCK_SUBMIT_DELAY_MS = 600;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const { values, errors, handleChange, handleSubmit, reset } = useFormState(
    EMPTY_FORM,
    validateContact,
  );

  const onSubmit = async () => {
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, MOCK_SUBMIT_DELAY_MS));
    setStatus("sent");
  };

  const sendAnother = () => {
    reset();
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle2Icon className="size-10 text-primary" aria-hidden />
        <h3 className="font-heading text-3xl font-semibold">Message sent</h3>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Thank you for getting in touch. This is a prototype, so your message
          has not been delivered anywhere yet.
        </p>
        <Button variant="outline" onClick={sendAnother}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <FormField
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <FormField
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          error={errors.subject}
        />
        <FormTextareaField
          label="Message"
          name="message"
          rows={5}
          value={values.message}
          onChange={handleChange}
          error={errors.message}
        />
        <SubmitButton loading={status === "sending"}>Send Message</SubmitButton>
      </FieldGroup>
    </form>
  );
}
