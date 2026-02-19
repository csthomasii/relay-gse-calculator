import "./Stepper.css";

const STEP_LABELS = [
  "Program",
  "AmeriCorps",
  "TEACH Grant",
  "Subject",
  "Teaching Years",
  "Relay Aid",
];

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export function Stepper({ currentStep, totalSteps, onStepClick }: StepperProps) {
  const isResultsStep = currentStep >= totalSteps;

  return (
    <nav className="stepper no-print" aria-label="Calculator progress">
      <div className="stepper__track">
        {STEP_LABELS.map((label, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const status = isCompleted
            ? "completed"
            : isActive
              ? "active"
              : "upcoming";

          return (
            <div key={index} className="stepper__item">
              {index > 0 && (
                <div
                  className={`stepper__line ${isCompleted || isActive ? "stepper__line--filled" : ""}`}
                />
              )}
              <button
                className={`stepper__circle stepper__circle--${status}`}
                onClick={() => isCompleted && onStepClick(index)}
                disabled={!isCompleted}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${label}${isCompleted ? " (completed)" : isActive ? " (current)" : ""}`}
              >
                {isCompleted ? (
                  <svg
                    className="stepper__check"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              <span
                className={`stepper__label ${isActive ? "stepper__label--active" : ""}`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile compact view */}
      <div className="stepper__mobile">
        <div className="stepper__mobile-bar">
          <div
            className="stepper__mobile-fill"
            style={{
              width: `${isResultsStep ? 100 : (currentStep / totalSteps) * 100}%`,
            }}
          />
        </div>
        <span className="stepper__mobile-text">
          {isResultsStep
            ? "Results"
            : `Step ${currentStep + 1} of ${totalSteps}: ${STEP_LABELS[currentStep]}`}
        </span>
      </div>
    </nav>
  );
}
