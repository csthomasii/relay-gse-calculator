import { useCalculator, TOTAL_QUESTION_STEPS } from "./hooks/useCalculator";
import { PROGRAMS, PROGRAM_KEYS } from "./data/programs";
import { Stepper } from "./components/Stepper/Stepper";
import { WizardStep } from "./components/WizardStep/WizardStep";
import { RadioGroup } from "./components/RadioGroup/RadioGroup";
import { SelectInput } from "./components/SelectInput/SelectInput";
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
  { value: "no", label: "No, I have not served in AmeriCorps" },
  {
    value: "already_served",
    label: "Yes, I have already completed a service term",
  },
  {
    value: "enroll_at_relay",
    label: "I plan to enroll in AmeriCorps while at Relay",
  },
];

const SUBJECT_OPTIONS = [
  { value: "math_science", label: "Mathematics or Science" },
  { value: "special_education", label: "Special Education" },
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
    helperText:
      "Select the program you plan to enroll in. Tuition varies by program length and specialization.",
    field: "program",
  },
  {
    question: "What is your AmeriCorps status?",
    helperText:
      "Each AmeriCorps service term earns a $7,395 Segal Education Award that can be applied directly to Relay tuition. Students can also enroll in AmeriCorps while at Relay and earn up to two awards (one per year of enrollment), as long as they have no prior AmeriCorps service.",
    field: "hasAmeriCorps",
  },
  {
    question: "Do you plan to apply for the federal TEACH Grant?",
    helperText:
      "Because Relay programs are half-time, the TEACH Grant provides up to $1,886 per year (half of the $3,772 full-time maximum). It requires a 3.25 GPA and a commitment to teach full-time in a high-need field at a low-income school for 4 years after graduation. If the service obligation is not met, the grant converts to a federal loan with interest.",
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
    question: "Include Relay's average need-based aid in your estimate?",
    helperText:
      "In 2023-24, Relay disbursed over $28 million in total aid. The average need-based institutional award is approximately $6,072, distributed on a first-come, first-served basis. Your actual award may differ.",
    field: "applyNeedBasedAid",
  },
];

export function Calculator() {
  const { state, dispatch, canProceed, isFirstStep, isResultsStep, totalSteps } =
    useCalculator();

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
            name="needBasedAid"
            options={YES_NO_OPTIONS}
            value={currentValue}
            onChange={(v) => handleSetAnswer("applyNeedBasedAid", v)}
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
          <ResultsChart result={state.result} />
          <ResultsSummary
            result={state.result}
            onStartOver={() => dispatch({ type: "RESET" })}
          />
        </div>
      ) : (
        <WizardStep
          question={STEP_CONFIGS[state.currentStep].question}
          helperText={STEP_CONFIGS[state.currentStep].helperText}
          canProceed={canProceed}
          isFirstStep={isFirstStep}
          isLastQuestionStep={state.currentStep === TOTAL_QUESTION_STEPS - 1}
          onNext={() => dispatch({ type: "NEXT_STEP" })}
          onBack={() => dispatch({ type: "PREV_STEP" })}
        >
          {renderStepInput(state.currentStep)}
        </WizardStep>
      )}
    </div>
  );
}
