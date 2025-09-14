import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import type { CalculationMode } from '../types';
import { CardTitle } from './ui/card';

interface ModeSelectorProps {
  currentMode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="space-y-2">
      <CardTitle className="text-sm font-medium text-foreground">
        Calculation Mode
      </CardTitle>
      <ToggleGroup
        type="single"
        value={currentMode}
        onValueChange={(value) => value && onModeChange(value as CalculationMode)}
        className="border grid w-full grid-cols-2"
      >
        <ToggleGroupItem value="single" className="h-8 px-3">
          Single
        </ToggleGroupItem>
        <ToggleGroupItem value="pair" className="h-8 px-3">
          Pair
        </ToggleGroupItem>
      </ToggleGroup>
      <p className="text-xs text-muted-foreground">
        {currentMode === 'single'
          ? 'Calculate weights for one dumbbell using available plates'
          : 'Calculate matching weights for two dumbbells (requires even plate quantities)'
        }
      </p>
    </div>
  );
}