import type { Plate, PlateUsage, WeightResult, CalculationMode } from '../types';

/**
 * Converts weight between kg and lbs
 */
export function convertWeight(weight: number, fromUnit: 'kg' | 'lbs', toUnit: 'kg' | 'lbs'): number {
  if (fromUnit === toUnit) return weight;
  
  if (fromUnit === 'kg' && toUnit === 'lbs') {
    return weight * 2.20462;
  } else {
    return weight / 2.20462;
  }
}

/**
 * Generates all possible combinations of plates for a given set of available plates
 */
function generatePlateCombinations(plates: Plate[], maxPlatesPerSide?: number): PlateUsage[][] {
  const combinations: PlateUsage[][] = [];
  
  function backtrack(index: number, currentCombo: PlateUsage[]) {
    if (index === plates.length) {
      // Check if combination respects max plates per side constraint
      if (maxPlatesPerSide !== undefined) {
        const totalPlates = currentCombo.reduce((sum, usage) => sum + usage.quantity, 0);
        if (totalPlates > maxPlatesPerSide) {
          return;
        }
      }
      combinations.push([...currentCombo]);
      return;
    }
    
    const plate = plates[index];
    
    // Try using 0 to plate.quantity of this plate type
    for (let quantity = 0; quantity <= plate.quantity; quantity++) {
      if (quantity > 0) {
        currentCombo.push({ plateWeight: plate.weight, quantity });
      }
      
      backtrack(index + 1, currentCombo);
      
      if (quantity > 0) {
        currentCombo.pop();
      }
    }
  }
  
  backtrack(0, []);
  return combinations;
}

/**
 * Calculates total weight of plates in a combination
 */
function calculatePlateWeight(plateCombo: PlateUsage[]): number {
  return plateCombo.reduce((total, usage) => total + (usage.plateWeight * usage.quantity), 0);
}

/**
 * Calculates all possible weights for single dumbbell mode
 * Formula: Total Weight = Handle Weight + (2 × Sum of plates on one side)
 */
export function calculateSingleDumbbellWeights(
  plates: Plate[],
  handleWeight: number,
  maxPlatesPerSide?: number
): WeightResult[] {
  const combinations = generatePlateCombinations(plates, maxPlatesPerSide);
  const results: WeightResult[] = [];
  const seenWeights = new Set<number>();
  
  for (const combo of combinations) {
    const plateWeight = calculatePlateWeight(combo);
    const totalWeight = handleWeight + (2 * plateWeight);
    
    // Round to avoid floating point precision issues
    const roundedWeight = Math.round(totalWeight * 100) / 100;
    
    if (!seenWeights.has(roundedWeight)) {
      seenWeights.add(roundedWeight);
      results.push({
        totalWeight: roundedWeight,
        plateCombo: combo,
        mode: 'single'
      });
    }
  }
  
  return results.sort((a, b) => a.totalWeight - b.totalWeight);
}

/**
 * Calculates all possible weights for pair mode
 * Uses only even quantities of plates (divide by 2 for each dumbbell)
 */
export function calculatePairModeWeights(
  plates: Plate[],
  handleWeight: number,
  maxPlatesPerSide?: number
): WeightResult[] {
  // Create modified plates with only even quantities available
  const pairPlates: Plate[] = plates
    .filter(plate => plate.quantity >= 2)
    .map(plate => ({
      ...plate,
      quantity: Math.floor(plate.quantity / 2)
    }));
  
  const combinations = generatePlateCombinations(pairPlates, maxPlatesPerSide);
  const results: WeightResult[] = [];
  const seenWeights = new Set<number>();
  
  for (const combo of combinations) {
    const plateWeight = calculatePlateWeight(combo);
    const totalWeight = handleWeight + (2 * plateWeight);
    
    // Round to avoid floating point precision issues
    const roundedWeight = Math.round(totalWeight * 100) / 100;
    
    if (!seenWeights.has(roundedWeight)) {
      seenWeights.add(roundedWeight);
      results.push({
        totalWeight: roundedWeight,
        plateCombo: combo,
        mode: 'pair'
      });
    }
  }
  
  return results.sort((a, b) => a.totalWeight - b.totalWeight);
}

/**
 * Main calculation function that handles both modes
 */
export function calculateWeights(
  plates: Plate[],
  handleWeight: number,
  mode: CalculationMode,
  maxPlatesPerSide?: number
): WeightResult[] {
  if (mode === 'single') {
    return calculateSingleDumbbellWeights(plates, handleWeight, maxPlatesPerSide);
  } else {
    return calculatePairModeWeights(plates, handleWeight, maxPlatesPerSide);
  }
}

/**
 * Formats weight for display with appropriate precision
 */
export function formatWeight(weight: number, unit: 'kg' | 'lbs'): string {
  const formatted = weight % 1 === 0 ? weight.toString() : weight.toFixed(2);
  return `${formatted} ${unit}`;
}

/**
 * Validates if a plate weight is reasonable
 */
export function isValidPlateWeight(weight: number): boolean {
  return weight > 0 && weight <= 1000 && !isNaN(weight);
}

/**
 * Validates if a quantity is reasonable
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity >= 0 && quantity <= 100;
}