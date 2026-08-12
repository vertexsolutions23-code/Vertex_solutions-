import { useState } from "react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { PageHero, CtaBanner } from "../components/PageBits.jsx";
import { computeEMI, formatINR } from "../utils/calculators.js";

const EMPTY = { amount: "", rate: "", years: "", months: "0" };

function validate(values) {
  const errors = {};
  const amount = Number(values.amount);

  if (!values.amount.trim()) errors.amount = "Please enter the loan amount";
  else if (!Number.isFinite(amount) || amount <= 0) errors.amount = "Enter a value greater than 0";
  else if (amount > 10000000000) errors.amount = "Amount is too large";

  if (!values.rate.trim()) errors.rate = "Please enter the interest rate";
  else {
    const rate = Number(values.rate);
    if (!Number.isFinite(rate) || rate < 0 || rate > 36) errors.rate = "Rate must be between 0% and 36%";
  }

  const years = Number(values.years) || 0;
  const months = Number(values.months) || 0;
  const totalMonths = years * 12 + months;

  if (!values.years.trim()) errors.years = "Enter the loan tenure";
  else if (!Number.isFinite(years) || years < 0 || years > 50) errors.years = "Years must be between 0 and 50";
  else if (totalMonths < 1) errors.months = "Tenure must be at least 1 month";
  else if (totalMonths > 600) errors.years = "Tenure cannot exceed 50 years";

  return errors;
}

export default function EMICalculator() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er));
  };

  const errorsAll = validate(values);
  const hasInput = Object.values(values).some((v) => v !== "" && v !== "0");
  const showResults = hasInput && Object.keys(errorsAll).length === 0;
  const result = showResults
    ? computeEMI({
        amount: values.amount,
        annualRate: values.rate,
        years: values.years,
        months: values.months,
      })
    : null;

  const principalPct = result && result.totalPayable > 0 ? (result.principal / result.totalPayable) * 100 : 50;
  const interestPct = Math.max(0, 100 - principalPct);

  return (
    <>
      <Seo
        title="EMI Calculator | Loan EMI, Interest & Total Payable | Vertex Solutions"
        description="Calculate your monthly loan EMI, total interest and total amount payable with Vertex Solutions' free EMI calculator. Plan your business or personal loan repayments."
        path="/calculators/emi"
      />

      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Calculators", null],
          ["EMI Calculator", null],
        ]}
        title="EMI <em>Calculator</em>"
        lead="Work out your monthly EMI, total interest and the full amount you will repay — before you commit to a loan."
      />

      <section style={{ paddingTop: 72 }}>
        <div className="container">
          <div className="calc-grid">
            <Reveal as="div" className="calc-card">
              <div className="eyebrow">Loan Details</div>
              <h3 className="calc-title">Enter your loan details</h3>

              <div className="calc-form">
                <div className="form-field">
                  <label htmlFor="emi-amount">Loan Amount (₹) *</label>
                  <input
                    id="emi-amount"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    step="1000"
                    placeholder="e.g. 500000"
                    value={values.amount}
                    onChange={setField("amount")}
                    aria-invalid={!!errors.amount}
                  />
                  {errors.amount && <span className="err">{errors.amount}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="emi-rate">Interest Rate (% p.a.) *</label>
                  <input
                    id="emi-rate"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="36"
                    step="0.1"
                    placeholder="e.g. 10.5"
                    value={values.rate}
                    onChange={setField("rate")}
                    aria-invalid={!!errors.rate}
                  />
                  {errors.rate && <span className="err">{errors.rate}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="emi-years">Tenure — Years *</label>
                  <input
                    id="emi-years"
                    type="number"
                    inputMode="numeric"
                    min="0"
                    max="50"
                    step="1"
                    placeholder="e.g. 5"
                    value={values.years}
                    onChange={setField("years")}
                    aria-invalid={!!errors.years}
                  />
                  {errors.years && <span className="err">{errors.years}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="emi-months">Tenure — Months</label>
                  <select
                    id="emi-months"
                    value={values.months}
                    onChange={setField("months")}
                    aria-invalid={!!errors.months}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>
                        {i} month{i === 1 ? "" : "s"}
                      </option>
                    ))}
                  </select>
                  {errors.months && <span className="err">{errors.months}</span>}
                </div>
              </div>
            </Reveal>

            <Reveal as="div" className="calc-results">
              {result ? (
                <>
                  <div>
                    <span className="calc-result-label">Monthly EMI</span>
                    <div className="calc-result-value">{formatINR(result.emi)}</div>
                  </div>

                  <div className="calc-bar" aria-label={`${Math.round(principalPct)}% principal, ${Math.round(interestPct)}% interest`}>
                    <span className="p" style={{ width: `${principalPct}%` }} />
                    <span className="i" style={{ width: `${interestPct}%` }} />
                  </div>
                  <div className="calc-bar-key">
                    <span><i className="k-p" />Principal</span>
                    <span><i className="k-i" />Total Interest</span>
                  </div>

                  <div className="calc-lines">
                    <div><span>Principal Amount</span><b>{formatINR(result.principal)}</b></div>
                    <div><span>Total Interest</span><b>{formatINR(result.totalInterest)}</b></div>
                    <div className="t"><span>Total Amount Payable</span><b>{formatINR(result.totalPayable)}</b></div>
                  </div>

                  <p className="calc-note">
                    {result.tenureMonths} monthly payments · figures are indicative and rounded to the nearest rupee.
                  </p>
                </>
              ) : (
                <div className="calc-empty">
                  <span className="calc-result-label">Results</span>
                  <p>Enter loan amount, interest rate and tenure above to see your monthly EMI, total interest and total amount payable.</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        heading="Could a fresh credit structure lower your EMI?"
        sub="Our advisors help you compare loan options, subsidy-linked credit and repayment planning before you commit."
      />
    </>
  );
}