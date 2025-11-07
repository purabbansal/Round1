import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Logo } from "./Logo";
import { Bounded } from "./Bounded";
import { FooterPhysics } from "./FooterPhysics";
import { asImageSrc } from "@prismicio/client";
import clsx from "clsx";

export async function Footer() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const boardTextureURLs = settings.data.footer_skateboards
    .map((item) => asImageSrc(item.skateboard, { h: 600 }))
    .filter((url): url is string => Boolean(url));

  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden">
      {/* --- HERO FOOTER IMAGE LAYERED --- */}
      <div className="relative h-[75vh] w-full ~p-10/16 md:aspect-auto">
        <PrismicNextImage
          field={settings.data.footer_image}
          alt=""
          fill
          className="object-cover opacity-[0.88] animate-footerZoom"
        />

        {/* Gradient overlay to make text visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

        {/* Floating skateboards */}
        <FooterPhysics
          boardTextureURLs={boardTextureURLs}
          className="absolute inset-0 overflow-hidden"
        />

        {/* Center Logo with graffiti glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Logo className="h-24 md:h-32 relative drop-shadow-[0_0_25px_rgba(255,255,255,0.45)]" />

          <span className="absolute inset-0 -z-10 blur-[70px] opacity-30 bg-brand-orange"></span>
        </div>
      </div>

      {/* --- NAV LINKS --- */}
      <Bounded as="nav" className="py-10">
        <ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
          {settings.data.navigation.map((item) => (
            <li key={item.link.text}>
              <PrismicNextLink
                field={item.link}
                className={clsx(
                  "relative tracking-wide uppercase font-medium transition-all duration-200",
                  "before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:w-0 before:bg-brand-orange before:transition-all before:duration-300 hover:before:w-full"
                )}
              />
            </li>
          ))}
        </ul>
      </Bounded>

      {/* Bottom tiny credit strip */}
      <div className="py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} SkateStreet — Roll With Style.
      </div>
    </footer>
  );
}
