import Image from "next/image";
import { SITE_CONTENT } from "@/lib/site-content";

const { benefit } = SITE_CONTENT;

export default function Benefit() {
  return (
    <section id="benefits" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <h2 className="mb-3 text-center text-2xl font-black uppercase tracking-wide text-[#0070C0] sm:text-3xl">
          {benefit.title}
        </h2>
        <p className="mb-12 text-center text-sm text-gray-500 sm:text-base">
          {benefit.subtitle}
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {benefit.items.map((item) => (
            <div key={item.number} className="flex flex-col">
              <div className="relative h-[220px] overflow-hidden sm:h-[240px] lg:h-[260px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-6 sm:left-3 top-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3176e4]">
                    {item.number}
                  </span>
                </div>
                <div className="absolute top-10 sm:left-3 right-3 left-6">
                  <h3 className="text-lg font-black uppercase leading-tight text-white lg:text-xl">
                    {item.title}
                  </h3>
                </div>
              </div>
              <p
                className="mt-4 text-center text-sm leading-relaxed text-gray-700"
                dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
