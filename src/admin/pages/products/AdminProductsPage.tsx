import { AdminProductsRows } from "@/admin/components/AdminProductsRows"
import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { LoadingSpinner } from "@/components/custom/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useProducts } from "@/shop/hooks/useProducts"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {

  const { data, isLoading } = useProducts();

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button >
              <PlusIcon /> Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">

        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-25">ID</TableHead> */}
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            (isLoading) ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10"><LoadingSpinner /></TableCell>
              </TableRow>

            ) : (
              <AdminProductsRows products={data.products} />
            )
          }
        </TableBody>
      </Table>

      <CustomPagination totalPages={data.pages} />

    </>
  )
}