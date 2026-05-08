import { pageMetadata } from "@/lib/constants";
import ProductHero from "@/components/sections/product/ProductHero";
import FeatureBlock from "@/components/sections/product/FeatureBlock";
import ProductTestimonial from "@/components/sections/product/ProductTestimonial";
import CustomerResults from "@/components/sections/product/CustomerResults";
import FinalCTA from "@/components/sections/product/FinalCTA";
import { PRODUCT_FEATURES } from "@/app/product/_data";

export const metadata = pageMetadata(
  "Product",
  "Pair Agent OS - voice, agent studio, the brain, live assist, insights, and the SDK. Everything you need to deploy AI agents that customers love."
);

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      {PRODUCT_FEATURES.map((feature) => (
        <FeatureBlock key={feature.id} {...feature} />
      ))}
      <ProductTestimonial />
      <CustomerResults />
      <FinalCTA />
    </>
  );
}
