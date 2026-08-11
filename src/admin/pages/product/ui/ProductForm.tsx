import { useEffect, useRef, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import { X, SaveAll, Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminTitle } from "@/admin/components/AdminTitle";
import type { Product, Size } from "@/interfaces/product.interface";
import { DragDrogImages } from "./DragDrogImages";
import { ProductStatus } from "./ProductStatus";
import { toast } from "sonner";

interface Props {
    isNew: boolean;
    title: string;
    subtitle: string;
    product: Product,

    isPosting: boolean,
    isSuccess: boolean,

    // methods
    onHandleSubmit: (
        productLike: Partial<Product> & { files?: File[] }
    ) => Promise<void>
}

const availableSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export interface FormInputs extends Product {
    files?: File[]
}

export const ProductForm = ({ isNew, title, subtitle, product, onHandleSubmit, isPosting, isSuccess }: Props) => {

    const inputTagRef = useRef<HTMLInputElement>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        getValues,
        setValue,
        watch,
        reset,
    } = useForm<FormInputs>({
        defaultValues: product
    });

    useEffect(() => {
        if (!product) return;

        reset({
            ...product,
            files: [],
        });

    }, [product]);

    const selectedSizes = watch('sizes');
    const selectedTags = watch('tags');
    const currentStock = watch('stock');
    const currentImages = watch('images');


    const addSize = (size: Size) => {
        const sizeSet = new Set(getValues('sizes'));
        sizeSet.add(size);

        const newSizes = Array.from(sizeSet);
        setValue('sizes', newSizes, {
            shouldValidate: true
        });
    };

    const removeSize = (sizeToRemove: Size) => {
        const sizeSet = new Set(getValues('sizes'));
        sizeSet.delete(sizeToRemove);

        const newSizes = Array.from(sizeSet);
        setValue('sizes', newSizes, {
            shouldValidate: true
        });
    };

    const handleAddTag = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter' || event.key == ' ' || event.key == ',') {
            event.preventDefault();
            addTag();
        }
    }

    const addTag = () => {
        if (!inputTagRef.current?.value) return;

        const tagsSet = new Set(getValues('tags'));
        tagsSet.add(inputTagRef.current.value);

        setValue('tags', Array.from(tagsSet));
        inputTagRef.current!.value = '';
    };


    const removeTag = (tagToRemove: string) => {
        const tagsSet = new Set(getValues('tags'));
        tagsSet.delete(tagToRemove);
        setValue('tags', Array.from(tagsSet));
    };

    const handleFilesSelected = (files: File[]) => {
        const currentFiles = getValues('files') || [];
        const filesNames = Array.from(currentFiles).map(file => file.name);

        const filterFiles = Array.from(files).filter(file =>
            !filesNames.includes(file.name)
        );

        setValue('files', [...currentFiles, ...filterFiles])
    }

    const handleRemoveImage = (imageIndex: number) => {
        const images = getValues('images') || [];

        if (images.length <= 1) return;

        const newImages = images.filter((_, index) => index !== imageIndex)
        setValue('images', newImages);
    }

    const onSubmit = (productLike: FormInputs) => {
        if (!isNew && !isDirty) {
            toast.info('No se realizaron cambios', {
                position: 'top-right'
            });
            return;
        };

        onHandleSubmit(productLike);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-center">
                <AdminTitle title={title} subtitle={subtitle} />
                <div className="flex justify-end mb-10 gap-4">
                    <Button variant="outline">
                        <Link to="/admin/products" className="flex items-center gap-2">
                            <X className="w-4 h-4" />
                            Cancelar
                        </Link>
                    </Button>

                    <Button type="submit" disabled={isPosting}>
                        <SaveAll className="w-4 h-4" />
                        Guardar cambios
                    </Button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                                Información del producto
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Título del producto
                                    </label>
                                    <input
                                        type="text" placeholder="Título del producto"
                                        {...register('title', {
                                            required: true
                                        })}
                                        className={cn("form-control", {
                                            'border-red-500': errors.title
                                        })}
                                    />
                                    {
                                        errors.title && (
                                            <p className="is-error">El título es requerido</p>
                                        )
                                    }
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Precio ($)
                                        </label>
                                        <input
                                            type="number" placeholder="Precio del producto"
                                            {...register('price', {
                                                required: true,
                                                min: 1
                                            })}
                                            className={cn("form-control", {
                                                'border-red-500': errors.price
                                            })}
                                        />
                                        {
                                            errors.price && (
                                                <p className="is-error">El precio debe ser mayor de 0</p>
                                            )
                                        }
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">
                                            Stock del producto
                                        </label>
                                        <input
                                            type="number" min={0} placeholder="Stock del producto"
                                            {...register('stock', {
                                                required: true,
                                                min: 0
                                            })}
                                            className={cn("form-control", {
                                                'border-red-500': errors.stock
                                            })}
                                        />
                                        {
                                            errors.stock && (
                                                <p className="is-error">El stock debe ser mayor o igual a 0</p>
                                            )
                                        }
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Slug del producto
                                    </label>
                                    <input
                                        type="text" placeholder="Slug del producto"
                                        {...register('slug', {
                                            required: true,
                                            validate: (value) => !/\s/.test(value) || 'El slug no puede contener espacios en blanco'
                                        })}
                                        className={cn("form-control", {
                                            'border-red-500': errors.slug
                                        })}
                                    />
                                    {
                                        errors.slug && (
                                            <p className="is-error">
                                                {
                                                    errors.slug.message || 'El slug es requerido'
                                                }
                                            </p>
                                        )
                                    }
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Género del producto
                                    </label>
                                    <select
                                        {...register('gender')}
                                        className="form-control"
                                    >
                                        <option value="men">Hombre</option>
                                        <option value="women">Mujer</option>
                                        <option value="unisex">Unisex</option>
                                        <option value="kid">Niño</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Descripción del producto
                                    </label>
                                    <textarea
                                        rows={5} placeholder="Descripción del producto"
                                        {...register('description', {
                                            required: true
                                        })}
                                        className={cn("form-control resize-none", {
                                            'border-red-500': errors.description
                                        })}
                                    />
                                    {
                                        errors.description && (
                                            <p className="is-error">La descripción es requerida</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                                Tallas disponibles
                            </h2>
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="hidden"
                                        {...register('sizes', {
                                            validate: (sizes) =>
                                                sizes?.length > 0 || 'Debes seleccionar al menos una talla.',
                                        })}
                                    />
                                    {availableSizes.map((size) => (
                                        <span
                                            key={size}
                                            className={cn(
                                                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200",
                                                { 'hidden': !selectedSizes.includes(size) }
                                            )}
                                        >
                                            {size}
                                            <button
                                                type="button"
                                                onClick={() => removeSize(size)}
                                                className="cursor-pointer ml-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                                    <span className="text-sm text-slate-600 mr-2">
                                        Añadir tallas:
                                    </span>
                                    {availableSizes.map((size) => (
                                        <button
                                            type="button"
                                            key={size}
                                            onClick={() => addSize(size)}
                                            disabled={getValues('sizes').includes(size)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 
                                                ${selectedSizes.includes(size)
                                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300 cursor-pointer'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                                {
                                    errors.sizes && (
                                        <p className="is-error">{errors.sizes.message}</p>
                                    )
                                }
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                                Etiquetas
                            </h2>

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {selectedTags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200"
                                        >
                                            <Tag className="h-3 w-3 mr-1" />
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="cursor-pointer ml-2 text-green-600 hover:text-green-800 transition-colors duration-200"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-2">
                                    <input
                                        ref={inputTagRef}
                                        type="text"
                                        onKeyDown={handleAddTag}
                                        placeholder="Añadir nueva etiqueta..."
                                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                    <Button type="button" onClick={addTag} className="px-4 py-2rounded-lg ">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-6">
                                Imágenes del producto
                            </h2>
                            {/* Product Images */}
                            <DragDrogImages
                                filesSubmitted={isSuccess}
                                onFilesSelected={handleFilesSelected}
                            />

                            {/* Current Images */}
                            <div className={cn("mt-6 space-y-3", {
                                'hidden': currentImages.length == 0
                            })}>
                                <h3 className="text-sm font-medium text-slate-700">
                                    Imágenes actuales
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {currentImages.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                                                <img
                                                    src={image}
                                                    alt="Product"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                            {
                                                (currentImages.length > 1) && (
                                                    <button
                                                        onClick={() => handleRemoveImage(index)}
                                                        type="button"
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                )
                                            }

                                            <p className="mt-1 text-xs text-slate-600 truncate">
                                                {image}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Status */}
                        <ProductStatus
                            stock={currentStock}
                            imagesLength={currentImages.length}
                            sizesLength={selectedSizes.length}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}