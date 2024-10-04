import db from "@/db/db";
import ProductInfo from './_components/ProductInfo';

export default async function ProductsInfoPage({ params: { id } }: { params: { id: string } }) {
    const product = await db.product.findUnique({
        where: { id }
    });

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <ProductInfo product={product} />
    );
}
