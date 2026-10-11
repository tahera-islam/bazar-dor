export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Product heading skeleton */}
            <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-5">
                    <div className="h-24 w-24 rounded-2xl bg-gray-200"></div>

                    <div className="flex-1">
                        <div className="h-4 w-24 rounded bg-gray-200"></div>
                        <div className="mt-3 h-7 w-48 max-w-full rounded bg-gray-200"></div>
                        <div className="mt-3 h-4 w-32 rounded bg-gray-200"></div>
                    </div>
                </div>

                {/* Today's price skeleton */}
                <div className="mt-6 rounded-xl bg-green-50 p-4">
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                    <div className="mt-3 h-8 w-40 rounded bg-gray-200"></div>
                    <div className="mt-3 h-4 w-28 rounded bg-gray-200"></div>
                </div>
            </div>

            {/* Price summary skeleton */}
            <div className="mt-8">
                <div className="mb-4 h-7 w-48 rounded bg-gray-200"></div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
                        >
                            <div className="h-4 w-28 rounded bg-gray-200"></div>
                            <div className="mt-3 h-7 w-32 rounded bg-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Market list skeleton */}
            <div className="mt-8 animate-pulse">
                <div className="mb-4 h-7 w-56 rounded bg-gray-200"></div>

                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="mb-3 h-14 rounded-lg border border-gray-200 bg-white"
                    ></div>
                ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
                পণ্যের তথ্য লোড হচ্ছে...
            </p>
        </div>
    );
}