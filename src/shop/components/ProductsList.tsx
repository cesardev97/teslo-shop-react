import { ProductCard } from "./ProductCard";
import type { Product } from "@/interfaces/product.interface"

interface Props {
    products: Product[],
    viewMode: string;
}

export const ProductsList = ({ products, viewMode }: Props) => {

    if (!products.length) return <p className="text-center w-full">No se encontraron productos.</p>

    return (
        <div className="flex-1">
            <div className={
                viewMode === 'grid'
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
            }>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.title}
                        price={product.price}
                        image={product.images[0]}
                        category={product.gender}
                        sizes={product.sizes}
                    />
                ))}
            </div>
        </div>
    )
}