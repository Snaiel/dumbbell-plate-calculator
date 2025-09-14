import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import type { UnitSystem } from '../types';

interface UnitToggleProps {
  currentUnit: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
}

export function UnitToggle({ currentUnit, onUnitChange }: UnitToggleProps) {
  return (
    <ToggleGroup
      type="single"
      value={currentUnit}
      onValueChange={(value) => value && onUnitChange(value as UnitSystem)}
      className="bg-muted rounded-lg p-1"
    >
      <ToggleGroupItem value="kg" className="h-8 px-3">
        kg
      </ToggleGroupItem>
      <ToggleGroupItem value="lbs" className="h-8 px-3">
        lbs
      </ToggleGroupItem>
    </ToggleGroup>
  );
}