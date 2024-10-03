import { Button } from "@/components/ui/button";
import { ProductCardSkeleton, ProductCard } from "../../components/ProductCard";
import db from "@/db/db";
import { Suspense } from "react";

async function getProducts() {
  try {
    const products = await db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { name: "asc" },
    });
    console.log("Fetched Products:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default function ProductsPage() {
  return (
    <>
      <Suspense fallback={<ProductsHeadlineSkeleton />}>
        <ProductsHeadline />
      </Suspense>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </>
          }
        >
          <ProductsSuspense />
        </Suspense>
      </div>
    </>
  );
}

function ProductsHeadlineSkeleton() {
  return (
    <div className="w-full mb-10">
      <div className="mb-[100px] mt-[100px] text-center animate-pulse">
        <div className="h-10 w-3/4 bg-gray-300 rounded mx-auto mb-5"></div>
        <div className="h-6 w-1/2 bg-gray-300 rounded mx-auto mb-5"></div>
      </div>
      <div className="ml-3 mb-3">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-3"></div>
        <div className="h-px bg-gray-300"></div>
      </div>
    </div>
  );
}

async function GetAmountOfProducts(){
  const products = await getProducts();
  return <span className="text-muted-foreground text-xl">{products.length + ' ' + "products found"}</span>
}


function ProductsHeadline() {
  return (
  <>
    <div className="w-full mb-[100px] mt-[100px]">
      <div className="">
        <h1 className="text-5xl font-semibold text-center">Your Coding Companion:</h1>
        <h1 className="text-4xl text-center text-muted-foreground mt-3">Dive into Expert eBooks Today!</h1>
        <br />
        <p className="text-muted-foreground text-2xl text-center ml-7">Dive into our extensive library of programming eBooks designed to elevate your skills and empower your coding journey. Whether you’re a beginner or an expert, we have something for everyone!</p>
        <br />
        <div className="flex justify-center">
        <Button asChild>
          <a href="#ebooks">Start Shoping!</a>
        </Button>
      </div>
      </div>
    </div>
    <div className="mt-10 mb-5">
      <h1 className="ml-10 text-4xl font-semibold text-start mb-3">eBooks <span><GetAmountOfProducts /></span></h1>
      <hr />
    </div>
  </>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();

  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return products.map(product => <div id="ebooks" key={product.id} className="lg:ml-10"><ProductCard key={product.id} {...product} /></div>);
}
