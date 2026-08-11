interface Props {
    stock: number;
    imagesLength: number;
    sizesLength: number;
}

export const ProductStatus = ({ stock, imagesLength, sizesLength }: Props) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                Estado del producto
            </h2>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                        Estado
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        Activo
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                        Inventario
                    </span>
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${stock > 5
                            ? 'bg-green-100 text-green-800'
                            : stock > 0
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                    >
                        {stock > 5
                            ? 'En stock'
                            : stock > 0
                                ? 'Bajo stock'
                                : 'Sin stock'}
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                        Imágenes
                    </span>
                    <span className="text-sm text-slate-600">
                        {imagesLength} imágenes
                    </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">
                        Tallas disponibles
                    </span>
                    <span className="text-sm text-slate-600">
                        {sizesLength} tallas
                    </span>
                </div>
            </div>
        </div>
    )
}