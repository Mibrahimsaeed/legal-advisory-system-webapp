import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/forms/password-input";

interface FormFieldProps extends React.ComponentProps<"input"> {
  label: string;
  name: string;
  error?: string;
}

export function FormField({ label, name, error, type, ...props }: FormFieldProps) {
  const InputComponent = type === "password" ? PasswordInput : Input;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <InputComponent
        id={name}
        name={name}
        type={type}
        aria-invalid={!!error}
        {...props}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
