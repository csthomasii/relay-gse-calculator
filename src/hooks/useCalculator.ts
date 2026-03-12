import { useReducer, useMemo } from "react";
import type {
  WizardState,
  WizardAction,
  CalculatorAnswers,
} from "../types/calculator";
import { computeResult } from "../utils/calculations";

export const TOTAL_QUESTION_STEPS = 6;

const FIELD_BY_STEP: (keyof CalculatorAnswers)[] = [
  "program",
  "hasAmeriCorps",
  "teachGrantEligible",
  "subjectArea",
  "teachingDuration",
  "planFederalLoans",
];

const initialAnswers: CalculatorAnswers = {
  program: null,
  hasAmeriCorps: null,
  teachGrantEligible: null,
  subjectArea: null,
  teachingDuration: null,
  planFederalLoans: null,
};

const initialState: WizardState = {
  currentStep: 0,
  answers: initialAnswers,
  result: null,
};

function reducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answers: { ...state.answers, [action.field]: action.value },
      };
    case "NEXT_STEP": {
      const nextStep = state.currentStep + 1;
      if (nextStep >= TOTAL_QUESTION_STEPS) {
        return {
          ...state,
          currentStep: TOTAL_QUESTION_STEPS,
          result: computeResult(state.answers),
        };
      }
      return { ...state, currentStep: nextStep };
    }
    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
        result: null,
      };
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.step,
        result:
          action.step >= TOTAL_QUESTION_STEPS
            ? computeResult(state.answers)
            : null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useCalculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const canProceed = useMemo(() => {
    if (state.currentStep >= TOTAL_QUESTION_STEPS) return false;
    return state.answers[FIELD_BY_STEP[state.currentStep]] !== null;
  }, [state.currentStep, state.answers]);

  const isFirstStep = state.currentStep === 0;
  const isResultsStep = state.currentStep >= TOTAL_QUESTION_STEPS;

  return {
    state,
    dispatch,
    canProceed,
    isFirstStep,
    isResultsStep,
    totalSteps: TOTAL_QUESTION_STEPS,
  };
}
