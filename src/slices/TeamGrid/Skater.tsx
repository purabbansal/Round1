import { ButtonLink } from "@/components/ButtonLink"
import { Content } from "@prismicio/client"
import { PrismicNextImage } from "@prismicio/next"
import { SkaterScribble } from "./SkaterScribble"
import clsx from "clsx"

type Props = {
  skater: Content.SkaterDocument
  index: number
}

export function Skater({ skater, index }: Props) {
  const colors = [
    'text-brand-blue',
    'text-brand-lime',
    'text-brand-orange',
    'text-brand-pink',
    'text-brand-purple'
  ]

  const scribbleColor = colors[index]

  return (
    <div className="group relative rounded-xl bg-white/5 backdrop-blur-md p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1">
      <div className="skater relative flex flex-col items-center gap-4">
        <div className="stack-layout overflow-hidden">

          {/* Background Image */}
          <PrismicNextImage
            field={skater.data.photo_background}
            width={500}
            imgixParams={{ q: 20 }}
            alt=""
            className="scale-110 transform transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:brightness-[.85] group-hover:saturate-[.85]"
          />

          {/* Scribble Accent */}
          <SkaterScribble
            className={clsx(
              "relative opacity-90 transition-all duration-500 group-hover:opacity-100",
              scribbleColor
            )}
          />

          {/* Foreground Main Image */}
          <PrismicNextImage
            field={skater.data.photo_foreground}
            width={500}
            alt=""
            className="transition-transform duration-700 ease-in-out group-hover:scale-110"
          />

          {/* Bottom Fade Overlay */}
          <div className="relative h-32 w-full place-self-end bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Name */}
          <h3 className="relative place-self-end text-center p-2 font-bold tracking-wide text-white text-xl md:text-2xl">
            <span className="block">{skater.data.first_name}</span>
            <span className="block opacity-90">{skater.data.last_name}</span>

            {/* Name underline */}
            <span className="mt-1 mx-auto block h-[3px] w-10 bg-red-500 rounded-full group-hover:w-14 transition-all duration-300"></span>
          </h3>
        </div>

        {/* Button */}
        <ButtonLink
          field={skater.data.customizer_link}
          size="sm"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          Build their board
        </ButtonLink>
      </div>
    </div>
  )
}
