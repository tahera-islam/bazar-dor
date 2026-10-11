"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

const ProductDetailsPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;

    const { data: session, isPending } = useSession();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Login না থাকলে signin page-এ পাঠানো
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/signin");
        }
    }, [isPending, session, router]);

    // API থেকে product-এর তথ্য আনা
    useEffect(() => {
        if (isPending || !session || !slug) {
            return;
        }

        const loadProduct = async () => {
            setLoading(true);
            setError(false);

            try {
                const response = await fetch(`${API_URL}/products`);

                if (!response.ok) {
                    throw new Error("Product fetch failed");
                }

                const result = await response.json();

                // API থেকে products array বের করা
                let products = [];

                if (Array.isArray(result)) {
                    products = result;
                } else if (Array.isArray(result.data)) {
                    products = result.data;
                } else if (Array.isArray(result.data?.products)) {
                    products = result.data.products;
                } else if (Array.isArray(result.products)) {
                    products = result.products;
                }

                // URL-এর slug-এর সঙ্গে product-এর slug মিলানো
                const foundProduct = products.find(
                    (item) => item.slug === slug
                );

                if (!foundProduct) {
                    setError(true);
                    return;
                }

                setProduct(foundProduct);
            } catch (error) {
                console.error("Product details error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [slug, session, isPending]);

    // Login session পরীক্ষা চললে
    if (isPending || !session) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-600">লগইন যাচাই করা হচ্ছে...</p>
            </div>
        );
    }

    // Product load হচ্ছে
    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-gray-600">পণ্যের তথ্য লোড হচ্ছে...</p>
            </div>
        );
    }

    // Product না পাওয়া গেলে
    if (error || !product) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <p className="text-5xl">😢</p>

                <h1 className="mt-4 text-2xl font-bold text-gray-800">
                    পণ্য পাওয়া যায়নি
                </h1>

                <p className="mt-2 text-gray-500">
                    পণ্যের ঠিকানা ভুল অথবা তথ্য লোড করা যায়নি।
                </p>

                <Link
                    href="/"
                    className="mt-5 rounded-lg bg-green-700 px-5 py-3 text-white hover:bg-green-800"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // বাজারের সর্বনিম্ন ও সর্বোচ্চ দাম বের করা
    const markets = Array.isArray(product.markets)
        ? product.markets
        : [];

    const minimumPrices = markets.map((market) =>
        Number(market.min)
    );

    const maximumPrices = markets.map((market) =>
        Number(market.max)
    );

    const minPrice =
        minimumPrices.length > 0
            ? Math.min(...minimumPrices)
            : null;

    const maxPrice =
        maximumPrices.length > 0
            ? Math.max(...maximumPrices)
            : null;

    // প্রতিটি বাজারের min ও max-এর মাঝামাঝি দাম বের করা
    const averagePrice =
        markets.length > 0
            ? markets.reduce(
                (total, market) =>
                    total + (Number(market.min) + Number(market.max)) / 2,
                0
            ) / markets.length
            : null;

    const formatPrice = (price) =>
        price.toLocaleString("bn-BD", {
            maximumFractionDigits: 2,
        });

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Product summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-green-50 text-5xl">
                        {product.image || product.categoryIcon || "🛒"}
                    </div>

                    <div>
                        <p className="text-sm text-green-700">
                            {product.categoryIcon || "🛒"}{" "}
                            {product.categoryNameBn || "অন্যান্য"}
                        </p>

                        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                            {product.nameBn}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                        </p>

                        <p className="mt-3 text-sm text-gray-600">
                            বাজারের সর্বশেষ তালিকাভুক্ত দাম ও বাজারভিত্তিক দামের পরিসর।
                        </p>
                    </div>
                </div>

                {/* Today's price */}
                <div className="mt-6 rounded-xl bg-green-50 p-4">
                    <p className="text-sm text-gray-600">আজকের তালিকাভুক্ত দাম</p>

                    <p className="mt-1 text-3xl font-bold text-green-800">
                        ৳{formatPrice(Number(product.today))}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                        গতকালের দাম: ৳{formatPrice(Number(product.yesterday))}
                    </p>

                    <p
                        className={`mt-2 text-sm font-semibold ${product.change?.dir === "up"
                                ? "text-red-600"
                                : product.change?.dir === "down"
                                    ? "text-green-700"
                                    : "text-gray-500"
                            }`}
                    >
                        {product.change?.dir === "up"
                            ? "▲ দাম বেড়েছে"
                            : product.change?.dir === "down"
                                ? "▼ দাম কমেছে"
                                : "— দাম অপরিবর্তিত"}

                        {" "}
                        ({formatPrice(Number(product.change?.pct || 0))}%)
                    </p>
                </div>
            </div>

            {/* Minimum, maximum and average prices */}
            <section className="mt-8">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    দামের সারসংক্ষেপ
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
                        <p className="mt-2 text-2xl font-bold text-green-700">
                            {minPrice === null ? "—" : `৳${formatPrice(minPrice)}`}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
                        <p className="mt-2 text-2xl font-bold text-red-600">
                            {maxPrice === null ? "—" : `৳${formatPrice(maxPrice)}`}
                        </p>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <p className="text-sm text-gray-500">আনুমানিক গড় দাম</p>
                        <p className="mt-2 text-2xl font-bold text-gray-900">
                            {averagePrice === null
                                ? "—"
                                : `৳${formatPrice(averagePrice)}`}
                        </p>
                    </div>
                </div>

                <p className="mt-3 text-xs text-gray-500">
                    গড় দাম প্রতিটি বাজারের সর্বনিম্ন ও সর্বোচ্চ দামের মধ্যবর্তী
                    দামের গড় থেকে হিসাব করা হয়েছে।
                </p>
            </section>

            {/* Market-wise prices */}
            <section className="mt-8">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                    বাজারভিত্তিক আজকের দাম
                </h2>

                {markets.length === 0 ? (
                    <p className="rounded-xl border border-gray-200 bg-white p-5 text-gray-500">
                        বাজারের দামের তথ্য পাওয়া যায়নি।
                    </p>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                        <table className="w-full min-w-[480px] text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                                        বাজার
                                    </th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                                        বিভাগ
                                    </th>
                                    <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                                        দামের পরিসর
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {markets.map((market, index) => (
                                    <tr
                                        key={`${market.market}-${index}`}
                                        className="border-t border-gray-100"
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-800">
                                            {market.market}
                                        </td>

                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {market.division}
                                        </td>

                                        <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                                            ৳{formatPrice(Number(market.min))}
                                            {" – "}
                                            ৳{formatPrice(Number(market.max))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ProductDetailsPage;