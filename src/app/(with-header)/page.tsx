import { Metadata } from "next"
import { isFilled, asImageSrc, Content } from "@prismicio/client"
import { SliceComponentProps, SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"

/**
 * Homepage Page
 * Fetches the homepage content from Prismic and renders it via SliceZone
 */
export default async function Page() {
  const client = createClient()
  const page = await client.getSingle("homepage")

  const slices = bundleTextAndImageSlices(page.data.slices)

  return (
    <SliceZone
      slices={slices}
      components={{
        ...components,
        // Custom rendering for bundled text-and-image slices
        text_and_image_bundle: ({ slice }: SliceComponentProps<TextAndImageBundleSlice>) => (
          <div className="space-y-8">
            <SliceZone slices={slice.slices} components={components} />
          </div>
        ),
      }}
    />
  )
}

/**
 * Metadata generation for SEO / OG
 */
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle("homepage")

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: isFilled.keyText(page.data.meta_title) ? page.data.meta_title : undefined,
      description: isFilled.keyText(page.data.meta_description) ? page.data.meta_description : undefined,
      images: isFilled.image(page.data.meta_image) ? [asImageSrc(page.data.meta_image)] : undefined,
    },
  }
}

/** 
 * Type definition for bundled slice
 */
type TextAndImageBundleSlice = {
  id: string
  slice_type: "text_and_image_bundle"
  slices: Content.TextAndImageSlice[]
}

/**
 * Bundles consecutive 'text_and_image' slices into a single 'text_and_image_bundle' slice
 */
function bundleTextAndImageSlices(
  slices: Content.HomepageDocumentDataSlicesSlice[]
): (Content.HomepageDocumentDataSlicesSlice | TextAndImageBundleSlice)[] {
  const result: (Content.HomepageDocumentDataSlicesSlice | TextAndImageBundleSlice)[] = []

  for (const slice of slices) {
    if (slice.slice_type !== "text_and_image") {
      result.push(slice)
      continue
    }

    const lastBundle = result.at(-1)
    if (lastBundle?.slice_type === "text_and_image_bundle") {
      lastBundle.slices.push(slice as Content.TextAndImageSlice)
    } else {
      result.push({
        id: `${slice.id}-bundle`,
        slice_type: "text_and_image_bundle",
        slices: [slice as Content.TextAndImageSlice],
      })
    }
  }

  return result
}
