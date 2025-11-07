import { FC, useMemo } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { SkateboardProduct } from "./SkateboardProduct";
import { SlideIn } from "@/components/SlideIn";
import clsx from "clsx";

/**
 * Props for `ProductGrid`.
 */
export type ProductGridProps = SliceComponentProps<Content.ProductGridSlice>;

/**
 * Component for "ProductGrid" Slice.
 */
const ProductGrid: FC<ProductGridProps> = ({ slice }) => {
  const products = useMemo(
    () => slice.primary.product.filter(({ skateboard }) => isFilled.contentRelationship(skateboard)),
    [slice.primary.product]
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative bg-gradient-to-b from-brand-navy via-black to-black py-24 overflow-hidden"
    >
      {/* Heading with Spray Underline */}
      <SlideIn>
        <div className="relative text-center mb-12">
          <Heading as="h2" size="xl" className="text-white tracking-tight font-extrabold drop-shadow-lg">
            <PrismicText field={slice.primary.heading} />
          </Heading>

          <img
            src="/spray-underline.svg"
            alt=""
            className="mx-auto mt-[-0.5rem] w-52 opacity-90 pointer-events-none select-none"
            aria-hidden="true"
          />
        </div>
      </SlideIn>

      {/* Subheading / Body Copy */}
      {isFilled.richText(slice.primary.body) && (
        <SlideIn>
          <div className="text-center max-w-3xl mx-auto text-brand-lime/90 mb-16 text-lg md:text-xl leading-relaxed">
            <PrismicRichText field={slice.primary.body} />
          </div>
        </SlideIn>
      )}

      {/* Product Grid */}
      <div
        className={clsx(
          "grid gap-10 w-full",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        )}
      >
        {products.map(({ skateboard }, idx) => (
          <div
            key={skateboard.id}
            className="group relative perspective-1000"
            style={{ animationDelay: `${idx * 0.12}s` }}
          >
            {/* Tilt + Glow Card */}
            <div className="transform transition-transform duration-500 hover:scale-105 hover:rotate-1 hover:-rotate-2 hover:shadow-2xl rounded-xl overflow-hidden">
              <div className="relative bg-black/30 backdrop-blur-md rounded-xl shadow-lg ring-1 ring-white/10 hover:ring-brand-lime/40 transition-all duration-500">
                {/* Overlay Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-lime/20 via-transparent to-transparent opacity-0 group-hover:opacity-30 rounded-xl pointer-events-none transition-opacity duration-500" />
                
                {/* Skateboard Product */}
                <SkateboardProduct id={skateboard.id} />
              </div>
            </div>

            {/* Optional subtle hover description */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {skateboard.data.name}
            </div> */}
          </div>
        ))}
      </div>

      {/* Rough Paper Texture Overlay */}
      <img
        src="/paper-texture.png"
        alt=""
        className="pointer-events-none absolute inset-0 opacity-5 mix-blend-overlay w-full h-full select-none"
        aria-hidden="true"
      />
    </Bounded>
  );
};

export default ProductGrid;
