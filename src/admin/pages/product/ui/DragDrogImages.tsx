import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";

interface Props {
    filesSubmitted?: boolean;
    onFilesSelected: (files: File[]) => void,
}

export const DragDrogImages = ({ onFilesSelected, filesSubmitted = false }: Props) => {

    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (filesSubmitted) {
            setFiles([]);
        }
    }, [filesSubmitted])

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const files = e.dataTransfer.files;

        if (!files) return;

        const uniqueFiles = getUniqueFiles(Array.from(files));
        setFiles(prev => [...prev, ...uniqueFiles]);
        onFilesSelected(Array.from(files));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const uniqueFiles = getUniqueFiles(Array.from(files));
        setFiles(prev => [...prev, ...uniqueFiles]);
        onFilesSelected(Array.from(files));
    };

    const handleRemoveFile = (index: number) => {
        setFiles(prev => prev.filter((_, ind) => ind !== index));
    }

    const getUniqueFiles = (filesToVerify: File[]) => {
        const filesNames = Array.from(files).map(file => file.name);
        const filterFiles = Array.from(filesToVerify).filter(file =>
            !filesNames.includes(file.name)
        );

        return filterFiles;
    }

    return (
        <>
            {/* Drag & Drop Zone */}
            <div
                className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-slate-300 hover:border-slate-400'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
                <div className="space-y-4">
                    <Upload className="mx-auto h-12 w-12 text-slate-400" />
                    <div>
                        <p className="text-lg font-medium text-slate-700">
                            Arrastra las imágenes aquí
                        </p>
                        <p className="text-sm text-slate-500">
                            o haz clic para buscar
                        </p>
                    </div>
                    <p className="text-xs text-slate-400">
                        PNG, JPG, WebP hasta 10MB cada una
                    </p>
                </div>
            </div>


            {/* Pending Images */}
            <div className={cn("mt-6 space-y-3", {
                'hidden': files.length == 0
            })}>
                <h3 className="text-sm font-medium text-slate-700">
                    Imágenes por cargar
                </h3>
                <div className="grid grid-cols-3 gap-3">
                    {files.map((file, index) => (
                        <div key={index} className="relative group">
                            <div className="aspect-square bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt="Product"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                            <button
                                onClick={() => handleRemoveFile(index)}
                                type="button"
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <X className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}