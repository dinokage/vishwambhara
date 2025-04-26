"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card-scroll";
import CloudinaryImage from "./CloudinaryImage";

// Sample data for the cards
const clientData = [
  {
    id: 1,
    title: "HAL",
    content: "Content for Card 1",
    imageUrl: "8_jjwxxf",
  },
  {  
  id: 5,
  title: "AM/NS India",
  content: "Content for Card 1",
  imageUrl: "image_237_ixbgf4",
},
// {
//   id: 2,
//   title: "UB",
//   content: "Content for Company 2",
//   imageUrl: "UB_fjbikp",
// },
{
  id: 3,
  title: "HPCL",
  content: "Content for Company 4",
  imageUrl: "image_221_zxwvw6",
},
  // {
  //   id: 2,
  //   title: "Gemini Cooking Oil",
  //   content: "Content for Company 2",
  //   imageUrl: "image_232_a4pft5",
  // },
  // {
  //   id: 3,
  //   title: "Rushil Decor",
  //   content: "Content for Company 3",
  //   imageUrl: "image_236_datupc",
  // },
  // {
  //   id: 4,
  //   title: "Grand Pharma",
  //   content: "Content for Company 4",
  //   imageUrl: "image_240_xzcp9o",
  // },
  // {
  //   id: 5,
  //   title: "JK Paper",
  //   content: "Content for Company 4",
  //   imageUrl: "image_235_rl9vw0",
  // },
  // {
  //   id: 6,
  //   title: "RAK Ceramics",
  //   content: "Content for Company 4",
  //   imageUrl: "image_234_f4ebir",
  // },
  {
    id: 7,
    title: "Coca Cola",
    content: "Content for Company 4",
    imageUrl: "image_239_mnazsp",
  },
];

const projectData = [
  {
    id: 4,
    title: "Laurus Labs",
    content: "Content for Company 5",
    imageUrl: "Laurus-labs_ixe527",
  },
  {
    id: 5,
    title: "Vizag Steel",
    content: "Content for Company 5",
    imageUrl: "vzgstl_1_g18bfg",
  },
  {
    id: 6,
    title: "Pfizer",
    content: "Content for Company 5",
    imageUrl: "image_231_orwg7m",
  },
  {
    id: 7,
    title: "Pepsi",
    content: "Content for Company 5",
    imageUrl: "image_233_f9es0q",
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
          100% { transform: translateX(calc(-600px * 4)); }
        }
        
        @keyframes scrollRight {
          0% { transform: translateX(calc(-600px * 4)); }
          100% { transform: translateX(0); }
        }
        
        .scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        
        .scroll-right {
          animation: scrollRight 30s linear infinite;
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
                <CardContent className="flex h-[20vh] items-center justify-center p-6">
                  <div>
                    {/* <h3 className="text-xl font-semibold">{card.title}</h3> */}
                    <div className="mt-2">
                      <CloudinaryImage
                        src={card.imageUrl}
                        alt={card.title}
                        height={50}
                        width={50}
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
                    {/* <h3 className="text-xl font-semibold">{card.title}</h3> */}
                    <div className="mt-2">
                      <CloudinaryImage
                        src={card.imageUrl}
                        alt={card.title}
                        height={200}
                        width={200}
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