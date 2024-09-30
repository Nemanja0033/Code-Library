import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import { Suspense } from "react";

async function getMostPopularProducts() {
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 3,
    });
    return products;
  } catch (error) {
    console.error("Error fetching most popular products:", error);
    return [];
  }
}

async function getNewestProducts() {
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
    return products;
  } catch (error) {
    console.error("Error fetching newest products:", error);
    return [];
  }
}

export default async function HomePage() {
  return (
    <div className="space-y-12">
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroBanner />
      </Suspense>
      <Suspense fallback={<LoadingSection title="Most Popular" />}>
        <ProductGridSection title="Most Popular" products={await getMostPopularProducts()} />
      </Suspense>
      <br /><br />
      <Suspense fallback={<LoadingSection title="Newest" />}>
        <ProductGridSection title="Newest" products={await getNewestProducts()} />
      </Suspense>
    </div>
  );
}

function HeroBannerSkeleton() {
  return (
    <div className="lg:mt-[200px] lg:mb-[100px] md:mt-[100px] text-center animate-pulse">
      <div className="h-10 w-3/4 bg-gray-300 rounded mx-auto mb-5"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded mx-auto mb-5"></div>
      <div className="flex justify-center gap-5 mt-10">
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}


function HeroBanner() {
  return (
    <div className="mt-[200px] mb-[100px] sm:mt-[150px] text-center">
      <h1 className="text-5xl font-semibold">Unlock Your Coding Potential</h1>
      <h2 className="text-3xl text-muted-foreground mt-5">Explore our curated eBook collection to elevate your programming skills</h2>
      <div className="flex justify-center gap-5 mt-10">
        <Button asChild>
          <Link href='/products'>Explore eBooks</Link>
        </Button>
        <Button asChild variant='outline'>
          <Link href='/about'>Learn More <ArrowRight className="size-4" /></Link>
        </Button>
      </div>
    </div>
  );
}

type ProductGridSectionProps = {
  title: string;
  products: Product[];
};

function ProductGridSection({ products, title }: ProductGridSectionProps) {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <h2 className="lg:ml-10 text-3xl font-semibold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="lg:ml-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
    </div>
  );
}

function LoadingSection({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
