import { FC, JSX } from "react";
import { Content } from "@prismicio/client";
import { PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { createClient } from "@/prismicio";
import React from "react";
import { Skater } from "./Skater";
import { SlideIn } from "@/components/SlideIn";

export type TeamGridProps = SliceComponentProps<Content.TeamGridSlice>;

const TeamGrid: FC<TeamGridProps> = async ({ slice }): Promise<JSX.Element> => {
  const client = createClient();
  const skaters = await client.getAllByType("skater");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy text-white"
    >
      <SlideIn>
        <div className="text-center mb-10">
          <Heading as="h2" size="lg" className="relative inline-block">
            <PrismicText field={slice.primary.heading} />
            {/* 🔥 Red underline */}
            <span className="absolute left-1/2 -bottom-2 h-[3px] w-16 -translate-x-1/2 bg-red-500 rounded-full"></span>
          </Heading>
        </div>
      </SlideIn>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {skaters.map((skater, idx) => (
          <React.Fragment key={idx}>
            {skater.data.first_name && (
              <SlideIn delay={idx * 0.1}>
                <Skater index={idx} skater={skater} />
              </SlideIn>
            )}
          </React.Fragment>
        ))}
      </div>
    </Bounded>
  );
};

export default TeamGrid;
