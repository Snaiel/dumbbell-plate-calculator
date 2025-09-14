import { Button } from './ui/button';
import type { CalculationMode } from '../types';

interface ModeSelectorProps {
  currentMode: CalculationMode;
  onModeChange: (mode: CalculationMode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Calculation Mode
      </label>
      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
        <Button
          variant={currentMode === 'single' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('single')}
          className="h-8 px-3 flex-1"
        >
          Single Dumbbell
        </Button>
        <Button
          variant={currentMode === 'pair' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onModeChange('pair')}
          className="h-8 px-3 flex-1"
        >
          Pair Mode
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {currentMode === 'single' 
          ? 'Calculate weights for one dumbbell using available plates'
          : 'Calculate matching weights for two dumbbells (requires even plate quantities)'
        }
      </p>
    </div>
  );
}