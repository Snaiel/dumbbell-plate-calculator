import { useState, useEffect, useMemo } from 'react';
import { UnitToggle } from './components/UnitToggle';
import { ModeSelector } from './components/ModeSelector';
import { HandleWeightInput } from './components/HandleWeightInput';
import { MaxPlatesInput } from './components/MaxPlatesInput';
import { PlateManager } from './components/PlateManager';
import { ResultsDisplay } from './components/ResultsDisplay';
import { calculateWeights, convertWeight } from './utils/calculator';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Plate, UnitSystem, CalculationMode, WeightResult } from './types';
import './App.css';

function App() {
  const [plates, setPlates] = useLocalStorage<Plate[]>('dumbbell-plates', []);
  const [handleWeight, setHandleWeight] = useLocalStorage<number>('dumbbell-handle-weight', 2.5);
  const [maxPlatesPerSide, setMaxPlatesPerSide] = useLocalStorage<number>('dumbbell-max-plates', 6);
  const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>('dumbbell-unit-system', 'kg');
  const [calculationMode, setCalculationMode] = useLocalStorage<CalculationMode>('dumbbell-calculation-mode', 'single');
  const [previousUnit, setPreviousUnit] = useState<UnitSystem>(unitSystem);

  // Initialize previousUnit from stored unitSystem on first load
  useEffect(() => {
    setPreviousUnit(unitSystem);
  }, []);

  // Convert handle weight when unit system changes
  useEffect(() => {
    if (unitSystem !== previousUnit) {
      const convertedWeight = convertWeight(handleWeight, previousUnit, unitSystem);
      setHandleWeight(Math.round(convertedWeight * 100) / 100);
      
      // Convert all plate weights
      const convertedPlates = plates.map(plate => ({
        ...plate,
        weight: Math.round(convertWeight(plate.weight, previousUnit, unitSystem) * 100) / 100
      }));
      setPlates(convertedPlates);
      
      setPreviousUnit(unitSystem);
    }
  }, [unitSystem, previousUnit, handleWeight, plates, setHandleWeight, setPlates]);

  // Calculate results whenever inputs change
  const results: WeightResult[] = useMemo(() => {
    if (plates.length === 0) return [];
    return calculateWeights(plates, handleWeight, calculationMode, maxPlatesPerSide);
  }, [plates, handleWeight, calculationMode, maxPlatesPerSide]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dumbbell Plate Calculator
          </h1>
          <p className="text-muted-foreground">
            Calculate all possible dumbbell weights from your available plates
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex justify-center mb-8">
          <UnitToggle
            currentUnit={unitSystem}
            onUnitChange={setUnitSystem}
          />
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-6">
          {/* Column 1 - Mode and Handle Settings */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <ModeSelector
                currentMode={calculationMode}
                onModeChange={setCalculationMode}
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <HandleWeightInput
                handleWeight={handleWeight}
                onHandleWeightChange={setHandleWeight}
                unit={unitSystem}
              />
            </div>

            <div className="bg-card border rounded-lg p-6">
              <MaxPlatesInput
                maxPlates={maxPlatesPerSide}
                onMaxPlatesChange={setMaxPlatesPerSide}
                unit={unitSystem}
              />
            </div>
          </div>

          {/* Column 2 - Available Plates */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <PlateManager
                plates={plates}
                onPlatesChange={setPlates}
                unit={unitSystem}
              />
            </div>
          </div>

          {/* Column 3 - Results */}
          <div className="space-y-6">
            <div className="bg-card border rounded-lg p-6">
              <ResultsDisplay
                results={results}
                unit={unitSystem}
                mode={calculationMode}
              />
            </div>
          </div>

          {/* Column 4 - Summary Stats */}
          <div className="space-y-6">
            {results.length > 0 && (
              <div className="bg-muted/50 border rounded-lg p-4">
                <h4 className="font-medium mb-2">Summary</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Lightest:</span>
                    <div className="font-medium">
                      {results[0]?.totalWeight} {unitSystem}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Heaviest:</span>
                    <div className="font-medium">
                      {results[results.length - 1]?.totalWeight} {unitSystem}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total plates:</span>
                    <div className="font-medium">
                      {plates.reduce((sum, plate) => sum + plate.quantity, 0)}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Combinations:</span>
                    <div className="font-medium">
                      {results.length}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Max plates/side:</span>
                    <div className="font-medium">
                      {maxPlatesPerSide}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
