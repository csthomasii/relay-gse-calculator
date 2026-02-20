import type { ReactNode } from "react";
import "./WizardStep.css";

interface WizardStepProps {
  question: string;
  helperText?: string;
  children: ReactNode;
  onNext: () => void;
  onBack?: () => void;
  canProceed: boolean;
  isFirstStep: boolean;
  isLastQuestionStep: boolean;
  stepNumber?: number;
  totalSteps?: number;
  direction?: "forward" | "back";
}

export function WizardStep({
  question,
  helperText,
  children,
  onNext,
  onBack,
  canProceed,
  isFirstStep,
  isLastQuestionStep,
  stepNumber,
  totalSteps,
  direction = "forward",
}: WizardStepProps) {
  const directionClass =
    direction === "back"
      ? "wizard-step--enter-back"
      : "wizard-step--enter-forward";

  return (
    <div className={`wizard-step ${directionClass}`}>
      <div className="wizard-step__content">
        {stepNumber != null && totalSteps != null && (
          <p className="wizard-step__label">
            Step {stepNumber} of {totalSteps}
          </p>
        )}
        <h2 className="wizard-step__question">{question}</h2>
        {helperText && (
          <p className="wizard-step__helper">{helperText}</p>
        )}
        <div className="wizard-step__input">{children}</div>
      </div>
      <div className="wizard-step__nav no-print">
        {!isFirstStep && onBack && (
          <button
            className="wizard-step__btn wizard-step__btn--back"
            onClick={onBack}
            type="button"
          >
            Back
          </button>
        )}
        <button
          className="wizard-step__btn wizard-step__btn--next"
          onClick={onNext}
          disabled={!canProceed}
          type="button"
        >
          {isLastQuestionStep ? "See My Results" : "Next"}
        </button>
      </div>
    </div>
  );
}
