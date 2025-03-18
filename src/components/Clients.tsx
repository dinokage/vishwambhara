'use client'

import * as React from 'react'
import { Card, CardContent } from "@/components/ui/card-scroll"
import Image from "next/image"
// Sample data for the cards
const clientData = [
  { id: 1, title: "Ramky Group", content: "Content for Card 1", imageUrl: "/clients/ramky-group.jpg" },
  { id: 2, title: "OCC", content: "Content for Company 2", imageUrl: "/clients/occ.jpeg" },
  { id: 3, title: "GAIL", content: "Content for Company 3", imageUrl: "/clients/gail.jpeg" },
  { id: 4, title: "INWF", content: "Content for Company 4", imageUrl: "/clients/inwf.jpeg" },
  { id: 5, title: "Vignan", content: "Content for Company 5", imageUrl: "/clients/vignan.jpeg" },
]
const projectData = [
  { id: 1, title: "Ramky Group", content: "Content for Card 1", imageUrl: "/clients/ramky-group.jpg" },
  { id: 2, title: "OCC", content: "Content for Company 2", imageUrl: "/clients/occ.jpeg" },
  { id: 3, title: "GAIL", content: "Content for Company 3", imageUrl: "/clients/gail.jpeg" },
  { id: 4, title: "INWF", content: "Content for Company 4", imageUrl: "/clients/inwf.jpeg" },
  { id: 5, title: "Vignan", content: "Content for Company 5", imageUrl: "/clients/vignan.jpeg" },
]

export default function InfiniteCardSlider() {
  return (
    <div className="max-w-7xl mx-auto py-10 overflow-hidden">
       <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Our Clients</h2>
      <div className="mb-8">
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            {[...clientData, ...clientData].map((card, index) => (
              <div key={`${card.id}-${index}`} className="w-[300px] flex-shrink-0 px-2">
                <Card>
                  <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
                    <div>
                      <h3 className="text-xl font-semibold">{card.title}</h3>
                      <p className="mt-2"><Image src={card.imageUrl} alt={card.title} height={400} width={400} /></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right">
            {[...projectData, ...projectData].map((card, index) => (
              <div key={`${card.id}-${index}`} className="w-[300px] flex-shrink-0 px-2">
                <Card>
                  <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
                    <div>
                      <h3 className="text-xl font-semibold">{card.title}</h3>
                      <p className="mt-2"><Image src={card.imageUrl} alt={card.title} height={400} width={800}/></p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
