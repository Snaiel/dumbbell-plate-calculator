export interface Plate {
  id: string;
  weight: number;
  quantity: number;
}

export interface PlateUsage {
  plateWeight: number;
  quantity: number;
}

export interface WeightResult {
  totalWeight: number;
  plateCombo: PlateUsage[];
  mode: 'single' | 'pair';
}

export type UnitSystem = 'kg' | 'lbs';
export type CalculationMode = 'single' | 'pair';

export interface AppState {
  plates: Plate[];
  handleWeight: number;
  unitSystem: UnitSystem;
  calculationMode: CalculationMode;
}

// Common plate weights for different unit systems
export const COMMON_PLATES = {
  kg: [0.5, 1, 1.25, 1.5, 2, 2.5, 5],
  lbs: [1, 2.5, 5, 10]
} as const;

// Unit conversion constants
export const KG_TO_LBS = 2.20462;
export const LBS_TO_KG = 1 / KG_TO_LBS;