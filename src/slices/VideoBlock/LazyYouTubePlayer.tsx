'use client'

import { KeyTextField } from "@prismicio/client";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  youTubeID: KeyTextField;
};

export function LazyYouTubePlayer({ youTubeID }: VideoProps) {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // stop observing after triggered
        }
      },
      { threshold: 0.15 }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden rounded-xl">
      {isInView && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youTubeID}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playlist=${youTubeID}&disablekb=1&iv_load_policy=3&playsinline=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="lazy"
          className="pointer-events-none h-full w-full border-0 opacity-0 animate-videoFade"
        />
      )}

      {/* Soft cinematic zoom overlay */}
      <div className="absolute inset-0 scale-110 animate-videoZoom pointer-events-none bg-black/0"></div>
    </div>
  );
}
