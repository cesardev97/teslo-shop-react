import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "@/interfaces/product.interface";
import { currencyFormatter } from "@/lib/currency-formatter";
import { PencilIcon } from "lucide-react";
import { Link } from "react-router";

interface Props {
    products?: Product[]
}

export const AdminProductsRows = ({ products }: Props) => {

    if (!products?.length) return (
        <TableRow>
            <TableCell colSpan={7} className="text-center py-10">No se encontraron resultados</TableCell>
        </TableRow>
    );

    return (
        <>
            {
                products.map(product => {
                    const productImage = product.images ? product.images[0] : 'https://placehold.co/25x25';
                    return (
                        <TableRow key={product.id}>
                            {/* <TableCell className="font-medium">{product.id}</TableCell> */}
                            <TableCell>
                                <img src={productImage} alt="Product" className="w-20 h-20 object-cover rounded-md" />
                            </TableCell>
                            <TableCell>
                                <Link to={`/admin/products/${product.id}`}
                                    className="hover:text-blue-500 underline"
                                >
                                    {product.title}
                                </Link>
                            </TableCell>
                            <TableCell>{currencyFormatter(product.price)}</TableCell>
                            <TableCell>{product.gender}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.sizes.join(', ')}</TableCell>
                            <TableCell className="text-right">
                                <Link to={`/admin/products/${product.id}`} >
                                    <PencilIcon className="w-4 h-4 text-blue-500" />
                                </Link>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
        </>
    )
}