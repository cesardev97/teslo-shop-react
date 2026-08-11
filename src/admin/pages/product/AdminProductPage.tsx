import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: product, mutation } = useProduct(id || '');


  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle = id === 'new'
    ? 'Aquí puedes crear un nuevo producto.'
    : 'Aquí puedes editar el producto.';
  const successMessage = id === 'new'
    ? 'Producto creado correctamente'
    : 'Producto actualizado correctamente';

  const handleSubmit = async (
    productLike: Partial<Product> & { files?: File[] }
  ) => {

    await mutation.mutateAsync(productLike, {
      onSuccess: (product) => {

        toast.success(successMessage, {
          position: 'top-right'
        });

        if (id === 'new') {
          navigate(`/admin/products/${product.id}`);
        }
      },
      onError: (_) => {
        toast.error('Error al acutalizar el producto');
      }
    })
  }

  if (isError) {
    return <Navigate to="/admin/products" />
  }

  if (isLoading) {
    return <CustomFullScreenLoading />
  }

  if (!product) {
    return <Navigate to="/admin/products" />
  }

  return <ProductForm
    isNew={id === 'new'}
    title={productTitle}
    subtitle={productSubtitle}
    product={product}
    onHandleSubmit={handleSubmit}
    isPosting={mutation.isPending}
    isSuccess={mutation.isSuccess}
  />

};