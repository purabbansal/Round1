import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { LazyYouTubePlayer } from "./LazyYouTubePlayer";
import clsx from "clsx";
import Image from "next/image";

const MASK_CLASSES =
  "[mask-image:url(/video-mask.png)] [mask-mode:alpha] [mask-position:center_center] [mask-repeat:no-repeat] [mask-size:100%_auto]";

export type VideoBlockProps = SliceComponentProps<Content.VideoBlockSlice>;

const VideoBlock: FC<VideoBlockProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-texture bg-brand-navy py-20"
    >
      {/* Section Title */}
      <h2 className="text-center mb-8 text-white text-3xl md:text-4xl font-bold relative inline-block">
        Video Reel
        <span className="absolute left-1/2 -bottom-2 h-[4px] w-16 -translate-x-1/2 bg-red-500 rounded-full"></span>
      </h2>

      {/* Glow Frame */}
      <div className="relative aspect-video rounded-xl overflow-hidden shadow-[0_0_60px_-10px_rgba(0,0,0,0.7)] border border-white/10 group">

        {/* Soft Glow Outline */}
        <div className="absolute inset-0 rounded-xl border border-white/20 transition-all duration-500 group-hover:border-white/40" />

        {/* Cinematic Colored Glows */}
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-orange/20 opacity-40 group-hover:opacity-70 transition-all duration-500 mix-blend-screen" />

        {/* Layered Mask Textures */}
        <div className="absolute inset-0">
          <div className={clsx(MASK_CLASSES, "absolute inset-0 bg-brand-blue/30 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-500")} />
          <div className={clsx(MASK_CLASSES, "absolute inset-0 bg-brand-orange/30 group-hover:-translate-x-3 group-hover:-translate-y-3 transition-all duration-500")} />
        </div>

        {/* Video / Image */}
        <div className={clsx(MASK_CLASSES, "relative h-full w-full")}>
          {isFilled.keyText(slice.primary.youtube_video_id) ? (
            <LazyYouTubePlayer youTubeID={slice.primary.youtube_video_id} />
          ) : null}

          <Image
            src="/image-texture.png"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-40 mix-blend-overlay"
          />
        </div>

        {/* Play Button Hover Pulse */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full border-2 border-white/60 flex items-center justify-center text-white backdrop-blur-sm bg-white/10 group-hover:scale-110 group-hover:border-white transition-all duration-300">
            ▶
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default VideoBlock;
