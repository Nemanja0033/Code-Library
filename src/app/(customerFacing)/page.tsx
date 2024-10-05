import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { Product } from "@prisma/client";
import { ArrowRight, BookIcon, BookUser, PersonStandingIcon, ShieldCheck, UserIcon } from "lucide-react";
import Link from "next/link";
import { ProductCard, ProductCardSkeleton } from "../components/ProductCard";
import { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";



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

async function getMostPopularProductsSecond(){
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: 'desc' },
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
      take: 3,
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
      <Carousel>
        <CarouselContent>
          <CarouselItem> <ProductGridSection title="Most Popular" products={await getMostPopularProducts()} /></CarouselItem>
          <CarouselItem><ProductGridSection title="Most Popular" products={await getMostPopularProductsSecond()} /></CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
      </Suspense>
      <br /><br />
      <Suspense fallback={<LoadingSection title="Newest" />}>
        <ProductGridSection title="Newest" products={await getNewestProducts()} />
      </Suspense>
      <Suspense fallback={<LoadingSection title="" />}>
        <FeaturesSection />
      </Suspense>
      <Suspense fallback={<LoadingSection title="" />}>
        <ReadersSection />
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
          <Link href='/about'>Read Docs <ArrowRight className="size-4" /></Link>
        </Button>
      </div>
      <div className="text-gray-400 mt-[180px] w-full">
        <img src="https://i.postimg.cc/6qkcgvSM/featured.png" alt="featured" />
        <br />
        <h1 className="font-bold">Learn Most Used Programming languages</h1>
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

function FeaturesSection(){
  return(
    <div className="bg-gray-100 py-20">
    <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded shadow">
              <div className="flex justify-center">
              <BookIcon size={46} />
              </div>
                <h3 className="text-xl font-bold mb-2">Extensive Library</h3>
                <p className="text-gray-600">Access a wide range of eBooks on various programming languages and technologies.</p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <div className="flex justify-center">
              <BookUser size={46} /> 
              </div>
                <h3 className="text-xl font-bold mb-2">Expert Authors</h3>
                <p className="text-gray-600">Learn from industry experts and experienced programmers.</p>
            </div>
            <div className="p-6 bg-white rounded shadow">
              <div className="flex justify-center">
              <ShieldCheck size={46} />
              </div>
                <h3 className="text-xl font-bold mb-2">Certified Content</h3>
                <p className="text-gray-600">All our eBooks are certified and up-to-date with the latest trends.</p>
            </div>
        </div>
    </div>
</div>
  )
}

function ReadersSection() {
  return (
    <>
      <div className="bg-white py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Readers Say</h2>

          <Carousel>
            <CarouselContent>
              <CarouselItem>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <div className="flex justify-center mb-4">
                    <UserIcon />
                  </div>
                  <p className="text-gray-600 mb-4">
                    CodeCommerce has transformed my coding skills. The eBooks are top-notch!
                  </p>
                  <h3 className="text-xl font-bold">@JohnDoe</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <div className="flex justify-center mb-4">
                    <UserIcon />
                  </div>
                  <p className="text-gray-600 mb-4">
                    I love the variety of topics covered. There s something for everyone.
                  </p>
                  <h3 className="text-xl font-bold">@JaneSmith</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <div className="flex justify-center mb-4">
                    <UserIcon />
                  </div>
                  <p className="text-gray-600 mb-4">
                    The expert authors provide clear and concise explanations. Highly recommend!
                  </p>
                  <h3 className="text-xl font-bold">@AliceJohnson</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <div className="flex justify-center mb-4">
                    <UserIcon />
                  </div>
                  <p  className="text-gray-600 mb-4">
                  I appreciate how each topic is broken down into manageable parts. It makes learning enjoyable!
                  </p>
                  <h3 className="text-xl font-bold">@SaraKim</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <div className="flex justify-center mb-4">
                    <UserIcon />
                  </div>
                  <p  className="text-gray-600 mb-4">
                  The community support is fantastic! I always feel encouraged and motivated to keep learning
                  </p>
                  <h3 className="text-xl font-bold">@DavidMartinez</h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <div className="flex justify-center mb-4">
                    <UserIcon />
                  </div>
                  <p  className="text-gray-600 mb-4">
                  The eBooks are a treasure trove of knowledge. I ve recommended them to all my friends!
                  </p>
                  <h3 className="text-xl font-bold">@ChrisBrown</h3>
                </div>
              </CarouselItem>
            </CarouselContent >
            <CarouselPrevious className="hidden md:block" />
            <CarouselNext className="hidden md:block" />
          </Carousel>
        </div>
      </div>
    </>
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
