import { Input } from './ui/input';
import type { UnitSystem } from '../types';
import { CardTitle } from './ui/card';

interface MaxPlatesInputProps {
  maxPlates: number;
  onMaxPlatesChange: (maxPlates: number) => void;
  unit: UnitSystem;
}

export function MaxPlatesInput({ maxPlates, onMaxPlatesChange }: MaxPlatesInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 20) {
      onMaxPlatesChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <CardTitle className="text-sm font-medium text-foreground">
        Max Plates Per Side
      </CardTitle>
      <div className="space-y-1">
        <Input
          type="number"
          inputMode="numeric"
          value={maxPlates}
          onChange={handleChange}
          min="1"
          max="20"
          placeholder="Max plates"
        />
        <p className="text-xs text-muted-foreground">
          Maximum number of plates that can fit on one side of the dumbbell handle
        </p>
      </div>
    </div>
  );
}