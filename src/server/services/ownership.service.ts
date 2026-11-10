export interface OwnershipInput {
  price: number;
  downPayment?: number;
  interestRate?: number;
  tenureMonths?: number;
  fuelCostPerKm?: number;
  kmPerMonth?: number;
}

export function calculateOwnership(input: OwnershipInput) {
  const price = Number(input.price || 0);
  const down = Number(input.downPayment || 0);
  const principal = Math.max(0, price - down);
  const r = (input.interestRate || 9) / 12 / 100;
  const n = input.tenureMonths || 60;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;
  const fuelMonthly = (input.fuelCostPerKm || 8) * (input.kmPerMonth || 1000);
  return {
    price,
    downPayment: down,
    principal,
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    fuelMonthly: Math.round(fuelMonthly),
    totalMonthly: Math.round(emi + fuelMonthly),
  };
}
