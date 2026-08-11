export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center space-y-4 p-8">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
            </div>
        </div>
    )
}