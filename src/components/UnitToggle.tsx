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
      className="border rounded-lg"
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