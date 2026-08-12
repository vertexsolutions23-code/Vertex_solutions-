import { useState } from "react";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";
import { PageHero, CtaBanner } from "../components/PageBits.jsx";
import { computeTax, formatINR } from "../utils/calculators.js";

const EMPTY = { salary: "", business: "", houseProperty: "", other: "", sec80C: "", sec80D: "", sec80CCD1B: "" };
const NEW_STD_DEDUCTION = 75000;
const OLD_STD_DEDUCTION = 50000;
const MAX_80C = 150000;
const MAX_80D = 50000;
const MAX_80CCD1B = 50000;

const REGIMES = [
  { id: "new", label: "New Regime" },
  { id: "old", label: "Old Regime" },
];

const AGES = [
  { id: "under60", label: "Below 60 years" },
  { id: "60to79", label: "60 – 79 years" },
  { id: "above80", label: "80 years & above" },
];

function validateIncome(values) {
  const errors = {};
  ["salary", "business", "houseProperty", "other"].forEach((key) => {
    const raw = String(values[key] ?? "").trim();
    if (raw !== "") {
      const n = Number(raw);
      if (!Number.isFinite(n) || n < 0 || n > 100000000000) {
        errors[key] = "Enter a valid amount (0 or more)";
      }
    }
  });
  return errors;
}

export default function TaxCalculator() {
  const [regime, setRegime] = useState("new");
  const [age, setAge] = useState("under60");
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er));
  };

  const incomeErrors = validateIncome(values);
  const hasIncome = ["salary", "business", "houseProperty", "other"].some((k) => String(values[k] ?? "").trim() !== "");
  const isValid = hasIncome && Object.keys(incomeErrors).length === 0;

  const result = isValid
    ? computeTax({
        regime,
        age,
        salary: values.salary,
        business: values.business,
        houseProperty: values.houseProperty,
        other: values.other,
        sec80C: regime === "old" ? values.sec80C : 0,
        sec80D: regime === "old" ? values.sec80D : 0,
        sec80CCD1B: regime === "old" ? values.sec80CCD1B : 0,
      })
    : null;

  const stdDeduction = result?.standardDeduction ?? (regime === "new" ? NEW_STD_DEDUCTION : OLD_STD_DEDUCTION);

  const rows = (() => {
    if (!result) return [];
    const list = [
      ["Gross Annual Income", formatINR(result.grossIncome)],
      ["Standard Deduction", result.standardDeduction ? `− ${formatINR(result.standardDeduction)}` : "—"],
    ];
    if (result.regime === "old") {
      list.push(["Section 80C / 80CCD(1B)", result.sectionDeductions ? `− ${formatINR(result.sectionDeductions)}` : "—"]);
    }
    list.push(
      ["Taxable Income", formatINR(result.taxableIncome)],
      ["Tax Before Rebate", formatINR(result.taxBeforeRebate)],
      ["87A Rebate", result.rebate ? `− ${formatINR(result.rebate)}` : "—"],
      ["Surcharge", result.surcharge ? formatINR(result.surcharge) : "—"],
      ["Health & Education Cess (4%)", result.cess ? formatINR(result.cess) : "—"]
    );
    return list;
  })();

  return (
    <>
      <Seo
        title="Advanced Tax Calculator | Income Tax Estimate (Old vs New Regime) | Vertex Solutions"
        description="Estimate your annual income tax under the old and new regimes with Vertex Solutions' advanced tax calculator — slabs, 87A rebate, surcharge and cess included."
        path="/calculators/tax"
      />

      <PageHero
        crumbs={[
          ["Home", "/"],
          ["Calculators", null],
          ["Advanced Tax Calculator", null],
        ]}
        title="Advanced Tax <em>Calculator</em>"
        lead="Estimate your income tax for FY 2026-27 (AY 2027-28) under both regimes — slabs, 87A rebate, surcharge and cess included."
      />

      <section style={{ paddingTop: 72 }}>
        <div className="container">
          <div className="calc-grid">
            <Reveal as="div" className="calc-card">
              <div className="eyebrow">Tax Regime</div>

              <div className="calc-toggle" role="group" aria-label="Choose tax regime">
                {REGIMES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={regime === r.id ? "active" : ""}
                    onClick={() => setRegime(r.id)}
                    aria-pressed={regime === r.id}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="form-field" style={{ marginTop: 18 }}>
                <label htmlFor="tax-age">Age Group</label>
                <select id="tax-age" value={age} onChange={(e) => setAge(e.target.value)}>
                  {AGES.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              <h3 className="calc-title" style={{ marginTop: 30 }}>Annual income (₹)</h3>

              <div className="calc-form">
                <div className="form-field">
                  <label htmlFor="tax-salary">Salary Income *</label>
                  <input id="tax-salary" type="number" inputMode="numeric" min="0" step="1000" placeholder="e.g. 900000" value={values.salary} onChange={setField("salary")} aria-invalid={!!errors.salary} />
                  {errors.salary && <span className="err">{errors.salary}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="tax-business">Business / Profession</label>
                  <input id="tax-business" type="number" inputMode="numeric" min="0" step="1000" placeholder="e.g. 400000" value={values.business} onChange={setField("business")} aria-invalid={!!errors.business} />
                  {errors.business && <span className="err">{errors.business}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="tax-hp">House Property (net)</label>
                  <input id="tax-hp" type="number" inputMode="numeric" min="0" step="1000" placeholder="e.g. 60000" value={values.houseProperty} onChange={setField("houseProperty")} aria-invalid={!!errors.houseProperty} />
                  {errors.houseProperty && <span className="err">{errors.houseProperty}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="tax-other">Other Sources</label>
                  <input id="tax-other" type="number" inputMode="numeric" min="0" step="1000" placeholder="e.g. 50000" value={values.other} onChange={setField("other")} aria-invalid={!!errors.other} />
                  {errors.other && <span className="err">{errors.other}</span>}
                </div>
              </div>

              {regime === "new" && (
                <p className="calc-hint">
                  Standard deduction of {formatINR(NEW_STD_DEDUCTION)} is auto-applied on salary income under the new regime.
                </p>
              )}

              {regime === "old" && (
                <>
                  <h3 className="calc-title" style={{ marginTop: 30 }}>Deductions (old regime only)</h3>
                  <div className="calc-form">
                    <div className="form-field">
                      <label htmlFor="tax-80c">Section 80C (max ₹ 1,50,000)</label>
                      <input id="tax-80c" type="number" inputMode="numeric" min="0" max={MAX_80C} step="1000" placeholder="e.g. 120000" value={values.sec80C} onChange={setField("sec80C")} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="tax-80d">Section 80D — Health Insurance</label>
                      <input id="tax-80d" type="number" inputMode="numeric" min="0" max={MAX_80D} step="1000" placeholder={age === "under60" ? "max ₹ 25,000" : "max ₹ 50,000"} value={values.sec80D} onChange={setField("sec80D")} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="tax-80ccd">80CCD(1B) — NPS (max ₹ 50,000)</label>
                      <input id="tax-80ccd" type="number" inputMode="numeric" min="0" max={MAX_80CCD1B} step="1000" placeholder="e.g. 30000" value={values.sec80CCD1B} onChange={setField("sec80CCD1B")} />
                    </div>
                  </div>
                  <p className="calc-hint">
                    Standard deduction of {formatINR(OLD_STD_DEDUCTION)} is auto-applied on salary income. Section 80C, 80D and 80CCD(1B) are capped as per limits.
                  </p>
                </>
              )}
            </Reveal>

            <Reveal as="div" className="calc-results">
              {result ? (
                <>
                  <div>
                    <span className="calc-result-label">Total Tax Payable / Year</span>
                    <div className="calc-result-value">{formatINR(result.totalTax)}</div>
                    <div className="calc-sub-result">≈ {formatINR(result.monthlyTax)} per month</div>
                  </div>

                  <div className="calc-lines">
                    {rows.map(([label, value]) => (
                      <div key={label}>
                        <span>{label}</span>
                        <b>{value}</b>
                      </div>
                    ))}
                  </div>

                  <div className="calc-bar-key">
                    <span>Effective tax rate</span>
                    <span><b>{(result.effectiveRate * 100).toFixed(2)}%</b></span>
                  </div>

                  <p className="calc-note">
                    {result.totalTax === 0
                      ? "Your income is within the 87A rebate limit — no tax is payable under this regime."
                      : [
                          result.rebate > 0 ? `Includes an 87A rebate of ${formatINR(result.rebate)}.` : "",
                          result.surcharge > 0 ? "Surcharge included (income above ₹ 50 lakh)." : "",
                          "Figures are indicative.",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                  </p>
                </>
              ) : (
                <div className="calc-empty">
                  <span className="calc-result-label">Estimate</span>
                  <p>Enter your annual income details to see an instant tax estimate under the {regime === "new" ? "new" : "old"} regime.</p>
                  {hasIncome && <p className="err" style={{ justifyContent: "flex-start" }}>Please fix the highlighted fields above.</p>}
                </div>
              )}
            </Reveal>
          </div>

          <p className="calc-disclaimer">
            This calculator provides an indicative estimate for resident individuals for FY 2026-27 (AY 2027-28). Capital gains, special-rate incomes, HRA and other exemptions are not considered. Marginal relief at the surcharge thresholds (₹ 50 lakh, ₹ 1 crore, ₹ 2 crore, ₹ 5 crore) is also not applied. For a definitive computation, consult our advisors.
          </p>
        </div>
      </section>

      <CtaBanner
        heading="Prefer a professional to handle your filing?"
        sub="Our chartered-accountant-led team offers end-to-end income tax filing and planning advice."
      />
    </>
  );
}