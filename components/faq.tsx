import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SITE_CONTENT } from "@/lib/site-content";

const { faq } = SITE_CONTENT;

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-200 px-6">
        <h2 className="mb-3 text-center text-2xl font-black capitalize tracking-wide text-[#0070C0] sm:text-3xl">
          {faq.title}
        </h2>
        <p className="mb-12 text-center text-sm text-gray-500 sm:text-base">
          {faq.subtitle}
        </p>

        <Accordion multiple={false} className="w-full">
          {faq.items.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="py-5 text-left text-base font-bold text-[#154284] hover:text-[#0070C0] hover:no-underline sm:text-lg **:data-[slot=accordion-trigger-icon]:text-[#0070C0]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-600 sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
