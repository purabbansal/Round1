import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import { Heading } from "@/components/Heading";
import { ParallaxImage } from "./ParallaxImage";
import { SlideIn } from "@/components/SlideIn";

declare module "react" {
  interface CSSProperties {
    "--index"?: number;
  }
}

export type TextAndImageProps = SliceComponentProps<Content.TextAndImageSlice>;

const TextAndImage: FC<TextAndImageProps> = ({ slice, index }) => {
  const theme = slice.primary.theme;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        "relative overflow-hidden py-24",
        "before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-[0.05] before:pointer-events-none",
        theme === "Blue" && "bg-brand-blue text-white",
        theme === "Orange" && "bg-brand-orange text-white",
        theme === "Navy" && "bg-brand-navy text-white",
        theme === "Lime" && "bg-brand-lime text-black"
      )}
      style={{ "--index": index }}
    >
      <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-32">

        {/* ---- TEXT ---- */}
        <div
          className={clsx(
            "flex flex-col items-center gap-8 text-center md:items-start md:text-left",
            slice.variation === "imageOnLeft" && "md:order-2"
          )}
        >
          <SlideIn>
            <Heading size="xl" as="h2" className="relative inline-block tracking-tight font-extrabold drop-shadow-lg">
              <PrismicText field={slice.primary.heading} />
              {/* Minimal underline */}
              <span className="mt-3 block h-1.5 w-24 rounded-full bg-current opacity-70"></span>
            </Heading>
          </SlideIn>

          <SlideIn>
            <div className="max-w-lg text-lg md:text-xl leading-relaxed opacity-90">
              <PrismicRichText field={slice.primary.body} />
            </div>
          </SlideIn>

          {/* ---- NEON GLASS BUTTON ---- */}
          {slice.primary.button?.text && (
            <SlideIn>
              <a
                href={(slice.primary.button.url as string) ?? "#"}
                className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold uppercase tracking-wider
                  text-black bg-white/90 border-2 border-black backdrop-blur-sm shadow-[4px_4px_0px_#000] transition-all duration-300
                  hover:shadow-[2px_2px_0px_#000] hover:-translate-y-1 hover:bg-brand-lime/90 hover:text-white"
              >
                {/* Neon glow */}
                <span className="absolute inset-0 -z-10 rounded-2xl blur-xl opacity-30 bg-brand-lime group-hover:opacity-60 transition-opacity duration-500" />

                {slice.primary.button.text}

                {/* Animated arrow */}
                <svg
                  className="w-5 transition-transform duration-300 group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6 6 6-6-6-6" />
                </svg>
              </a>
            </SlideIn>
          )}
        </div>

        {/* ---- IMAGE ---- */}
        <div className="group relative perspective-1000">
          <ParallaxImage
            foregroundImage={slice.primary.foreground_image}
            backgroundImage={slice.primary.background_image}
          />

          {/* 3D hover + subtle zoom */}
          <div className="pointer-events-none absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:-translate-y-4 group-hover:rotate-1"></div>
        </div>
      </div>
    </Bounded>
  );
};

export default TextAndImage;
