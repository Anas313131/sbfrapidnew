export const TMT_DENSITY_CONSTANT = 162;

export type CalculatorInput = {
  diameterMm: number;
  lengthM: number;
  quantity: number;
  ratePerKg?: number;
};

export type CalculatorResult = {
  weightPerMetreKg: number;
  totalLengthM: number;
  totalWeightKg: number;
  totalCost?: number;
};

export function calculateTmtEstimate({ diameterMm, lengthM, quantity, ratePerKg }: CalculatorInput): CalculatorResult {
  const weightPerMetreKg = (diameterMm * diameterMm) / TMT_DENSITY_CONSTANT;
  const totalLengthM = lengthM * quantity;
  const totalWeightKg = weightPerMetreKg * totalLengthM;
  const totalCost = ratePerKg !== undefined ? totalWeightKg * ratePerKg : undefined;

  return { weightPerMetreKg, totalLengthM, totalWeightKg, totalCost };
}
