"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
}

const ServiceCard = ({ title, description }: ServiceCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-sm text-muted-foreground">
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}

export default function AlternatingCardGrid() {
  const services = [
    {
      title: "Air Compressors Services",
      description: "Reliable & Efficient Compressors for Every Industry Need",
    },
    {
      title: "Service, Repair & Parts",
      description: "Comprehensive Compressor Services & Smart Solutions",
    },
    {
      title: "Ancillary Products",
      description: '"Complete Solutions for Industrial Air & Gas Systems"',
    },
    {
      title: "Industrial Applications",
      description: "Advanced Compressed Air & Gas Solutions for Every Industry",
    },
    {
      title: "Knowledge HUB",
      description: "Stay Informed: Webinars, Insights & Expert Knowledge on Compressed Air",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Services</h2>
      <div className="grid grid-cols-1 gap-6">
        {/* First row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard title={services[0].title} description={services[0].description} />
          <ServiceCard title={services[1].title} description={services[1].description} />
        </div>

        {/* Second row - 1 card centered */}
        <div className="grid grid-cols-1 gap-6">
          <div className="mx-auto w-full md:w-2/3 lg:w-1/2">
            <ServiceCard title={services[2].title} description={services[2].description} />
          </div>
        </div>

        {/* Third row - 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard title={services[3].title} description={services[3].description} />
          <ServiceCard title={services[4].title} description={services[4].description} />
        </div>
      </div>
    </div>
  )
}

