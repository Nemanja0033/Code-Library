'use client';

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";

type ProductInfoProps = {
    product: {
        id: string;
        imagePath: string;
        name: string;
        priceInCents: number;
        description: string;
    };
};

export default function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="max-w-5xl w-full mx-auto space-y-8 mt-[100px] mb-[100px]">
            <div className="flex gap-4 items-center">
                <div>
                    <h1 className="text-4xl font-bold text-center">{product.name}</h1>
                    <br />
                    <div className="aspect-video flex-shrink-0 lg:w-1/2  relative lg:left-[250px]">
                        <Image
                            src={product.imagePath}
                            fill
                            alt={product.name}
                            className="object-cover"
                    />
                    </div>
                    <br />
                    <div className="line-clamp-3 text-muted-foreground">
                        {product.description}
                    </div>
                    <br />
                    <div className="line-clamp-3 text-muted-foreground">
                        <p>Unlock the power of programming with our comprehensive eBook, {product.name} This essential resource dives deep into one of the most widely used programming languages in the world. Whether you re a beginner looking to grasp the basics or an experienced coder seeking to enhance your skills, this eBook covers everything you need to know. From fundamental concepts and syntax to advanced techniques and best practices, you ll find clear explanations, practical examples, and hands-on exercises to solidify your understanding. Equip yourself with the knowledge to tackle real-world projects and elevate your coding journey with confidence!</p>
                    </div>
                    <div className="text-xl text-center font-bold mt-5">
                        <Button className="ml-5" asChild>
                          <Link href={`/products/${product.id}/purchase`}>Purhcase - {formatCurrency(product.priceInCents / 100)}</Link>
                        </Button>
                        <br /><br />
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}
