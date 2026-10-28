type Props = { activeStep: 1 | 2 | 3 };

const steps = ["Cart review", "Shipping", "Payment summary"] as const;

export default function CheckoutStepper({ activeStep }: Props) {
  return (
    <nav className="stepper" aria-label="Checkout progress">
      {steps.map((label, index) => {
        const number = (index + 1) as 1 | 2 | 3;
        const active = activeStep === number;
        const complete = activeStep > number;
        return (
          <div
            className={`stepper-step ${active ? "active" : ""} ${complete ? "complete" : ""}`}
            key={label}
            aria-current={active ? "step" : undefined}
          >
            <span className="step-number">{complete ? "✓" : number}</span>
            <span>{label}</span>
          </div>
        );
      })}
    </nav>
  );
}
