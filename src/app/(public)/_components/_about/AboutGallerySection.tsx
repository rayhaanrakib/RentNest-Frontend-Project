import Marquee from "@/components/shared/Marquee";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    alt: "Bright studio apartment with exposed brick",
  },
  {
    src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    alt: "Cozy bedroom with warm morning light",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80",
    alt: "Modern kitchen in a city apartment",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
    alt: "Minimalist living room in warm tones",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
    alt: "Elegant bathroom with walk-in shower",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    alt: "Dining space with designer chairs",
  },
  {
    src: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=900&q=80",
    alt: "Townhouse exterior at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=900&q=80",
    alt: "Poolside courtyard of a family home",
  },
];

/** Horizontal marquee of the kinds of homes on RentNest. */
const AboutGallerySection = () => {
  return (
    <Section tone="default" contained={false} ariaLabelledby="gallery-heading">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="On the platform"
          title="A glimpse of home"
          subtitle="A slow-rolling strip of the spaces our community calls their own — pause any time."
          align="center"
          headingId="gallery-heading"
        />
      </div>

      <Marquee duration="64s">
        {galleryImages.map((image) => (
          <figure
            key={image.src}
            className="relative mx-3 h-52 w-72 shrink-0 overflow-hidden rounded-3xl shadow-sm sm:h-60 sm:w-96"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 288px, 384px"
              className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
            />
          </figure>
        ))}
      </Marquee>
    </Section>
  );
};

export default AboutGallerySection;