import { useState, useRef, useEffect } from "react";

function useInView(ref) {
  const [v, setV] = useState(false);
  useEffect(() => { if (!ref.current) return; const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 }); o.observe(ref.current); return () => o.disconnect(); }, [ref]); return v;
}
function Reveal({ children, delay = 0, style = {} }) {
  const r = useRef(null); const v = useInView(r);
  return <div ref={r} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(14px)", transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`, ...style }}>{children}</div>;
}

const C = { bg: "#faf8f5", card: "#fff", alt: "#f5f1ec", border: "#e4ddd5", accent: "#C84B31", accentSoft: "rgba(200,75,49,0.05)", accentBdr: "rgba(200,75,49,0.18)", text: "#1a1a1a", mid: "#555", muted: "#8a8480", dim: "#b5ada5" };
const F = { serif: "'Newsreader', Georgia, serif", sans: "'DM Sans', sans-serif" };

function Lbl({ children }) { return <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2.5px", color: C.accent, fontWeight: 700, marginBottom: "10px" }}>{children}</div>; }
function Src({ children, href }) { return <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: "10px", color: C.accent, textDecoration: "none", borderBottom: `1px dotted ${C.accentBdr}` }}>{children}</a>; }
function Div() { return <div style={{ height: "1px", background: C.border, margin: "44px 0" }} />; }

export default function App() {
  const [tab, setTab] = useState("westpac");
  const [sh, setSh] = useState(0);

  const stakeholders = [
    { role: "CDDAO", fullRole: "Chief Data, Digital & AI Officer — a new C-suite role reporting directly to the CEO, responsible for AI strategy, data governance, and digital transformation", name: "Andrew McMullan (appointed 2025)", cares: "Proving the CDDAO function's value. Needs early wins showing AI can accelerate UNITE. Wants to differentiate from CBA's Anthropic play.", position: "Open-weight gives his team full model visibility and control. A governance advantage he can take to the board. Frame Mistral as what makes his function visionary, not reactive to CBA.", risk: "New in role. May default to safe vendor choices. Show Mistral reduces risk." },
    { role: "Group Head, Financial Crime", fullRole: "Owns scam prevention, AML compliance, and suspicious matter reporting across the group", name: "Financial Crime & Compliance Division", cares: "Applying generative AI to scam/fraud detection without creating regulatory exposure around sensitive transaction data.", position: "On-prem Mistral = data never leaves Westpac's perimeter. No third-party access, no regulatory grey area. Pilot on historical scam patterns without external data transmission.", risk: "Compliance teams are conservative. Needs Legal + Risk sign-off. Partner with Accenture's financial crime practice for the compliance wrapper." },
    { role: "CISO", fullRole: "Accountable for CPS 234 (Information Security) and CPS 230 (Operational Risk) compliance", name: "Security & Risk Division", cares: "Model auditability, supply chain risk, APRA compliance. Proprietary models are black boxes.", position: "Open-weight = inspectable. Westpac's security team audits architecture, runs adversarial testing, verifies behaviour before deployment. Satisfies APRA CPS 234 without vendor-trust dependency.", risk: "Will require pen testing and security review. Build into pilot timeline." },
    { role: "CFO", fullRole: "Accountable for ROI on the $3B+ UNITE programme and cost-to-income ratio improvement", name: "Finance Division", cares: "Measurable AI returns. Operating costs up 9% to $11.9B (FY24). Board pressure to justify spend.", position: "$237M stopped from reaching scammers (FY24). AI-powered detection improvement = further reduction. MoE architecture (41B active / 675B total) = frontier reasoning at lower inference cost than dense competitors.", risk: "Will benchmark against CBA's Anthropic deal economics." },
  ];

  return (
    <div style={{ fontFamily: F.sans, background: C.bg, color: C.text, minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px" }}>

        {/* ===== PERSONAL INTRO ===== */}
        <Reveal>
          <div style={{ marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "2px", background: C.accent }} />
              <span style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2.5px", color: C.accent, fontWeight: 700 }}>Application — AI Deployment Strategist</span>
            </div>
            <div style={{ fontFamily: F.serif, fontSize: "15px", color: C.text, lineHeight: 1.8, marginBottom: "8px" }}>
              Instead of a cover letter, I started where I'd start on day one: identifying Mistral's highest-value accounts in Australia, mapping the stakeholders, architecting a sovereign deployment for a specific problem, designing the pilot scorecard, and scoping the expansion path.
            </div>
            <div style={{ fontSize: "12px", color: C.muted, lineHeight: 1.6, marginBottom: "14px" }}>
              This is a 2–3 minute skim. I know your time is valuable and I appreciate you spending any of it here.
            </div>
            <div style={{ fontSize: "12px", color: C.dim }}>Gaurav Devsarmah · April 2026</div>
          </div>
        </Reveal>

        {/* ===== COMPETITIVE LANDSCAPE ===== */}
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "10px" }}>
            {[
              { co: "OpenAI", items: ["Sydney office (2025)", "CBA partnership", "Govt engagement"], color: "#16a34a", tag: "Established" },
              { co: "Anthropic", items: ["Sydney office (Mar '26)", "Govt MOU (Apr '26)", "CBA, Canva, Quantium"], color: "#16a34a", tag: "Accelerating" },
              { co: "Mistral", items: ["Open-weight, auditable", "On-prem / air-gapped", "European sovereignty"], color: C.accent, tag: "Differentiated" },
            ].map((c, i) => (
              <div key={i} style={{ padding: "14px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: "14px", fontWeight: 700, marginBottom: "8px" }}>{c.co}</div>
                {c.items.map((it, j) => <div key={j} style={{ fontSize: "11px", color: C.mid, lineHeight: 1.6, paddingLeft: "8px", borderLeft: `2px solid ${i === 2 ? C.accentBdr : C.border}`, marginBottom: "3px" }}>{it}</div>)}
                <div style={{ marginTop: "8px", fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: c.color }}>{c.tag}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "11px", color: C.dim, marginBottom: "36px" }}>
            <Src href="https://www.industry.gov.au/news/australian-government-has-signed-memorandum-understanding-mou-global-ai-innovator-anthropic">Dept of Industry: Anthropic MOU</Src> · <Src href="https://www.computerweekly.com/news/366625256/How-Mistral-is-driving-growth-through-open-source-and-enterprise-AI">Computer Weekly: Mistral APAC</Src>
          </div>
        </Reveal>

        {/* ===== TABS ===== */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "36px", borderBottom: `1px solid ${C.border}` }}>
          {[["westpac", "Westpac"], ["dod", "Dept of Defence"]].map(([k, v]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: "10px 20px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600,
              background: "transparent", color: tab === k ? C.accent : C.dim,
              borderBottom: tab === k ? `2px solid ${C.accent}` : "2px solid transparent", marginBottom: "-1px",
            }}>{v}</button>
          ))}
        </div>

        {tab === "westpac" ? (<>
          {/* ===== THE PROBLEM ===== */}
          <Reveal>
            <Lbl>The Problem</Lbl>
            <div style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 400, lineHeight: 1.3, marginBottom: "12px" }}>
              Westpac spent <span style={{ color: C.accent }}>$500M+ over five years</span> on scam and fraud prevention. AI could accelerate detection, but the data can't leave the building.
            </div>
            <div style={{ fontSize: "13px", color: C.mid, lineHeight: 1.7, marginBottom: "8px" }}>
              Westpac stopped $237M reaching scammers in FY24 and $300M+ in 2025, while adding 50 new fraud team members. But generative AI adoption for financial crime is constrained: AUSTRAC's outsourcing guidance requires banks to understand legal restrictions when sharing data with third-party providers, including around suspicious matter reports and tipping-off provisions. CBA competitor NAB has publicly cited these constraints as a barrier to deploying generative AI for financial crime detection.
            </div>
            <div style={{ fontSize: "11px", color: C.dim, marginBottom: "24px" }}>
              <Src href="https://www.westpac.com.au/about-westpac/media/media-releases/2025/26-september/">Westpac: Scam Defences (Sep 2025)</Src> · <Src href="https://www.austrac.gov.au/amlctf-reform/current-reporting-entities/tipping">AUSTRAC: Tipping Off Guidance</Src> · <Src href="https://www.reuters.com">Reuters: Westpac FY24 Results</Src>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "32px" }}>
              {[{ n: "$92B", l: "Revenue" }, { n: "35K+", l: "Employees" }, { n: "$500M+", l: "Fraud Spend (5yr)" }, { n: "$3B+", l: "UNITE Programme" }].map((d, i) => (
                <div key={i} style={{ textAlign: "center", padding: "12px 6px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.serif, fontSize: "20px", fontWeight: 400 }}>{d.n}</div>
                  <div style={{ fontSize: "9px", color: C.muted, textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>{d.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Div />

          {/* ===== ARCHITECTURE DIAGRAM ===== */}
          <Reveal>
            <Lbl>Sovereign Deployment Architecture — Scam Detection</Lbl>
            <div style={{ fontFamily: F.serif, fontSize: "18px", fontWeight: 400, lineHeight: 1.3, marginBottom: "16px" }}>How Mistral deploys inside Westpac's perimeter for real-time scam pattern detection.</div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "24px", marginBottom: "12px" }}>
              {/* Perimeter header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", paddingBottom: "10px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a" }} />
                  <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: C.text }}>Westpac Secure Perimeter</span>
                </div>
                <span style={{ fontSize: "9px", color: C.dim, fontStyle: "italic" }}>On-prem · Azure Stack HCI · No data leaves</span>
              </div>

              {/* Three column flow */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 24px 1fr 24px 1fr", alignItems: "stretch", gap: "0", marginBottom: "16px" }}>
                {/* Column 1: Data Sources */}
                <div>
                  <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: C.muted, fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>Ingest</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[
                      { l: "Transaction Feeds", d: "Real-time payments, transfers" },
                      { l: "Historical SARs", d: "Known fraud patterns, outcomes" },
                      { l: "Customer Profiles", d: "KYC, behavioural baselines" },
                      { l: "BioCatch Signals", d: "Cross-bank behavioural intel" },
                    ].map((s, i) => (
                      <div key={i} style={{ padding: "8px 10px", background: C.alt, borderRadius: "6px", border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: C.text }}>{s.l}</div>
                        <div style={{ fontSize: "9px", color: C.muted, marginTop: "1px" }}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow 1 */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "16px", height: "2px", background: C.accent, position: "relative" }}>
                    <div style={{ position: "absolute", right: "-3px", top: "-3px", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `6px solid ${C.accent}` }} />
                  </div>
                </div>

                {/* Column 2: Mistral Stack */}
                <div>
                  <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: C.accent, fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>Mistral Stack</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ padding: "10px", background: C.accentSoft, borderRadius: "6px", border: `1.5px solid ${C.accentBdr}` }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: C.accent }}>Forge Pipeline</div>
                      <div style={{ fontSize: "9px", color: C.mid, marginTop: "2px" }}>Custom fine-tuning on Westpac's scam patterns. Proprietary data stays on-prem.</div>
                    </div>
                    <div style={{ padding: "10px", background: C.accentSoft, borderRadius: "6px", border: `1.5px solid ${C.accentBdr}` }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: C.accent }}>Large 3 — MoE Engine</div>
                      <div style={{ fontSize: "9px", color: C.mid, marginTop: "2px" }}>675B total · 41B active per token. Anomaly reasoning, multi-step pattern analysis.</div>
                    </div>
                    <div style={{ padding: "10px", background: C.accentSoft, borderRadius: "6px", border: `1.5px solid ${C.accentBdr}` }}>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: C.accent }}>Le Chat Enterprise</div>
                      <div style={{ fontSize: "9px", color: C.mid, marginTop: "2px" }}>Analyst copilot. Case investigation, policy lookup, report drafting.</div>
                    </div>
                  </div>
                </div>

                {/* Arrow 2 */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: "16px", height: "2px", background: C.accent, position: "relative" }}>
                    <div style={{ position: "absolute", right: "-3px", top: "-3px", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `6px solid ${C.accent}` }} />
                  </div>
                </div>

                {/* Column 3: Outputs */}
                <div>
                  <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: C.muted, fontWeight: 700, marginBottom: "8px", textAlign: "center" }}>Output</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {[
                      { l: "Real-time Alerts", d: "Flagged transactions → fraud analyst queue" },
                      { l: "Risk Scoring", d: "Dynamic account risk, adaptive thresholds" },
                      { l: "Investigation Assist", d: "AI-drafted SARs, evidence summaries" },
                      { l: "Exec Reporting", d: "Detection rates, false positive reduction" },
                    ].map((s, i) => (
                      <div key={i} style={{ padding: "8px 10px", background: C.alt, borderRadius: "6px", border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: "11px", fontWeight: 700, color: C.text }}>{s.l}</div>
                        <div style={{ fontSize: "9px", color: C.muted, marginTop: "1px" }}>{s.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Governance layer */}
              <div style={{ padding: "10px 14px", background: C.alt, borderRadius: "6px", border: `1px solid ${C.border}`, marginBottom: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: C.text }}>Governance & Audit Layer</div>
                    <div style={{ fontSize: "9px", color: C.muted, marginTop: "2px" }}>Open-weight model inspection · Adversarial testing · Bias monitoring · Full audit trail · APRA-ready</div>
                  </div>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {["CPS 234", "CPS 230", "AML/CTF", "SOCI"].map(b => (
                      <span key={b} style={{ fontSize: "8px", padding: "2px 6px", borderRadius: "3px", background: C.card, color: C.muted, fontWeight: 600, border: `1px solid ${C.border}` }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: "10px", color: C.dim, fontStyle: "italic", marginBottom: "32px" }}>All models deploy within Westpac's infrastructure. Forge trains on proprietary data without external transmission. Model weights auditable by internal security teams.</div>
          </Reveal>

          {/* ===== MOE ENGINE DEEP DIVE ===== */}
          <Reveal>
            <div style={{ background: C.card, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "24px", marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                <div>
                  <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2.5px", color: C.accent, fontWeight: 700, marginBottom: "4px" }}>Zooming In — Large 3 MoE Engine</div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>How Mixture-of-Experts routes transaction analysis at scale</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: C.accent, fontFamily: F.serif }}>41B</div>
                  <div style={{ fontSize: "8px", color: C.muted, textTransform: "uppercase", letterSpacing: "1px" }}>active of 675B</div>
                </div>
              </div>

              {/* Transaction input */}
              <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                {["$45K wire transfer → unusual jurisdiction", "Structured deposits × 4 in 24hrs", "Account dormant 18mo → sudden activity", "Normal payroll transfer"].map((tx, i) => (
                  <div key={i} style={{ flex: 1, padding: "8px", background: i === 3 ? C.alt : C.accentSoft, borderRadius: "6px", border: `1px solid ${i === 3 ? C.border : C.accentBdr}`, fontSize: "9px", color: i === 3 ? C.muted : C.accent, fontWeight: 500, lineHeight: 1.4 }}>{tx}</div>
                ))}
              </div>

              {/* Router */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "4px 0 4px 0" }}>
                <svg width="100%" height="32" viewBox="0 0 660 32">
                  {[82, 247, 412, 577].map((x, i) => (
                    <g key={i}>
                      <line x1={x} y1="0" x2={330} y2="28" stroke={i === 3 ? C.dim : C.accent} strokeWidth="1" strokeDasharray={i === 3 ? "3,3" : "none"} opacity={i === 3 ? 0.4 : 0.6} />
                    </g>
                  ))}
                  <rect x="280" y="20" width="100" height="12" rx="3" fill={C.accent} />
                  <text x="330" y="29" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="700" fontFamily="DM Sans, sans-serif">ROUTER NETWORK</text>
                </svg>
              </div>

              {/* Expert panels */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "3px", marginBottom: "8px" }}>
                {Array.from({ length: 8 }, (_, i) => {
                  const active = [0, 2, 5].includes(i);
                  return (
                    <div key={i} style={{
                      padding: "8px 4px", borderRadius: "5px", textAlign: "center",
                      background: active ? C.accentSoft : C.alt,
                      border: `1.5px solid ${active ? C.accentBdr : "transparent"}`,
                    }}>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: active ? C.accent : C.dim }}>E{i + 1}</div>
                      <div style={{ fontSize: "7px", color: active ? C.accent : C.dim, marginTop: "2px" }}>{active ? "ACTIVE" : "idle"}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: "9px", color: C.muted, textAlign: "center", marginBottom: "14px" }}>Per token, only relevant expert sub-networks activate. Idle experts consume zero compute.</div>

              {/* Output arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "4px 0 8px 0" }}>
                <div style={{ width: "2px", height: "16px", background: C.accent, position: "relative" }}>
                  <div style={{ position: "absolute", bottom: "-4px", left: "-3px", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: `6px solid ${C.accent}` }} />
                </div>
              </div>

              {/* Result */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px" }}>
                {[
                  { l: "Frontier Accuracy", v: "Same reasoning capability as full 675B dense model", icon: "🎯" },
                  { l: "6× Cost Efficiency", v: "Only 41B params computed per token vs 675B dense forward pass", icon: "⚡" },
                  { l: "Scalable Throughput", v: "Millions of daily transactions at sustainable inference cost", icon: "📈" },
                ].map((r, i) => (
                  <div key={i} style={{ padding: "10px", background: C.alt, borderRadius: "6px", textAlign: "center" }}>
                    <div style={{ fontSize: "14px", marginBottom: "3px" }}>{r.icon}</div>
                    <div style={{ fontSize: "10px", fontWeight: 700, color: C.text }}>{r.l}</div>
                    <div style={{ fontSize: "9px", color: C.muted, marginTop: "2px", lineHeight: 1.4 }}>{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontSize: "10px", color: C.dim, fontStyle: "italic", marginBottom: "32px" }}>For a bank processing millions of transactions daily, MoE means Westpac gets frontier-level reasoning without paying for a full dense model inference on every query. The router learns which experts matter for which transaction types through Forge fine-tuning.</div>
          </Reveal>

          <Div />

          {/* ===== WHY MISTRAL (TECHNICAL) ===== */}
          <Reveal>
            <Lbl>Why Mistral's Architecture Fits This Problem</Lbl>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "32px" }}>
              {[
                { icon: "⚡", t: "Mixture-of-Experts", d: "Large 3 activates 41B of 675B params per token. For millions of daily transactions, this means frontier reasoning at a fraction of dense-model inference cost." },
                { icon: "🔍", t: "Open Weights", d: "Inspectable architecture. Westpac's security team can audit, adversarially test, and verify model behaviour before deployment. No vendor black box." },
                { icon: "🏛️", t: "On-Prem + Forge", d: "Full stack on Azure Stack HCI or bare metal. Forge trains custom models on proprietary scam data. Zero external data transmission. APRA CPS 234 satisfied." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>{item.icon}</div>
                  <div style={{ fontSize: "12px", fontWeight: 700, marginBottom: "4px" }}>{item.t}</div>
                  <div style={{ fontSize: "11px", color: C.mid, lineHeight: 1.55 }}>{item.d}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* ===== CHANNEL ===== */}
          <Reveal>
            <Lbl>Channel</Lbl>
            <div style={{ fontSize: "13px", color: C.mid, lineHeight: 1.7, marginBottom: "8px" }}>
              <span style={{ fontWeight: 600, color: C.text }}>Accenture</span> deepened its Westpac partnership in 2025 for AI agent deployment. Accenture signed a multi-year collaboration with Mistral in February 2026. The channel exists and needs activation, not creation.
            </div>
            <div style={{ fontSize: "11px", color: C.dim, marginBottom: "24px" }}>
              <Src href="https://www.computerweekly.com/news/366638802/ANZ-rolls-out-AI-agents-for-business-bankers">Computer Weekly: Westpac + Accenture</Src> · <Src href="https://newsroom.accenture.com/news/2026/accenture-and-mistral-ai-accelerate-enterprise-reinvention-with-scalable-ai-that-delivers-strategic-autonomy-for-customers">Accenture Newsroom: Mistral Partnership</Src>
            </div>
          </Reveal>

          <Div />

          {/* ===== STAKEHOLDERS ===== */}
          <Reveal>
            <Lbl>Stakeholder Navigation</Lbl>
            <div style={{ fontFamily: F.serif, fontSize: "18px", fontWeight: 400, lineHeight: 1.3, marginBottom: "14px" }}>Four buyers. Each hears a different Mistral.</div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "10px" }}>
            {stakeholders.map((s, i) => (
              <button key={i} onClick={() => setSh(i)} style={{
                padding: "10px 12px", borderRadius: "6px", cursor: "pointer",
                background: sh === i ? C.accentSoft : C.card, borderLeft: sh === i ? `3px solid ${C.accent}` : "3px solid transparent",
                textAlign: "left", transition: "all 0.15s ease", border: `1px solid ${sh === i ? C.accentBdr : C.border}`,
              }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: sh === i ? C.accent : C.text }}>{s.role}</div>
                <div style={{ fontSize: "9px", color: C.dim, marginTop: "1px" }}>{s.name}</div>
              </button>
            ))}
          </div>

          <div style={{ background: C.card, borderRadius: "8px", border: `1px solid ${C.border}`, padding: "18px", marginBottom: "12px" }}>
            <div style={{ fontSize: "10px", color: C.accent, fontWeight: 600, marginBottom: "8px", fontStyle: "italic" }}>{stakeholders[sh].fullRole}</div>
            {[["Cares About", stakeholders[sh].cares], ["How to Position", stakeholders[sh].position], ["Risk to Manage", stakeholders[sh].risk]].map(([l, v], i) => (
              <div key={i} style={{ marginBottom: i < 2 ? "12px" : 0 }}>
                <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: C.accent, fontWeight: 700, marginBottom: "3px" }}>{l}</div>
                <div style={{ fontSize: "12px", color: i < 2 ? C.text : C.muted, lineHeight: 1.6 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "11px", color: C.dim, marginBottom: "32px" }}>
            <Src href="https://www.forrester.com/blogs/bankings-new-power-role-the-chief-digital-data-ai-officer/">Forrester: The CDDAO Role in Banking</Src> · <Src href="https://www.apra.gov.au/news-and-publications/apra-agrees-to-enforceable-undertaking-from-westpac-to-address-risk">APRA: Westpac Enforceable Undertaking</Src>
          </div>

          <Div />

          {/* ===== VALUE ===== */}
          <Reveal>
            <Lbl>Value at Stake</Lbl>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "32px" }}>
              {[
                { n: "$34M+", l: "Fraud Detection", s: "AI uplift on scam prevention" },
                { n: "$42M+", l: "Productivity", s: "Le Chat · 35K employees" },
                { n: "$18M+", l: "UNITE", s: "Devstral code migration" },
                { n: "$94M+", l: "Year 1 Total", s: "Across three use cases", accent: true },
              ].map((d, i) => (
                <div key={i} style={{ textAlign: "center", padding: "14px 6px", borderRadius: "8px", background: d.accent ? C.accent : C.card, border: d.accent ? "none" : `1px solid ${C.border}` }}>
                  <div style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 400, color: d.accent ? "#fff" : C.text }}>{d.n}</div>
                  <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "1px", marginTop: "3px", color: d.accent ? "rgba(255,255,255,0.8)" : C.muted }}>{d.l}</div>
                  <div style={{ fontSize: "9px", marginTop: "1px", color: d.accent ? "rgba(255,255,255,0.6)" : C.dim }}>{d.s}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Div />

          {/* ===== PILOT SCORECARD ===== */}
          <Reveal>
            <Lbl>Pilot Scorecard — AML Detection (Weeks 4–8)</Lbl>
            <div style={{ background: C.card, borderRadius: "10px", border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: "12px" }}>
              {/* Header row */}
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", background: C.alt, padding: "8px 12px", gap: "8px" }}>
                {["KPI", "Baseline", "Pilot Target", "Owner"].map(h => (
                  <div key={h} style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: C.muted, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {/* Data rows */}
              {[
                { kpi: "False Positive Rate", base: "~85–95%", target: "< 60%", owner: "Mistral Applied AI", ownerColor: C.accent },
                { kpi: "Novel Pattern Detection", base: "Rules-based only", target: "+30% new typologies", owner: "Deployment Strategist", ownerColor: "#2B7A78" },
                { kpi: "Analyst Time per Case", base: "~45 min avg", target: "< 20 min", owner: "Accenture + Westpac", ownerColor: "#6B5B95" },
                { kpi: "SAR Quality Score", base: "Manual drafting", target: "AI-assisted, human-reviewed", owner: "Westpac Financial Crime", ownerColor: C.mid },
              ].map((row, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", padding: "10px 12px", gap: "8px", borderTop: `1px solid ${C.border}`, alignItems: "center" }}>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.text }}>{row.kpi}</div>
                  <div style={{ fontSize: "11px", color: C.muted }}>{row.base}</div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: C.accent }}>{row.target}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: row.ownerColor, flexShrink: 0 }} />
                    <span style={{ fontSize: "10px", color: C.mid }}>{row.owner}</span>
                  </div>
                </div>
              ))}
              {/* Go/No-Go */}
              <div style={{ padding: "10px 12px", background: C.alt, borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: C.text }}>Go / No-Go Decision — Week 8</div>
                <div style={{ fontSize: "9px", color: C.muted }}>Results presented to CDDAO + Executive Committee</div>
              </div>
            </div>
            <div style={{ fontSize: "10px", color: C.dim, fontStyle: "italic", marginBottom: "32px" }}>Deployment Strategist owns the scorecard, coordinates between Mistral Applied AI (model performance), Accenture (integration), and Westpac (domain validation). Insights from pilot feed back into Mistral's product roadmap for financial services model improvements.</div>
          </Reveal>

          {/* ===== LAND AND EXPAND ===== */}
          <Reveal>
            <Lbl>Land and Expand</Lbl>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 20px 1fr 20px 1fr", gap: "0", alignItems: "stretch", marginBottom: "12px" }}>
              {/* Phase 1 */}
              <div style={{ background: C.card, borderRadius: "10px", border: `2px solid ${C.accentBdr}`, padding: "16px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: C.accent, fontWeight: 700, marginBottom: "6px" }}>Land</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>AML Detection Pilot</div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {["Large 3", "Forge"].map(m => <span key={m} style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "3px", background: C.accentSoft, color: C.accent, fontWeight: 600, border: `1px solid ${C.accentBdr}` }}>{m}</span>)}
                </div>
                <div style={{ fontSize: "10px", color: C.muted, lineHeight: 1.5, flex: 1 }}>50–100 users. On-prem. Financial Crime division.</div>
                <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.muted, fontWeight: 700 }}>Expansion trigger</div>
                  <div style={{ fontSize: "10px", color: C.accent, fontWeight: 600, marginTop: "2px" }}>False positive rate &lt; 60%</div>
                </div>
              </div>

              {/* Arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "12px", height: "2px", background: C.accent, position: "relative" }}>
                  <div style={{ position: "absolute", right: "-3px", top: "-3px", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `5px solid ${C.accent}` }} />
                </div>
              </div>

              {/* Phase 2 */}
              <div style={{ background: C.card, borderRadius: "10px", border: `1px solid ${C.border}`, padding: "16px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: "#2B7A78", fontWeight: 700, marginBottom: "6px" }}>Expand</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>Enterprise Productivity</div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {["Le Chat Enterprise", "Pixtral"].map(m => <span key={m} style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "3px", background: "rgba(43,122,120,0.06)", color: "#2B7A78", fontWeight: 600, border: "1px solid rgba(43,122,120,0.18)" }}>{m}</span>)}
                </div>
                <div style={{ fontSize: "10px", color: C.muted, lineHeight: 1.5, flex: 1 }}>35,000 employees. VPC. Knowledge Q&A, document processing.</div>
                <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.muted, fontWeight: 700 }}>Expansion trigger</div>
                  <div style={{ fontSize: "10px", color: "#2B7A78", fontWeight: 600, marginTop: "2px" }}>Research time reduction &gt; 30%</div>
                </div>
              </div>

              {/* Arrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "12px", height: "2px", background: C.accent, position: "relative" }}>
                  <div style={{ position: "absolute", right: "-3px", top: "-3px", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `5px solid ${C.accent}` }} />
                </div>
              </div>

              {/* Phase 3 */}
              <div style={{ background: C.card, borderRadius: "10px", border: `1px solid ${C.border}`, padding: "16px", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "2px", color: "#6B5B95", fontWeight: 700, marginBottom: "6px" }}>Scale</div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>UNITE Acceleration</div>
                <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "8px" }}>
                  {["Devstral 2", "Voxtral"].map(m => <span key={m} style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "3px", background: "rgba(107,91,149,0.06)", color: "#6B5B95", fontWeight: 600, border: "1px solid rgba(107,91,149,0.18)" }}>{m}</span>)}
                </div>
                <div style={{ fontSize: "10px", color: C.muted, lineHeight: 1.5, flex: 1 }}>Code migration, customer service voice AI. Multi-year platform deal.</div>
                <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "1.5px", color: C.muted, fontWeight: 700 }}>Contract value</div>
                  <div style={{ fontSize: "10px", color: "#6B5B95", fontWeight: 600, marginTop: "2px" }}>Multi-year enterprise agreement</div>
                </div>
              </div>
            </div>
            <div style={{ fontSize: "10px", color: C.dim, fontStyle: "italic", marginBottom: "32px" }}>Each phase expands Mistral's footprint across a different division and model. Expansion triggers are measurable outcomes from the prior phase, not arbitrary timelines.</div>
          </Reveal>

        </>) : (<>
          {/* ===== DOD ===== */}
          <Reveal>
            <Lbl>Strategic Account — Long-Cycle, High-Moat</Lbl>
            <div style={{ fontFamily: F.serif, fontSize: "22px", fontWeight: 400, lineHeight: 1.3, marginBottom: "12px" }}>
              Department of Defence: <span style={{ color: C.accent, fontStyle: "italic" }}>once you're in, no one displaces you.</span>
            </div>
            <div style={{ fontSize: "13px", color: C.mid, lineHeight: 1.7, marginBottom: "20px" }}>
              12–18 month cycle. But classified deployment with ASD clearance becomes the sovereign AI reference for every government agency and regulated enterprise in the country. The CLOUD Act structurally prevents US-domiciled providers from serving classified AU workloads. Mistral's open-weight, European-domiciled, air-gapped architecture is the only frontier option.
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "16px" }}>
              <div style={{ padding: "16px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: C.accent, fontWeight: 700, marginBottom: "4px" }}>Channel: Thales Australia</div>
                <div style={{ fontSize: "12px", color: C.mid, lineHeight: 1.5 }}>Existing Mistral partner. $2B+ AU defence contracts. 3,500+ AU employees. Direct Defence procurement relationships.</div>
              </div>
              <div style={{ padding: "16px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}` }}>
                <div style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "2px", color: C.accent, fontWeight: 700, marginBottom: "4px" }}>Proof Point: HTX Singapore</div>
                <div style={{ fontSize: "12px", color: C.mid, lineHeight: 1.5 }}>Mistral co-developed Phoenix LLM for Singapore's Home Team using Forge. Public safety, cybersecurity, operational intelligence.</div>
                <div style={{ marginTop: "4px" }}><Src href="https://www.htx.gov.sg/whats-happening/all-news---events/all-news/2025/htx-expands-partnership-with-mistral-ai">HTX: Mistral MOU</Src></div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginBottom: "16px" }}>
              {[
                { m: "Ministral", d: "Edge / air-gapped. Field hardware." },
                { m: "Large 3", d: "Strategic analysis. On-prem secure." },
                { m: "Forge", d: "Custom classified models." },
                { m: "Voxtral", d: "Multilingual SIGINT." },
              ].map((item, i) => (
                <div key={i} style={{ padding: "12px", background: C.card, borderRadius: "8px", border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: "11px", fontWeight: 700 }}>{item.m}</div>
                  <div style={{ fontSize: "10px", color: C.muted, marginTop: "3px", lineHeight: 1.4 }}>{item.d}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div style={{ background: C.alt, borderRadius: "8px", padding: "18px" }}>
              <div style={{ fontSize: "13px", color: C.text, lineHeight: 1.7 }}>
                <span style={{ fontWeight: 600 }}>The parallel play:</span> Westpac delivers first revenue and a commercial reference in 6 months. Defence delivers sovereign credibility that anchors Mistral's Australian positioning for the next decade. Both accounts run simultaneously.
              </div>
            </div>
          </Reveal>
        </>)}

        {/* ===== FOOTER ===== */}
        <div style={{ textAlign: "center", paddingTop: "36px", marginTop: "36px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: "10px", color: C.dim }}>Gaurav Devsarmah · April 2026</div>
        </div>
      </div>
    </div>
  );
}
