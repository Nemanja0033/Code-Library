"use client"; // Ensure this is a client component
import { useEffect, useState } from "react";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { formatCurrency, formatNumber } from "@/lib/formatters"; // Ensure this is the correct import
import { MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "../../_components/ProductActions";


// Define the type for a product
type Product = {
    id: string;
    name: string;
    priceInCents: number;
    isAvailableForPurchase: boolean;
    _count: {
        orders: number;
    };
};

const ProductsTable = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products', {
                    method: 'GET',
                });
                if (!response.ok) throw new Error('Network response was not ok');
        
                const products = await response.json();
                setProducts(products);
            } catch (err: unknown) {
                console.error("Error fetching products:", err);
                setError(err instanceof Error ? err : new Error('An unknown error occurred'));
            } finally {
                setLoading(false);
            }
        };
        
        

        fetchProducts();
    }, []);

    if (loading) return <p className="text-center text-xl">Loading...</p>;
    if (error) return <p className="text-center text-xl">Error loading products</p>;
    if (products.length === 0) return <p className="text-center text-xl">No Products Found</p>;

    return (
        <Table className="mt-10">
            <TableHeader>
                <TableRow>
                    <TableHead className='w-0'>
                        <span className="sr-only">Available For Purchase</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className='w-0'>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product.id}>
                        <TableCell></TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.priceInCents / 100)}</TableCell>
                        <TableCell>{formatNumber(product._count.orders)}</TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent >
                                    <DropdownMenuItem asChild>
                                        <a download href={`/admin/products/${product.id}/download`}>Download</a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild> 
                                        <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                                    </DropdownMenuItem>
                                    <ActiveToggleDropdownItem id={product.id} isAvailableForPurchase={product.isAvailableForPurchase} />
                                    <DropdownMenuSeparator />
                                    <DeleteDropdownItem id={product.id} disabled={product._count.orders > 0} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProductsTable;
