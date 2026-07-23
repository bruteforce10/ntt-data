import * as React from "react";

type TradeTone = "cooling" | "cabling" | "nodes";

interface LabelledRow {
  readonly label: string;
  readonly description: string;
}

interface PainPoint {
  readonly title: string;
  readonly description: string;
}

interface TradeCard {
  readonly trade: TradeTone;
  readonly title: string;
  readonly subtitle: string;
}

interface DependencyStep {
  readonly trade: TradeTone;
  readonly label: string;
  readonly description: string;
}

interface CapabilityModule {
  readonly title: string;
  readonly subtitle?: string;
  readonly bullets: readonly string[];
  readonly table?: {
    readonly caption: string;
    readonly rows: readonly LabelledRow[];
  };
}

export interface ProblemRichDetail {
  readonly trades: {
    readonly heading: string;
    readonly intro: string;
    readonly cards: readonly TradeCard[];
    readonly body: readonly string[];
    readonly callout: { readonly title: string; readonly text: string };
  };
  readonly broken: {
    readonly heading: string;
    readonly intro: string;
    readonly items: readonly PainPoint[];
  };
  readonly solve: {
    readonly heading: string;
    readonly paragraphs: readonly string[];
    readonly question: string;
    readonly note: string;
  };
  readonly dependencyChain: {
    readonly heading: string;
    readonly intro: string;
    readonly steps: readonly DependencyStep[];
  };
  readonly capabilities: {
    readonly heading: string;
    readonly intro: string;
    readonly modules: readonly CapabilityModule[];
  };
  readonly requirements: {
    readonly heading: string;
    readonly intro: string;
    readonly rows: readonly LabelledRow[];
  };
}

/**
 * Each trade keeps one colour across the trade cards and the dependency chain,
 * so the two sections read as a single legend. All three clear WCAG AA (4.5:1)
 * against white text: #0070C0 5.15:1, #2560c8 5.86:1, #154284 9.79:1. The brand
 * button blue #3176e4 is deliberately absent here — at 4.34:1 it fails for the
 * small labels these blocks carry.
 */
const TRADE_TONE_CLASS: Record<TradeTone, string> = {
  cooling: "bg-[#0070C0]",
  cabling: "bg-[#2560c8]",
  nodes: "bg-[#154284]",
};

const MODULE_TONE_CLASSES = [
  "bg-[#0070C0]",
  "bg-[#2560c8]",
  "bg-[#154284]",
] as const;

function formatModuleNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

interface SectionProps {
  heading: string;
  children: React.ReactNode;
}

function Section({ heading, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <h4 className="text-base font-black leading-snug text-[#0070C0] sm:text-lg">
        {heading}
      </h4>
      {children}
    </section>
  );
}

function LabelledTable({ rows }: { rows: readonly LabelledRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full border-collapse text-left">
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <th
                scope="row"
                className="w-32 px-4 py-3 align-top font-bold text-[#0070C0] sm:w-44"
              >
                {row.label}
              </th>
              <td className="px-4 py-3 align-top font-normal">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-2.5 h-px w-3 shrink-0 bg-[#3176e4]"
          />
          <span className="flex-1 text-justify">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ProblemRichDetail({
  detail,
}: {
  detail: ProblemRichDetail;
}) {
  const { trades, broken, solve, dependencyChain, capabilities, requirements } =
    detail;

  return (
    <div className="space-y-10 text-sm leading-relaxed text-gray-700">
      <Section heading={trades.heading}>
        <p className="text-justify">{trades.intro}</p>

        <div className="grid gap-3 sm:grid-cols-3">
          {trades.cards.map((card) => (
            <div
              key={card.title}
              className={`rounded-xl p-4 text-center text-white ${TRADE_TONE_CLASS[card.trade]}`}
            >
              <p className="text-xs font-bold uppercase tracking-wide">
                {card.title}
              </p>
              <p className="mt-1.5 text-xs italic leading-snug">
                {card.subtitle}
              </p>
            </div>
          ))}
        </div>

        {trades.body.map((paragraph) => (
          <p key={paragraph} className="text-justify">
            {paragraph}
          </p>
        ))}

        <div className="rounded-xl bg-[#154284] p-5 text-center text-white">
          <p className="text-sm font-bold uppercase tracking-wide">
            {trades.callout.title}
          </p>
          <p className="mt-1.5">{trades.callout.text}</p>
        </div>
      </Section>

      <Section heading={broken.heading}>
        <p className="text-justify">{broken.intro}</p>
        <ol className="space-y-3">
          {broken.items.map((item, i) => (
            <li
              key={item.title}
              className="flex overflow-hidden rounded-xl border border-gray-200"
            >
              <div className="flex w-10 shrink-0 items-center justify-center bg-[#154284] font-bold text-white sm:w-12">
                {i + 1}
              </div>
              <div className="flex-1 bg-white p-4">
                <p className="mb-1.5 font-bold text-[#0070C0]">{item.title}</p>
                <p className="text-justify">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading={solve.heading}>
        {solve.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-justify">
            {paragraph}
          </p>
        ))}
        <p className="text-justify font-medium text-gray-900">
          {solve.question}
        </p>
        <p className="rounded-xl border-l-4 border-[#3176e4] bg-[#f0f7ff] p-4 text-justify italic">
          {solve.note}
        </p>
      </Section>

      <Section heading={dependencyChain.heading}>
        <p className="text-justify">{dependencyChain.intro}</p>
        <ol className="space-y-2">
          {dependencyChain.steps.map((step) => (
            <li
              key={step.description}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 sm:flex-row"
            >
              <div
                className={`flex items-center px-4 py-3 text-xs font-bold uppercase tracking-wide text-white sm:w-52 sm:shrink-0 ${TRADE_TONE_CLASS[step.trade]}`}
              >
                {step.label}
              </div>
              <p className="flex-1 bg-white px-4 py-3">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section heading={capabilities.heading}>
        <p className="text-justify">{capabilities.intro}</p>
        <div className="space-y-4">
          {capabilities.modules.map((module, i) => (
            <article
              key={module.title}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              <header
                className={`px-4 py-3 text-white ${MODULE_TONE_CLASSES[i % MODULE_TONE_CLASSES.length]}`}
              >
                <p className="text-xs font-bold tracking-widest">
                  {formatModuleNumber(i)}
                </p>
                <h5 className="mt-0.5 font-bold">{module.title}</h5>
                {module.subtitle && (
                  <p className="mt-1 text-xs italic leading-snug">
                    {module.subtitle}
                  </p>
                )}
              </header>
              <div className="bg-white p-4">
                <Bullets items={module.bullets} />
                {module.table && (
                  <div className="mt-5">
                    <p className="mb-2 font-medium text-gray-900">
                      {module.table.caption}
                    </p>
                    <LabelledTable rows={module.table.rows} />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section heading={requirements.heading}>
        <p className="text-justify">{requirements.intro}</p>
        <LabelledTable rows={requirements.rows} />
      </Section>
    </div>
  );
}
