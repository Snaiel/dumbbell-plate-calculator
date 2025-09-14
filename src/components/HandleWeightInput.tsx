import { useState } from 'react';
import { Button } from './ui/button';
import type { UnitSystem } from '../types';

interface HandleWeightInputProps {
  handleWeight: number;
  onHandleWeightChange: (weight: number) => void;
  unit: UnitSystem;
}

export function HandleWeightInput({ 
  handleWeight, 
  onHandleWeightChange, 
  unit 
}: HandleWeightInputProps) {
  const [inputValue, setInputValue] = useState(handleWeight.toString());

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      onHandleWeightChange(numValue);
    }
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue) || numValue < 0) {
      setInputValue(handleWeight.toString());
    }
  };

  const presetWeights = unit === 'kg' ? [1, 2, 2.5, 3, 4, 5] : [2, 4, 5, 6, 8, 10];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Handle Weight ({unit})
      </label>
      
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onBlur={handleInputBlur}
          min="0"
          step="0.1"
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={`Enter handle weight in ${unit}`}
        />
        <span className="text-sm text-muted-foreground min-w-8">{unit}</span>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Common handle weights:</p>
        <div className="flex flex-wrap gap-1">
          {presetWeights.map((weight) => (
            <Button
              key={weight}
              variant="outline"
              size="sm"
              onClick={() => {
                setInputValue(weight.toString());
                onHandleWeightChange(weight);
              }}
              className="h-7 px-2 text-xs"
            >
              {weight} {unit}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}