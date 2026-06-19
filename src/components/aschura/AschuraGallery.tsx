import Image from "next/image";

const FEATURE_IMAGE = {
  src: "/images/veranstaltungen/Aschura/14.jpg",
  alt: "Willkommen zur Aschura-Veranstaltung – Queen Palace",
  objectPosition: "50% 30%",
};

const DETAIL_IMAGES = [
  {
    src: "/images/veranstaltungen/Aschura/8.jpg",
    alt: "Schwarze Zeremonialdecke mit goldener Kalligrafie",
    objectPosition: "50% 42%",
  },
  {
    src: "/images/veranstaltungen/Aschura/4.jpg",
    alt: "Rote Blumen und Salawat-Bücher",
    objectPosition: "50% 44%",
  },
];

const SUPPORTING_IMAGES = [
  {
    src: "/images/veranstaltungen/Aschura/IMG_6278%20%282025-07-12T10_16_49.608%29.JPG",
    alt: "Vortrag beim Gedenken an Imam Hussein",
  },
  {
    src: "/images/veranstaltungen/Aschura/IMG_5953%20%282025-07-12T10_36_45.806%29.JPG",
    alt: "Geschmückter Bereich der Aschura-Veranstaltung",
  },
  {
    src: "/images/veranstaltungen/Aschura/IMG_6378%20%282025-07-12T10_13_02.643%29.JPG",
    alt: "Rote Fahne bei der Aschura-Zeremonie",
  },
];

export function AschuraGallery() {
  return (
    <section className="mb-10" aria-labelledby="aschura-gallery">
      <div className="mb-6 max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-300">
          Eindrücke
        </p>
        <h2
          id="aschura-gallery"
          className="font-heading text-2xl font-bold text-cream-50 md:text-3xl"
        >
          Momente vergangener Veranstaltungen
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.45fr_0.85fr]">
        <figure className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-charcoal-700 bg-charcoal-800 shadow-sm md:min-h-[520px]">
          <Image
            src={FEATURE_IMAGE.src}
            alt={FEATURE_IMAGE.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ objectPosition: FEATURE_IMAGE.objectPosition }}
            sizes="(max-width: 768px) 100vw, 58vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/40 to-transparent p-5">
            <figcaption className="text-sm font-medium text-cream-50">
              Willkommen, Gedenken und Begegnung in einem würdevollen Rahmen.
            </figcaption>
          </div>
        </figure>

        <div className="grid gap-3">
          {DETAIL_IMAGES.map((image) => (
            <figure
              key={image.src}
              className="relative min-h-[250px] overflow-hidden rounded-2xl border border-charcoal-700 bg-charcoal-800 md:min-h-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                style={{ objectPosition: image.objectPosition }}
                sizes="(max-width: 768px) 100vw, 34vw"
              />
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {SUPPORTING_IMAGES.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-charcoal-700 bg-charcoal-800"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
