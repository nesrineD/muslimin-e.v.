"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/veranstaltungen/Aschura/14.jpg",
    alt: "Willkommen zur Aschura-Veranstaltung im Queen Palace",
  },
  {
    src: "/images/veranstaltungen/Aschura/IMG_6174%20%282025-07-12T10_21_46.244%29.JPG",
    alt: "Podium der Aschura-Veranstaltung mit Kerzen und Kalligrafie",
  },
  {
    src: "/images/veranstaltungen/Aschura/IMG_5848%20%282025-07-12T10_42_30.860%29.JPG",
    alt: "Willkommensdekoration zum Gedenken an Imam Hussein",
  },
  {
    src: "/images/veranstaltungen/Aschura/IMG_6257%20%282025-07-12T10_17_33.151%29.JPG",
    alt: "Kerzenbeleuchtung während der Aschura-Veranstaltung",
  },
  {
    src: "/images/veranstaltungen/Aschura/IMG_6383%20%282025-07-12T10_12_54.401%29.JPG",
    alt: "Teilnehmerinnen beim gemeinsamen Aschura-Gedenken",
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

const LEAD_IMAGE_INDEX = 6;
const SECONDARY_PREVIEW_INDICES = [1, 4, 2];

function GalleryPreview({
  index,
  onSelect,
  className,
  sizes,
  showAll = false,
}: {
  index: number;
  onSelect: (index: number) => void;
  className?: string;
  sizes: string;
  showAll?: boolean;
}) {
  const image = GALLERY_IMAGES[index];

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      className={cn(
        "group relative block cursor-zoom-in overflow-hidden rounded-2xl border border-charcoal-700 bg-charcoal-800 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-300",
        className,
      )}
      aria-label={
        showAll
          ? `Alle ${GALLERY_IMAGES.length} Fotos ansehen`
          : `${image.alt} vergrößern`
      }
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        sizes={sizes}
      />
      {showAll ? (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-charcoal-900/70 px-3 text-center text-sm font-semibold text-cream-50 transition-colors group-hover:bg-charcoal-900/60">
          <Images className="h-6 w-6" aria-hidden="true" />
          Alle {GALLERY_IMAGES.length} Fotos ansehen
        </span>
      ) : (
        <span className="absolute right-3 top-3 rounded-full bg-charcoal-900/80 p-2 text-cream-50 opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </button>
  );
}

export function AschuraGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage =
    selectedIndex === null ? null : GALLERY_IMAGES[selectedIndex];

  function showPreviousImage() {
    setSelectedIndex((current) =>
      current === null
        ? 0
        : (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  }

  function showNextImage() {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + 1) % GALLERY_IMAGES.length,
    );
  }

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
        <p className="mt-2 text-sm text-charcoal-300">
          Öffne die Galerie, um alle Bilder vollständig anzusehen.
        </p>
      </div>

      {/* Editorial layout on tablet and desktop */}
      <div className="hidden h-[400px] grid-cols-[1.4fr_1fr] gap-3 md:grid">
        <GalleryPreview
          index={LEAD_IMAGE_INDEX}
          onSelect={setSelectedIndex}
          className="h-full"
          sizes="(min-width: 1056px) 568px, 55vw"
        />
        <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
          <GalleryPreview
            index={SECONDARY_PREVIEW_INDICES[0]}
            onSelect={setSelectedIndex}
            className="row-span-2 h-full"
            sizes="(min-width: 1056px) 196px, 20vw"
          />
          <GalleryPreview
            index={SECONDARY_PREVIEW_INDICES[1]}
            onSelect={setSelectedIndex}
            className="h-full"
            sizes="(min-width: 1056px) 196px, 20vw"
          />
          <GalleryPreview
            index={SECONDARY_PREVIEW_INDICES[2]}
            onSelect={setSelectedIndex}
            className="h-full"
            sizes="(min-width: 1056px) 196px, 20vw"
            showAll
          />
        </div>
      </div>

      {/* Lead image with swipeable previews on mobile */}
      <div className="md:hidden">
        <GalleryPreview
          index={LEAD_IMAGE_INDEX}
          onSelect={setSelectedIndex}
          className="aspect-[16/10] w-full"
          sizes="calc(100vw - 2rem)"
        />
        <div className="mt-3 grid snap-x snap-mandatory grid-flow-col auto-cols-[44%] gap-3 overflow-x-auto pb-2">
          {SECONDARY_PREVIEW_INDICES.map((index, previewIndex) => (
            <GalleryPreview
              key={index}
              index={index}
              onSelect={setSelectedIndex}
              className="aspect-[4/3] snap-start"
              sizes="44vw"
              showAll={previewIndex === SECONDARY_PREVIEW_INDICES.length - 1}
            />
          ))}
        </div>
      </div>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        <DialogContent
          className="w-[96vw] max-w-6xl gap-2 border-0 bg-charcoal-900 p-3 shadow-2xl sm:rounded-2xl [&>button]:z-20 [&>button]:bg-charcoal-900/80 [&>button]:p-2 [&>button]:text-cream-50 [&>button]:opacity-100"
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") showPreviousImage();
            if (event.key === "ArrowRight") showNextImage();
          }}
        >
          <DialogTitle className="sr-only">Bildansicht</DialogTitle>
          {selectedImage && (
            <>
              <div className="relative h-[78vh] min-h-[280px] w-full">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(min-width: 1200px) 1128px, calc(96vw - 1.5rem)"
                />
                <button
                  type="button"
                  onClick={showPreviousImage}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal-900/80 p-3 text-cream-50 transition-colors hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  aria-label="Vorheriges Bild"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-charcoal-900/80 p-3 text-cream-50 transition-colors hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  aria-label="Nächstes Bild"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <DialogDescription className="sr-only">
                {selectedImage.alt}. Bild {(selectedIndex ?? 0) + 1} von{" "}
                {GALLERY_IMAGES.length}.
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
