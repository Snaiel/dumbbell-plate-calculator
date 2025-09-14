import type { UnitSystem } from '../types';

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
      <label className="text-sm font-medium text-foreground">
        Max Plates Per Side
      </label>
      <div className="space-y-1">
        <input
          type="number"
          value={maxPlates}
          onChange={handleChange}
          min="1"
          max="20"
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          placeholder="Max plates"
        />
        <p className="text-xs text-muted-foreground">
          Maximum number of plates that can fit on one side of the dumbbell handle
        </p>
      </div>
    </div>
  );
}