import { Button } from './ui/button';
import type { UnitSystem } from '../types';

interface UnitToggleProps {
  currentUnit: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
}

export function UnitToggle({ currentUnit, onUnitChange }: UnitToggleProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
      <Button
        variant={currentUnit === 'kg' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onUnitChange('kg')}
        className="h-8 px-3"
      >
        kg
      </Button>
      <Button
        variant={currentUnit === 'lbs' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onUnitChange('lbs')}
        className="h-8 px-3"
      >
        lbs
      </Button>
    </div>
  );
}