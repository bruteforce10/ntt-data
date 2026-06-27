import Image from "next/image";
import { SITE_CONTENT } from "@/lib/site-content";

const { benefit } = SITE_CONTENT;

export default function Benefit() {
  return (
    <section id="benefits" className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <h2 className="mb-14 text-center font-georgia text-2xl font-black capitalize tracking-wide text-[#0070C0] sm:text-3xl lg:text-4xl">
          {benefit.title}
        </h2>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {benefit.items.map((item) => (
            <div
              key={item.number}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={160}
                height={160}
                className="h-32 w-32 object-cover sm:h-36 sm:w-36"
              />
              <h3 className="mt-6 text-lg font-black leading-tight text-[#0070C0] lg:text-xl">
                {item.title}
              </h3>
              <p
                className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600"
                dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
              />
              {"extra" in item && (
                <>
                  <h3 className="mt-10 text-lg font-black leading-tight text-[#0070C0] lg:text-xl">
                    {item.extra.title}
                  </h3>
                  <p
                    className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: item.extra.descriptionHtml,
                    }}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
