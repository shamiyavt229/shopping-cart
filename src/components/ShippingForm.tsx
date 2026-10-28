import { useState } from "react";
import type { FormEvent } from "react";
import { ShippingSchema, emptyShippingDetails } from "../utils/shippingSchema";
import type { ShippingDetails } from "../utils/shippingSchema";

type ShippingFormProps = {
  initialDetails: ShippingDetails;
  onBack: () => void;
  onContinue: (details: ShippingDetails) => void;
};

type FieldName = keyof ShippingDetails;

const fields: { name: FieldName; label: string; placeholder: string; type?: string; wide?: boolean }[] = [
  { name: "fullName", label: "Full name", placeholder: "Alex Morgan", wide: true },
  { name: "email", label: "Email address", placeholder: "alex@example.com", type: "email" },
  { name: "phone", label: "Phone number", placeholder: "+1 555 0100", type: "tel" },
  { name: "address", label: "Street address", placeholder: "123 Market Street", wide: true },
  { name: "city", label: "City", placeholder: "San Francisco" },
  { name: "postalCode", label: "Postal code", placeholder: "94103" },
];

export default function ShippingForm({ initialDetails, onBack, onContinue }: ShippingFormProps) {
  const [values, setValues] = useState<ShippingDetails>({ ...emptyShippingDetails, ...initialDetails });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = ShippingSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as FieldName | undefined;
        if (field && !nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    onContinue(result.data);
  }

  return (
    <form className="checkout-panel" onSubmit={handleSubmit} noValidate>
      <p className="eyebrow">STEP 02 / SHIPPING</p>
      <h2>Where should we send it?</h2>
      <p className="panel-description">Enter your delivery details to review your order.</p>
      <div className="row g-3 mt-1">
        {fields.map((field) => (
          <div className={field.wide ? "col-12" : "col-md-6"} key={field.name}>
            <label className="form-label" htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              className={`form-control custom-input ${errors[field.name] ? "is-invalid" : ""}`}
              type={field.type ?? "text"}
              placeholder={field.placeholder}
              value={values[field.name]}
              onChange={(event) => {
                setValues((current) => ({ ...current, [field.name]: event.target.value }));
                setErrors((current) => ({ ...current, [field.name]: undefined }));
              }}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
            {errors[field.name] && <div className="invalid-feedback" id={`${field.name}-error`}>{errors[field.name]}</div>}
          </div>
        ))}
      </div>
      <div className="checkout-actions">
        <button type="button" className="secondary-button" onClick={onBack}>← Back to bag</button>
        <button type="submit" className="primary-button">Review order →</button>
      </div>
    </form>
  );
}