import HeroBanner from "@/components/home/HeroBanner";
import ProductSections from "@/components/home/ProductSections";
import { Button } from "@heroui/react";

export default function Home() {
  return (
   <>
      <div className="container mx-auto w-full max-w-7xl space-y-6 px-3 py-6 sm:space-y-8 sm:px-6 lg:px-8">
        
        <HeroBanner></HeroBanner>
        <ProductSections></ProductSections>
     </div>

   </>
  );
}
