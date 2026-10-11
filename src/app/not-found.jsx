import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-lg text-center">
                <div className="mb-5 text-7xl" aria-hidden="true">
                    🛒
                </div>

                <p className="text-lg font-semibold text-green-700">
                    404 Error
                </p>

                <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                    পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
                </h1>

                <p className="mt-4 text-base leading-7 text-gray-600">
                    দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি।
                    পৃষ্ঠাটি সরানো হতে পারে অথবা ঠিকানাটি ভুল হতে পারে।
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
                    >
                        🏠 হোম পেজে ফিরে যান
                    </Link>

                    <Link
                        href="/#সব-পণ্য"
                        className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                        সব পণ্য দেখুন
                    </Link>
                </div>
            </div>
        </main>
    );
}
export default NotFound;