import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Plus, Trash2 } from 'lucide-react';
import type { Plate, UnitSystem } from '../types';
import { COMMON_PLATES } from '../types';
import { isValidPlateWeight, isValidQuantity } from '../utils/calculator';
import { CardTitle } from './ui/card';

interface PlateManagerProps {
  plates: Plate[];
  onPlatesChange: (plates: Plate[]) => void;
  unit: UnitSystem;
}

export function PlateManager({ plates, onPlatesChange, unit }: PlateManagerProps) {
  const [newPlateWeight, setNewPlateWeight] = useState('');
  const [newPlateQuantity, setNewPlateQuantity] = useState('1');

  const addPlate = () => {
    const weight = parseFloat(newPlateWeight);
    const quantity = parseInt(newPlateQuantity);

    if (!isValidPlateWeight(weight) || !isValidQuantity(quantity)) {
      return;
    }

    // Check if plate with this weight already exists
    const existingPlateIndex = plates.findIndex(p => p.weight === weight);
    
    if (existingPlateIndex >= 0) {
      // Update existing plate quantity
      const updatedPlates = [...plates];
      updatedPlates[existingPlateIndex] = {
        ...updatedPlates[existingPlateIndex],
        quantity: updatedPlates[existingPlateIndex].quantity + quantity
      };
      onPlatesChange(updatedPlates);
    } else {
      // Add new plate
      const newPlate: Plate = {
        id: `plate-${Date.now()}-${Math.random()}`,
        weight,
        quantity
      };
      onPlatesChange([...plates, newPlate]);
    }

    setNewPlateWeight('');
    setNewPlateQuantity('1');
  };

  const removePlate = (plateId: string) => {
    onPlatesChange(plates.filter(p => p.id !== plateId));
  };

  const updatePlateQuantity = (plateId: string, newQuantity: number) => {
    if (!isValidQuantity(newQuantity)) return;
    
    if (newQuantity === 0) {
      removePlate(plateId);
      return;
    }

    const updatedPlates = plates.map(p => 
      p.id === plateId ? { ...p, quantity: newQuantity } : p
    );
    onPlatesChange(updatedPlates);
  };

  const addCommonPlate = (weight: number) => {
    setNewPlateWeight(weight.toString());
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <CardTitle className="text-sm font-medium text-foreground">
          Available Plates
        </CardTitle>
        
        {/* Common plates quick add */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Quick add common plates:</p>
          <div className="flex flex-wrap gap-1">
            {COMMON_PLATES[unit].map((weight) => (
              <Button
                key={weight}
                variant="outline"
                size="sm"
                onClick={() => addCommonPlate(weight)}
                className="h-7 px-2 text-xs"
              >
                {weight} {unit}
              </Button>
            ))}
          </div>
        </div>

        {/* Add custom plate form */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground mb-1">Weight ({unit})</Label>
            <Input
              type="number"
              value={newPlateWeight}
              onChange={(e) => setNewPlateWeight(e.target.value)}
              min="0"
              step="0.1"
              className="h-8"
              placeholder="Weight"
            />
          </div>
          <div className="w-20">
            <Label className="text-xs text-muted-foreground mb-1">Quantity</Label>
            <Input
              type="number"
              value={newPlateQuantity}
              onChange={(e) => setNewPlateQuantity(e.target.value)}
              min="1"
              className="h-8"
              placeholder="Qty"
            />
          </div>
          <Button
            onClick={addPlate}
            size="sm"
            className="h-8 px-3"
            disabled={!newPlateWeight || !newPlateQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current plates list */}
      {plates.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Current Plates:</p>
          <div className="space-y-2">
            {plates
              .sort((a, b) => a.weight - b.weight)
              .map((plate) => (
                <div
                  key={plate.id}
                  className="flex items-center justify-between p-2 bg-muted rounded-md"
                >
                  <span className="text-sm font-medium">
                    {plate.weight} {unit}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updatePlateQuantity(plate.id, plate.quantity - 1)}
                        className="h-6 w-6 rounded border border-input bg-background text-xs hover:bg-accent"
                        disabled={plate.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-sm min-w-8 text-center">
                        {plate.quantity}
                      </span>
                      <button
                        onClick={() => updatePlateQuantity(plate.id, plate.quantity + 1)}
                        className="h-6 w-6 rounded border border-input bg-background text-xs hover:bg-accent"
                      >
                        +
                      </button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePlate(plate.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}