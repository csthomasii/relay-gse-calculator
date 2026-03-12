import { useRef, useEffect, useState } from "react";
import { useCalculator, TOTAL_QUESTION_STEPS } from "./hooks/useCalculator";
import { PROGRAMS, PROGRAM_KEYS } from "./data/programs";
import { Stepper } from "./components/Stepper/Stepper";
import { WizardStep } from "./components/WizardStep/WizardStep";
import { RadioGroup } from "./components/RadioGroup/RadioGroup";
import { SelectInput } from "./components/SelectInput/SelectInput";
import { ResultsHero } from "./components/ResultsHero/ResultsHero";
import { ResultsChart } from "./components/ResultsChart/ResultsChart";
import { ResultsSummary } from "./components/ResultsSummary/ResultsSummary";
import type { CalculatorAnswers } from "./types/calculator";

const PROGRAM_OPTIONS = PROGRAM_KEYS.map((key) => ({
  value: key,
  label: PROGRAMS[key].label,
}));

const YES_NO_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const AMERICORPS_OPTIONS = [
  {
    value: "plan_to_enroll",
    label: "No, and I plan to enroll in AmeriCorps while at Relay",
  },
  {
    value: "already_served",
    label: "Yes, I have completed a service term",
  },
];

const SUBJECT_OPTIONS = [
  { value: "stem_sped", label: "Mathematics, Science, or Special Education" },
  { value: "other", label: "Other subject area" },
];

const DURATION_OPTIONS = [
  { value: "less_than_5", label: "Fewer than 5 years" },
  { value: "5_or_more", label: "5 or more years" },
];

interface StepConfig {
  question: string;
  helperText: string;
  field: keyof CalculatorAnswers;
}

const STEP_CONFIGS: StepConfig[] = [
  {
    question: "Which Relay program are you considering?",
    helperText: "",
    field: "program",
  },
  {
    question: "Have you completed an AmeriCorps service term?",
    helperText:
      "As an AmeriCorps member, you can earn a Segal Education Award worth up to $7,395 that can be applied to your tuition.",
    field: "hasAmeriCorps",
  },
  {
    question: "Do you plan to apply for the federal TEACH Grant?",
    helperText:
      "As a Relay student, you may be eligible for up to $1,886 per year in TEACH tuition grants.",
    field: "teachGrantEligible",
  },
  {
    question: "What subject area will you be certified to teach?",
    helperText:
      "Teachers in mathematics, science, or special education may qualify for up to $17,500 in Teacher Loan Forgiveness — compared to $5,000 for other subject areas.",
    field: "subjectArea",
  },
  {
    question: "How long do you plan to teach at a qualifying school?",
    helperText:
      "Teacher Loan Forgiveness requires 5 consecutive years of full-time teaching at a Title I school or educational service agency. If you teach fewer than 5 years, you will not qualify for this program.",
    field: "teachingDuration",
  },
  {
    question: "Do you plan to take out federal student loans?",
    helperText:
      "Federal student loans can be forgiven through programs like Teacher Loan Forgiveness and Public Service Loan Forgiveness, which are already reflected in your estimate.",
    field: "planFederalLoans",
  },
];

export function Calculator() {
  const { state, dispatch, canProceed, isFirstStep, isResultsStep, totalSteps } =
    useCalculator();

  const prevStepRef = useRef(state.currentStep);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  useEffect(() => {
    if (state.currentStep !== prevStepRef.current) {
      setDirection(state.currentStep > prevStepRef.current ? "forward" : "back");
      prevStepRef.current = state.currentStep;
    }
  }, [state.currentStep]);

  const handleSetAnswer = (field: keyof CalculatorAnswers, value: string) => {
    dispatch({ type: "SET_ANSWER", field, value });
  };

  const renderStepInput = (stepIndex: number) => {
    const config = STEP_CONFIGS[stepIndex];
    const currentValue = state.answers[config.field];

    switch (stepIndex) {
      case 0:
        return (
          <SelectInput
            name="program"
            options={PROGRAM_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("program", v)}
            placeholder="Select a program..."
          />
        );
      case 1:
        return (
          <RadioGroup
            name="americorps"
            options={AMERICORPS_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("hasAmeriCorps", v)}
          />
        );
      case 2:
        return (
          <RadioGroup
            name="teachGrant"
            options={YES_NO_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("teachGrantEligible", v)}
          />
        );
      case 3:
        return (
          <RadioGroup
            name="subjectArea"
            options={SUBJECT_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("subjectArea", v)}
          />
        );
      case 4:
        return (
          <RadioGroup
            name="teachingDuration"
            options={DURATION_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("teachingDuration", v)}
          />
        );
      case 5:
        return (
          <RadioGroup
            name="federalLoans"
            options={YES_NO_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("planFederalLoans", v)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="calculator">
      <Stepper
        currentStep={state.currentStep}
        totalSteps={totalSteps}
        onStepClick={(step) => dispatch({ type: "GO_TO_STEP", step })}
      />

      {isResultsStep && state.result ? (
        <div className="calculator__results">
          <ResultsHero result={state.result} />
          <ResultsChart result={state.result} />
          <ResultsSummary
            result={state.result}
            onStartOver={() => dispatch({ type: "RESET" })}
          />
        </div>
      ) : (
        <WizardStep
          key={state.currentStep}
          question={STEP_CONFIGS[state.currentStep].question}
          helperText={STEP_CONFIGS[state.currentStep].helperText}
          canProceed={canProceed}
          isFirstStep={isFirstStep}
          isLastQuestionStep={state.currentStep === TOTAL_QUESTION_STEPS - 1}
          onNext={() => dispatch({ type: "NEXT_STEP" })}
          onBack={() => dispatch({ type: "PREV_STEP" })}
          stepNumber={state.currentStep + 1}
          totalSteps={TOTAL_QUESTION_STEPS}
          direction={direction}
        >
          {renderStepInput(state.currentStep)}
        </WizardStep>
      )}
    </div>
  );
}
