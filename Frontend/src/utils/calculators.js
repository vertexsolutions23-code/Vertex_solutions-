export function formatINR(value) {
  const num = Math.round(Number(value) || 0);
  return `₹ ${num.toLocaleString("en-IN")}`;
}

export function computeEMI({ amount, annualRate, years, months }) {
  const principal = Number(amount) || 0;
  const rate = Number(annualRate) || 0;
  const tenureMonths = (Number(years) || 0) * 12 + (Number(months) || 0);

  if (principal <= 0) {
    return { error: "Please enter a valid loan amount." };
  }
  if (rate < 0 || rate > 36) {
    return { error: "Interest rate must be between 0% and 36%." };
  }
  if (tenureMonths < 1 || tenureMonths > 600) {
    return { error: "Loan tenure must be between 1 month and 50 years." };
  }

  const monthlyRate = rate / 100 / 12;

  let emi;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - principal;

  return {
    emi,
    totalInterest,
    totalPayable,
    principal,
    tenureMonths,
    monthlyRate,
  };
}

const NEW_REGIME_SLABS = [
  { limit: 400000, rate: 0 },
  { limit: 800000, rate: 0.05 },
  { limit: 1200000, rate: 0.1 },
  { limit: 1600000, rate: 0.15 },
  { limit: 2000000, rate: 0.2 },
  { limit: 2400000, rate: 0.25 },
  { limit: Infinity, rate: 0.3 },
];

const SURCHARGE_TIERS = [
  { limit: 5000000, rate: 0 },
  { limit: 10000000, rate: 0.1 },
  { limit: 20000000, rate: 0.15 },
  { limit: 50000000, rate: 0.25 },
  { limit: Infinity, rate: 0.37 },
];

// Section 115BAC(1A): the new regime caps the maximum surcharge at 25%,
// whereas the old regime continues to attract 37% above ₹5 crore.
const SURCHARGE_TIERS_NEW_REGIME = [
  { limit: 5000000, rate: 0 },
  { limit: 10000000, rate: 0.1 },
  { limit: 20000000, rate: 0.15 },
  { limit: Infinity, rate: 0.25 },
];

const NEW_STD_DEDUCTION = 75000;
const OLD_STD_DEDUCTION = 50000;
const SEC_80C_CAP = 150000;
const SEC_80CCD_1B_CAP = 50000;

function slabTax(taxable, slabs, basicExemption) {
  let tax = 0;
  let previous = basicExemption;
  for (const { limit, rate } of slabs) {
    if (taxable <= previous) break;
    const segment = Math.min(taxable, limit) - previous;
    tax += Math.max(0, segment) * rate;
    previous = limit;
  }
  return tax;
}

function surchargeRate(totalIncome, isNewRegime) {
  const tiers = isNewRegime ? SURCHARGE_TIERS_NEW_REGIME : SURCHARGE_TIERS;
  for (const tier of tiers) {
    if (totalIncome <= tier.limit) return tier.rate;
  }
  return isNewRegime ? 0.25 : 0.37;
}

const MIN = (v, cap) => Math.max(0, Math.min(Number(v) || 0, cap));

export function computeTax(input) {
  const regime = input.regime === "old" ? "old" : "new";
  const age = input.age || "under60";

  const salary = Math.max(0, Number(input.salary) || 0);
  const business = Math.max(0, Number(input.business) || 0);
  const houseProperty = Math.max(0, Number(input.houseProperty) || 0);
  const other = Math.max(0, Number(input.other) || 0);

  const grossIncome = salary + business + houseProperty + other;

  const sec80C = MIN(input.sec80C, SEC_80C_CAP);
  const sec80CCD1B = MIN(input.sec80CCD1B, SEC_80CCD_1B_CAP);
  const sec80DCap = age === "under60" ? 25000 : 50000;
  const sec80D = MIN(input.sec80D, sec80DCap);

  const isNewRegime = regime === "new";
  const standardDeduction = salary > 0 ? (isNewRegime ? NEW_STD_DEDUCTION : OLD_STD_DEDUCTION) : 0;
  const sectionDeductions = isNewRegime ? 0 : sec80C + sec80D + sec80CCD1B;

  const taxableIncome = Math.max(0, grossIncome - standardDeduction - sectionDeductions);

  const basicExemption = isNewRegime ? 0 : age === "above80" ? 500000 : age === "60to79" ? 300000 : 250000;

  const taxBeforeRebate = isNewRegime
    ? slabTax(taxableIncome, NEW_REGIME_SLABS, 0)
    : slabTax(
        taxableIncome,
        [
          { limit: 500000, rate: 0.05 },
          { limit: 1000000, rate: 0.2 },
          { limit: Infinity, rate: 0.3 },
        ],
        basicExemption
      );

  const rebate = isNewRegime
    ? taxableIncome <= 1200000 ? Math.min(taxBeforeRebate, 60000) : 0
    : taxableIncome <= 500000 ? Math.min(taxBeforeRebate, 12500) : 0;

  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate);

  const surcharge = taxAfterRebate * surchargeRate(grossIncome, isNewRegime);
  const cess = (taxAfterRebate + surcharge) * 0.04;

  const totalTax = Math.round(taxAfterRebate + surcharge + cess);

  return {
    regime,
    grossIncome,
    standardDeduction,
    sectionDeductions,
    taxableIncome,
    taxBeforeRebate: Math.max(0, taxBeforeRebate),
    rebate,
    surcharge,
    cess,
    totalTax,
    effectiveRate: grossIncome > 0 ? totalTax / grossIncome : 0,
    monthlyTax: totalTax / 12,
    basicExemption,
  };
}