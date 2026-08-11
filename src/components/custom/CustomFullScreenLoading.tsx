
interface Props {
    message?: string;
}

export const CustomFullScreenLoading = ({ message = 'Cargando...' }: Props) => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md transition-all duration-300">
            <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl">

                {/* Spinner animado con gradiente */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
                </div>

                {/* Texto de carga opcional */}
                {message && (
                    <p className="text-black font-medium text-lg tracking-wide animate-pulse">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}