"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card-scroll";
import Image from "next/image";
// Sample data for the cards
const clientData = [
  {
    id: 1,
    title: "Bharat Petroleum",
    content: "Content for Card 1",
    imageUrl: "/clients/bpcl.png",
  },
  {
    id: 2,
    title: "CAIRN",
    content: "Content for Company 2",
    imageUrl: "/clients/cairn.png",
  },
  {
    id: 3,
    title: "Divis",
    content: "Content for Company 3",
    imageUrl: "/clients/divis.png",
  },
  {
    id: 4,
    title: "HAL",
    content: "Content for Company 4",
    imageUrl: "/clients/hal.png",
  }
];
const projectData = [
  {
    id: 1,
    title: "JK Paper",
    content: "Content for Card 1",
    imageUrl: "/clients/jk.png",
  },
  {
    id: 2,
    title: "Ruchi",
    content: "Content for Company 2",
    imageUrl: "/clients/ruchi.png",
  },
  {
    id: 3,
    title: "Vizag Steel",
    content: "Content for Company 4",
    imageUrl: "/clients/vizag.png",
  },
  {
    id: 4,
    title: "HSL",
    content: "Content for Company 5",
    imageUrl: "/clients/hsl.png",
  },
];

export default function MarqueeClients() {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        Our Clients
      </h2>
      
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
          {[...clientData, ...clientData].map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="w-[300px] flex-shrink-0 px-2"
            >
              <Card>
                <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        height={400}
                        width={400}
                      />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden mt-8">
        <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
          {[...projectData, ...projectData].map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="w-[300px] flex-shrink-0 px-2"
            >
              <Card>
                <CardContent className="flex aspect-[3/2] items-center justify-center p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        height={400}
                        width={800}
                      />
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
