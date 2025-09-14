import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from './components/ui/card';
import { UnitToggle } from './components/UnitToggle';
import { ModeSelector } from './components/ModeSelector';
import { HandleWeightInput } from './components/HandleWeightInput';
import { MaxPlatesInput } from './components/MaxPlatesInput';
import { PlateManager } from './components/PlateManager';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Summary } from './components/Summary';
import { ThemeToggle } from './components/ThemeToggle';
import { calculateWeights, convertWeight } from './utils/calculator';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Plate, UnitSystem, CalculationMode, WeightResult } from './types';
import './App.css';

function App() {
  const [plates, setPlates] = useLocalStorage<Plate[]>('dumbbell-plates', []);
  const [handleWeight, setHandleWeight] = useLocalStorage<number>('dumbbell-handle-weight', 2);
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
      <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-8 max-w-8xl">
        {/* Header */}
        <div className="mb-8">
          {/* Theme toggle at top right on all screen sizes */}
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          {/* Header content centered */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Dumbbell Plate Calculator
            </h1>
            <p className="text-muted-foreground">
              Calculate all possible dumbbell weights from your available plates
            </p>
          </div>
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
            <Card>
              <CardContent>
                <ModeSelector
                  currentMode={calculationMode}
                  onModeChange={setCalculationMode}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <HandleWeightInput
                  handleWeight={handleWeight}
                  onHandleWeightChange={setHandleWeight}
                  unit={unitSystem}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <MaxPlatesInput
                  maxPlates={maxPlatesPerSide}
                  onMaxPlatesChange={setMaxPlatesPerSide}
                  unit={unitSystem}
                />
              </CardContent>
            </Card>
          </div>

          {/* Column 2 - Available Plates */}
          <div className="space-y-6">
            <Card>
              <CardContent>
                <PlateManager
                  plates={plates}
                  onPlatesChange={setPlates}
                  unit={unitSystem}
                />
              </CardContent>
            </Card>
          </div>

          {/* Column 3 - Results */}
          <div className="space-y-6">
            <Card>
              <CardContent>
                <ResultsDisplay
                  results={results}
                  unit={unitSystem}
                  mode={calculationMode}
                />
              </CardContent>
            </Card>
          </div>

          {/* Column 4 - Summary Stats */}
          <div className="space-y-6">
            <Summary
              results={results}
              plates={plates}
              unitSystem={unitSystem}
              maxPlatesPerSide={maxPlatesPerSide}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
