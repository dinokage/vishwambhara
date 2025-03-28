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
      
      {/* Inject CSS for animations */}
      <style jsx global>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-300px * 4)); }
        }
        
        @keyframes scrollRight {
          0% { transform: translateX(calc(-300px * 4)); }
          100% { transform: translateX(0); }
        }
        
        .scroll-left {
          animation: scrollLeft 25s linear infinite;
        }
        
        .scroll-right {
          animation: scrollRight 25s linear infinite;
        }
        
        .marquee-container:hover .scroll-left,
        .marquee-container:hover .scroll-right {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* First row - scrolling left */}
      <div className="relative overflow-hidden marquee-container">
        <div className="flex space-x-4 py-4 scroll-left">
          {[...clientData, ...clientData, ...clientData].map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="w-[300px] flex-shrink-0"
            >
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <div className="mt-2">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        height={100}
                        width={200}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Second row - scrolling right */}
      <div className="relative overflow-hidden mt-8 marquee-container">
        <div className="flex space-x-4 py-4 scroll-right">
          {[...projectData, ...projectData, ...projectData].map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              className="w-[300px] flex-shrink-0"
            >
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <div className="mt-2">
                      <Image
                        src={card.imageUrl}
                        alt={card.title}
                        height={100}
                        width={200}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
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