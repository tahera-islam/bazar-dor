const Loading = () => {
    return (
        <div className="container mx-auto w-full max-w-7xl space-y-8 px-3 py-6 sm:px-6 lg:px-8 animate-pulse">

            {/* Hero Banner Skeleton */}
            <div className="h-48 rounded-2xl bg-gray-200 sm:h-64 lg:h-80"></div>

            {/* Price Risers Skeleton */}
            <section>
                <div className="mb-5 h-7 w-48 rounded bg-gray-200"></div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="space-y-3 rounded-xl border border-gray-100 p-4"
                        >
                            <div className="h-36 rounded-lg bg-gray-200"></div>
                            <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                            <div className="h-9 rounded-lg bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Price Fallers Skeleton */}
            <section>
                <div className="mb-5 h-7 w-48 rounded bg-gray-200"></div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="space-y-3 rounded-xl border border-gray-100 p-4"
                        >
                            <div className="h-36 rounded-lg bg-gray-200"></div>
                            <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                            <div className="h-9 rounded-lg bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            </section>

            {/* All Products Skeleton */}
            <section>
                <div className="mb-5 h-7 w-40 rounded bg-gray-200"></div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="space-y-3 rounded-xl border border-gray-100 p-4"
                        >
                            <div className="h-36 rounded-lg bg-gray-200"></div>
                            <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                            <div className="h-9 rounded-lg bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
export default Loading;