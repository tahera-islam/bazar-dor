const CategoryLoading = () => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            {/* Category heading skeleton */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="h-8 w-36 animate-pulse rounded bg-gray-200"></div>
                    <div className="mt-3 h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                </div>

                {/* Sort dropdown skeleton */}
                <div className="h-10 w-40 animate-pulse rounded-lg bg-gray-200"></div>
            </div>

            {/* Product cards skeleton */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-gray-200"></div>

                            <div className="flex-1">
                                <div className="h-4 w-28 rounded bg-gray-200"></div>
                                <div className="mt-2 h-3 w-16 rounded bg-gray-200"></div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-end justify-between">
                            <div>
                                <div className="h-3 w-20 rounded bg-gray-200"></div>
                                <div className="mt-2 h-6 w-24 rounded bg-gray-200"></div>
                            </div>

                            <div className="h-6 w-16 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryLoading;