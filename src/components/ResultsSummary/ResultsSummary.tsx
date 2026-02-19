import type { CalculationResult } from "../../types/calculator";
import { formatCurrency } from "../../utils/calculations";
import "./ResultsSummary.css";

interface ResultsSummaryProps {
  result: CalculationResult;
  onStartOver: () => void;
}

export function ResultsSummary({ result, onStartOver }: ResultsSummaryProps) {
  const { totalTuition, programLabel, offsets, totalOffsets, estimatedOutOfPocket } =
    result;
  const offsetsExceedTuition = totalOffsets > totalTuition;

  return (
    <div className="results-summary">
      <div className="results-summary__header">
        <h2 className="results-summary__program">{programLabel}</h2>
        <div className="results-summary__total">
          <span className="results-summary__total-label">Total Tuition</span>
          <span className="results-summary__total-amount">
            {formatCurrency(totalTuition)}
          </span>
        </div>
      </div>

      <div className="results-summary__table">
        <h3 className="results-summary__section-title">Estimated Tuition Offsets</h3>
        {offsets.map((offset) => (
          <div
            key={offset.id}
            className={`results-summary__row ${!offset.eligible ? "results-summary__row--ineligible" : ""}`}
          >
            <div className="results-summary__row-main">
              <span
                className="results-summary__swatch"
                style={{ background: offset.eligible ? offset.color : "#ccc" }}
              />
              <span className="results-summary__row-label">{offset.label}</span>
              <span className="results-summary__row-amount">
                {offset.eligible
                  ? `- ${formatCurrency(offset.amount)}`
                  : "$0"}
              </span>
            </div>
            {!offset.eligible && (
              <p className="results-summary__row-note">
                Not eligible based on your selections
              </p>
            )}
            {offset.eligible && (
              <p className="results-summary__row-desc">{offset.description}</p>
            )}
          </div>
        ))}

        <div className="results-summary__divider" />

        <div className="results-summary__row results-summary__row--total-offsets">
          <div className="results-summary__row-main">
            <span className="results-summary__row-label">
              Total Estimated Offsets
            </span>
            <span className="results-summary__row-amount">
              - {formatCurrency(totalOffsets)}
            </span>
          </div>
        </div>

        <div className="results-summary__divider results-summary__divider--thick" />

        <div className="results-summary__row results-summary__row--final">
          <div className="results-summary__row-main">
            <span className="results-summary__row-label">
              Estimated Out-of-Pocket Cost
            </span>
            <span className="results-summary__row-amount results-summary__row-amount--final">
              {formatCurrency(estimatedOutOfPocket)}
              {offsetsExceedTuition && " *"}
            </span>
          </div>
        </div>
      </div>

      {offsetsExceedTuition && (
        <p className="results-summary__note">
          * Your estimated offsets exceed total tuition. Some offsets (e.g.,
          Teacher Loan Forgiveness) are applied to federal student loan balances
          and may not reduce upfront costs but will reduce your total repayment
          obligation.
        </p>
      )}

      <div className="results-summary__pslf">
        <h4 className="results-summary__pslf-title">
          Public Service Loan Forgiveness (PSLF)
        </h4>
        <p className="results-summary__pslf-text">
          If you work in public service (including teaching at public or
          qualifying nonprofit schools), you may also qualify for PSLF, which
          forgives remaining federal student loan balances after 120 qualifying
          monthly payments (~10 years). PSLF is not included in this estimate
          because the forgiven amount depends on your specific loan balance,
          repayment plan, and income.
        </p>
      </div>

      <div className="results-summary__disclaimer">
        <p>
          This calculator provides estimates only. Actual financial aid amounts
          depend on individual eligibility, application timing, and
          federal/state funding availability. The TEACH Grant requires
          maintaining a 3.25 GPA and fulfilling a 4-year teaching service
          obligation; failure to meet these requirements converts the grant to a
          federal loan with interest. Teacher Loan Forgiveness is applied to
          federal student loan balances after 5 years of qualifying service.
          Relay need-based aid is an average figure; your award may differ.
        </p>
      </div>

      <div className="results-summary__actions no-print">
        <button
          className="results-summary__btn results-summary__btn--restart"
          onClick={onStartOver}
          type="button"
        >
          Start Over
        </button>
        <button
          className="results-summary__btn results-summary__btn--print"
          onClick={() => window.print()}
          type="button"
        >
          Print / Save
        </button>
      </div>
    </div>
  );
}
