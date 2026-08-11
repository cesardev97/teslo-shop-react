import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

  const { data, isLoading } = useProducts();
  return (
    <>
      <CustomJumbotron title="Todos los productos" />

      <ProductsGrid products={data?.products || []} isLoading={isLoading} />

      <CustomPagination totalPages={data.pages} />

    </>
  )
}
