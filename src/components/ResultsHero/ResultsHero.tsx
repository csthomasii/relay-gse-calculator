import type { CalculationResult } from "../../types/calculator";
import { formatCurrency } from "../../utils/calculations";
import { useCountUp } from "../../hooks/useCountUp";
import "./ResultsHero.css";

interface ResultsHeroProps {
  result: CalculationResult;
}

export function ResultsHero({ result }: ResultsHeroProps) {
  const { programLabel, totalTuition, estimatedOutOfPocket, totalOffsets } = result;
  const offsetsExceedTuition = totalOffsets > totalTuition;
  const animatedOutOfPocket = useCountUp(estimatedOutOfPocket, 800);

  return (
    <div className="results-hero">
      <h2 className="results-hero__program">{programLabel}</h2>
      <div className="results-hero__tuition">
        <span className="results-hero__tuition-label">Total Tuition</span>
        <span className="results-hero__tuition-amount">
          {formatCurrency(totalTuition)}
        </span>
      </div>
      <div className="results-hero__oop">
        <span className="results-hero__oop-label">Estimated Out-of-Pocket Cost</span>
        <span className="results-hero__oop-amount">
          {formatCurrency(animatedOutOfPocket)}
          {offsetsExceedTuition && " *"}
        </span>
      </div>
      {offsetsExceedTuition && (
        <p className="results-hero__note">
          * Your estimated offsets exceed total tuition. Some offsets (e.g.,
          Teacher Loan Forgiveness) are applied to federal student loan balances
          and may not reduce upfront costs but will reduce your total repayment
          obligation.
        </p>
      )}
    </div>
  );
}
