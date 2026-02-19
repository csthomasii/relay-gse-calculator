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
}: WizardStepProps) {
  return (
    <div className="wizard-step">
      <div className="wizard-step__content">
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
