import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface BrandCard {
  id: string
  name: string
  productImage: string
  logoImage: string
  url: string
}

const brands: BrandCard[] = [
  {
    id: "atlas-copco",
    name: "ATLAS COPCO",
    productImage:
      "/logos/atlas-copco.png",
    logoImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BITMXWh6Fv09XM403CyQjHs5eLaVdl.png#atlas-logo",
    url: "/products/atlas-copco",
  },
  {
    id: "sew-eurodrive",
    name: "SEW EURODRIVE",
    productImage:
      "/logos/sew.png",
    logoImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BITMXWh6Fv09XM403CyQjHs5eLaVdl.png#sew-logo",
    url: "/products/sew",
  },
  {
    id: "delval",
    name: "Delval",
    productImage:
      "/logos/delval.png",
    logoImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BITMXWh6Fv09XM403CyQjHs5eLaVdl.png#kirloskar-logo",
    url: "/products/delval",
  },
  {
    id: "praj",
    name: "Praj",
    productImage:
      "/logos/praj.png",
    logoImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BITMXWh6Fv09XM403CyQjHs5eLaVdl.png#xylem-logo",
    url: "/products/praj",
  },
  {
    id: "weg",
    name: "WEG",
    productImage:
      "/logos/weg.png",
    logoImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BITMXWh6Fv09XM403CyQjHs5eLaVdl.png#johnson-logo",
    url: "/products/weg",
  },
  {
    id: "snap-on",
    name: "Snap-On",
    productImage:
      "/logos/snap-on.png",
    logoImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BITMXWh6Fv09XM403CyQjHs5eLaVdl.png#nilfisk-logo",
    url: "/products/snap-on",
  },
]

export default function HomeProducts() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center mb-6">Our products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      
        {brands.map((brand) => (
          <div key={brand.id} className="border border-gray-200 rounded-md p-6 flex flex-col items-center">
            <div className="h-32 flex items-center justify-center mb-4">
              <Image
                src={brand.productImage || "/placeholder.svg"}
                alt={`${brand.name} product`}
                width={180}
                height={120}
                className="max-h-full object-contain"
              />
            </div>
            <h3 className="text-sky-500 font-medium text-center mb-4">{brand.name}</h3>
            <Link
              href={brand.url}
              className="inline-flex items-center border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Read More <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

