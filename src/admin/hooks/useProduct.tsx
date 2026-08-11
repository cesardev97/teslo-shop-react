import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductByIdAction } from "../actions/get-product-id.action";
import { createUpdateProductAction } from "@/admin/actions/create-update-product.action";
import type { Product } from "@/interfaces/product.interface";

export const useProduct = (id: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5 //5minutos
    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {

            const imagesWithUrls = product.images.map(image => {
                if (image.includes('http')) return image;
                return `${import.meta.env.VITE_API_URL}/files/product/${image}`;
            })

            // Actualizar queryData
            queryClient.setQueryData(['product', { id: product.id }], { ...product, images: imagesWithUrls });

            // Invalidar caché
            queryClient.invalidateQueries({ queryKey: ['products'] });
            // queryClient.invalidateQueries({
            //     queryKey: ['product', { id: product.id }],
            // });

            // queryClient.setQueryData(['products', { id: product.id }], product);
        },
    });

    return {
        ...query,
        mutation
    }
}