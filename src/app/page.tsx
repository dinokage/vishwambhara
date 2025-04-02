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
     
        <Image src="/anniversary.png" alt="25 years anniversary" quality={100} width={800} height={400} className="object-contain mx-auto w-full px-20"/>
     
      <Services />
      <MarqueeClients />
      <LocationMap />
    </>
    
  );
}
