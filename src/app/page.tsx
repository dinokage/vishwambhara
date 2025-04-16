import Carousel from "@/components/Carousel";
import Services from "@/components/Services";
import HomeProducts from "@/components/Products";
import Image from "next/image";
import MarqueeClients from "@/components/MarqueeClients";
import LocationMap from "@/components/LocationMap";

export default function Home() {
  return (
    <>
      <Carousel />
      <HomeProducts />
     
        <Image src="/anniversary.svg" alt="25 years anniversary" quality={100} width={400} height={400} className="object-contain mx-auto h-screen w-7xl px-20 rotate-270"/>
     
      <Services />
      <MarqueeClients />
      <LocationMap />
    </>
    
  );
}
