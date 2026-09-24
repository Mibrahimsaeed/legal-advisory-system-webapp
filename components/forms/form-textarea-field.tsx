import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface FormTextareaFieldProps extends React.ComponentProps<"textarea"> {
  label: string;
  name: string;
  error?: string;
}

export function FormTextareaField({
  label,
  name,
  error,
  ...props
}: FormTextareaFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <Textarea id={name} name={name} aria-invalid={!!error} {...props} />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
