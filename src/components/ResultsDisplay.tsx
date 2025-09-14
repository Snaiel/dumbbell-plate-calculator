import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import type { WeightResult, UnitSystem } from "../types";
import { formatWeight } from "../utils/calculator";

interface ResultsDisplayProps {
  results: WeightResult[];
  unit: UnitSystem;
  mode: "single" | "pair";
}

export function ResultsDisplay({ results, unit, mode }: ResultsDisplayProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No weights calculated yet.</p>
        <p className="text-sm">
          Add some plates and a handle weight to see possible combinations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Possible Weights
        </label>
        <p className="text-xs text-muted-foreground">
          {mode === "single" ? "Single Dumbbell" : "Pair Mode"}
        </p>
      </div>
      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {results.map((result, index) => (
          <WeightCard key={index} result={result} unit={unit} mode={mode} />
        ))}
      </div>
    </div>
  );
}

interface WeightCardProps {
  result: WeightResult;
  unit: UnitSystem;
  mode: "single" | "pair";
}

function WeightCard({ result, unit, mode }: WeightCardProps) {
  const individualDumbbellWeight = result.totalWeight;
  const totalWeight = mode === "pair" ? result.totalWeight * 2 : result.totalWeight;

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mb-1">
          <div className="space-y-1">
            <div className="text-md font-bold text-primary">
              {formatWeight(individualDumbbellWeight, unit)}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {mode === "pair" ? "2 dumbbells" : "1 dumbbell"}
            {mode === "pair" && (
              <div className="text-sm text-muted-foreground">
                {formatWeight(totalWeight, unit)} total
              </div>
            )}
          </div>
        </div>

        {result.plateCombo.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Plates per side:
            </p>
            <div className="flex flex-wrap gap-2">
              {result.plateCombo
                .sort((a, b) => b.plateWeight - a.plateWeight)
                .map((usage, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    <span className="font-medium">{usage.quantity}x</span>
                    <span>{formatWeight(usage.plateWeight, unit)}</span>
                  </Badge>
                ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Handle only (no plates)</p>
        )}
      </CardContent>
    </Card>
  );
}
