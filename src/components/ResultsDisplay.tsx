import type { WeightResult, UnitSystem } from '../types';
import { formatWeight } from '../utils/calculator';

interface ResultsDisplayProps {
  results: WeightResult[];
  unit: UnitSystem;
  mode: 'single' | 'pair';
}

export function ResultsDisplay({ results, unit, mode }: ResultsDisplayProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No weights calculated yet.</p>
        <p className="text-sm">Add some plates and a handle weight to see possible combinations.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Possible Weights ({results.length} combinations)
        </h3>
        <span className="text-sm text-muted-foreground">
          {mode === 'single' ? 'Single Dumbbell' : 'Pair Mode'}
        </span>
      </div>

      <div className="grid gap-3 max-h-96 overflow-y-auto">
        {results.map((result, index) => (
          <WeightCard
            key={index}
            result={result}
            unit={unit}
            mode={mode}
          />
        ))}
      </div>
    </div>
  );
}

interface WeightCardProps {
  result: WeightResult;
  unit: UnitSystem;
  mode: 'single' | 'pair';
}

function WeightCard({ result, unit, mode }: WeightCardProps) {
  const totalPlateWeight = result.plateCombo.reduce(
    (sum, usage) => sum + (usage.plateWeight * usage.quantity), 
    0
  );

  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xl font-bold text-primary">
          {formatWeight(result.totalWeight, unit)}
        </div>
        <div className="text-sm text-muted-foreground">
          {mode === 'pair' ? '2 dumbbells' : '1 dumbbell'}
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
                <div
                  key={index}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-sm"
                >
                  <span className="font-medium">
                    {usage.quantity}×
                  </span>
                  <span>
                    {formatWeight(usage.plateWeight, unit)}
                  </span>
                </div>
              ))}
          </div>
          <div className="text-xs text-muted-foreground pt-1">
            Plate weight per side: {formatWeight(totalPlateWeight, unit)}
            {mode === 'pair' && (
              <span className="ml-2">
                • Total plates needed: {result.plateCombo.reduce((sum, usage) => sum + (usage.quantity * 2), 0)}
              </span>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Handle only (no plates)
        </p>
      )}
    </div>
  );
}