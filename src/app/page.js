
import AllProducts from "@/components/home/AllProducts";
import HeroBanner from "@/components/home/HeroBanner";
import PriceFallers from "@/components/home/PriceFallers";
import PriceRisers from "@/components/home/PriceRisers";
import ProductSections from "@/components/home/ProductSections";

async function getProducts() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor",
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (Array.isArray(data.products)) {
    return data.products;
  }

  return [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <HeroBanner />
      <ProductSections products={products} />
      <PriceRisers products={products} />
      <PriceFallers products={products} />
      <AllProducts products={products} />
    </div>
  );
}

