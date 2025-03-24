import Image from "next/image"
// import { Search, Twitter, Facebook, Linkedin, MapPin, Mail, Phone } from "lucide-react"
// import Link from "next/link"

export default function Aboutpage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Bar */}
    

      {/* About Us Header */}
      {/* <div className="relative">
        <div className="bg-[#252525] h-32 rounded-b-[50%] flex items-center justify-center">
          <h1 className="text-[#00aeef] text-4xl font-bold">About Us</h1>
        </div>
      </div> */}

      {/* About Us Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Left side - Image with stats */}
          <div className="relative w-full md:w-1/2">
            <Image
              src="/carousel/aboutimage.png"
              alt="Business Meeting"
              width={800}
              height={600}
              className="rounded-lg"
            />

            {/* Stats Pills */}
            



            {/* Handshake Image */}

          </div>

          {/* Right side - Text content */}
          <div className="w-full md:w-1/2 mt-16 md:mt-0">
            <h2 className="text-3xl font-bold mb-6">Established in 1999.</h2>

            <p className="mb-4">
            Classique is a business conglomerate engaged in diversified range of energy efficient solutions
            </p>

            <p className="mb-4">
            Classique is an ideal, competent partner offering comprehensive engineering and project management capability.

            </p>

            <p className="mb-4">
            Classique Engineering Enterprises established in 1999 & supplies a diverse range of air compressors, pumps, valves, geared motors, gear boxes, hoists manufactured by global leaders
            </p>
          </div>
        </div>
      </div>

     
      
    </main>
  )
}

