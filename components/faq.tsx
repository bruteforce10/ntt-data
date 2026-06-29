import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_CONTENT } from "@/lib/site-content";

type FaqItem = {
  question: string;
  answer: string;
  steps?: readonly string[];
  bullets?: readonly string[];
};

type FaqGroup = {
  title: string;
  items: readonly FaqItem[];
};

type FaqContent = {
  title: string;
  subtitle: string;
  groups: readonly FaqGroup[];
};

interface FaqProps {
  content?: FaqContent;
}

export default function Faq({ content = SITE_CONTENT.faq }: FaqProps) {
  const faqGroups = content.groups;
  return (
    <section id="faq" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-200 px-6">
        <h2 className="mb-3 text-center font-georgia text-2xl font-normal capitalize tracking-wide text-[#0070C0] sm:text-3xl">
          {content.title}
        </h2>

        <Accordion multiple={false} className="w-full">
          {faqGroups.flatMap((group, g) =>
            group.items.map((item, i) => (
              <AccordionItem key={`${g}-${i}`} value={`faq-${g}-${i}`}>
                <AccordionTrigger className="py-5 text-left text-base font-bold text-[#154284] hover:text-[#0070C0] hover:no-underline sm:text-lg **:data-[slot=accordion-trigger-icon]:text-[#0070C0]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                  <p>{item.answer}</p>
                  {item.steps ? (
                    <ol className="mt-3 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[#0070C0]">
                      {item.steps.map((step, s) => (
                        <li key={s} className="pl-1">
                          {step}
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {item.bullets ? (
                    <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[#0070C0]">
                      {item.bullets.map((point, b) => (
                        <li key={b} className="pl-1">
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            )),
          )}
        </Accordion>
      </div>
    </section>
  );
}
