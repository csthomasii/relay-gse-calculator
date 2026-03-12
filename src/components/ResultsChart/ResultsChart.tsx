import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import type { CalculationResult } from "../../types/calculator";
import { formatCurrency } from "../../utils/calculations";
import "./ResultsChart.css";

interface ResultsChartProps {
  result: CalculationResult;
}

const OUT_OF_POCKET_COLOR = "#d4d4d4";

export function ResultsChart({ result }: ResultsChartProps) {
  const { totalTuition, offsets, estimatedOutOfPocket } = result;

  const eligibleOffsets = offsets.filter((o) => o.amount > 0);

  // For the stacked bar, we need a single data point with all offset fields
  const stackedData: Record<string, string | number> = { name: "Offsets" };
  eligibleOffsets.forEach((o) => {
    stackedData[o.id] = o.amount;
  });
  if (estimatedOutOfPocket > 0) {
    stackedData["outOfPocket"] = estimatedOutOfPocket;
  }

  const costBarData: Record<string, string | number> = {
    name: "Total Cost",
    tuition: totalTuition,
  };

  const chartData = [costBarData, stackedData];

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ name: string; value: number; color: string }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          {payload.map((entry, index) => (
            <div key={index} className="chart-tooltip__item">
              <span
                className="chart-tooltip__color"
                style={{ background: entry.color }}
              />
              <span>
                {entry.name}: {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Label formatter that handles Recharts' RenderableText type
  const makeLabelFormatter =
    (minPct: number, tuition: number) =>
    (v: string | number | boolean | null | undefined): string => {
      if (v == null || v === "" || typeof v === "boolean") return "";
      const num = typeof v === "string" ? parseFloat(v) : v;
      if (!num) return "";
      const pct = num / tuition;
      return pct > minPct ? formatCurrency(num) : "";
    };

  // Legend items
  const legendItems = [
    { label: "Total Tuition", color: "#898A8D" },
    ...eligibleOffsets.map((o) => ({ label: o.label, color: o.color })),
    ...(estimatedOutOfPocket > 0
      ? [{ label: "Estimated Out-of-Pocket", color: OUT_OF_POCKET_COLOR }]
      : []),
  ];

  return (
    <div className="results-chart">
      <h3 className="results-chart__title">Cost vs. Tuition Offsets</h3>

      <div className="results-chart__container">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            barSize={50}
          >
            <XAxis
              type="number"
              domain={[
                0,
                Math.max(
                  totalTuition,
                  result.totalOffsets + estimatedOutOfPocket
                ) * 1.05,
              ]}
              tickFormatter={(v: number) => formatCurrency(v)}
              fontSize={12}
              tick={{ fill: "#898A8D" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              fontSize={13}
              fontWeight={600}
              tick={{ fill: "#1D3557" }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Total cost bar */}
            <Bar
              dataKey="tuition"
              stackId="a"
              fill="#898A8D"
              radius={[0, 4, 4, 0]}
            >
              <LabelList
                dataKey="tuition"
                position="insideRight"
                formatter={makeLabelFormatter(0, totalTuition)}
                style={{ fill: "#fff", fontWeight: 700, fontSize: 14 }}
              />
            </Bar>

            {/* Offset segments */}
            {eligibleOffsets.map((o) => (
              <Bar key={o.id} dataKey={o.id} stackId="a" fill={o.color}>
                <LabelList
                  dataKey={o.id}
                  position="center"
                  formatter={makeLabelFormatter(0.12, totalTuition)}
                  style={{ fill: "#fff", fontWeight: 700, fontSize: 12 }}
                />
              </Bar>
            ))}

            {estimatedOutOfPocket > 0 && (
              <Bar
                dataKey="outOfPocket"
                stackId="a"
                fill={OUT_OF_POCKET_COLOR}
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="outOfPocket"
                  position="center"
                  formatter={makeLabelFormatter(0.12, totalTuition)}
                  style={{ fill: "#1D3557", fontWeight: 700, fontSize: 12 }}
                />
              </Bar>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="results-chart__legend">
        {legendItems.map((item, i) => (
          <div key={i} className="results-chart__legend-item">
            <span
              className="results-chart__legend-swatch"
              style={{ background: item.color }}
            />
            <span className="results-chart__legend-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
