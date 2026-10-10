"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

const CategoryPage = () => {
    const params = useParams();
    const slug = params.slug;

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        async function loadCategory() {
            setLoading(true);
            setError(false);

            try {
                // প্রথমে category-র products আনা
                const productsResponse = await fetch(
                    `${API_URL}/products?category=${slug}`
                );

                if (!productsResponse.ok) {
                    throw new Error("Products fetch failed");
                }

                const productsResult = await productsResponse.json();

                // API থেকে products array বের করা
                let productsData = [];

                if (Array.isArray(productsResult)) {
                    productsData = productsResult;
                } else if (Array.isArray(productsResult.data)) {
                    productsData = productsResult.data;
                } else if (Array.isArray(productsResult.data?.products)) {
                    productsData = productsResult.data.products;
                } else if (Array.isArray(productsResult.products)) {
                    productsData = productsResult.products;
                }

                // এরপর category-র তথ্য আনা
                const categoryResponse = await fetch(
                    `${API_URL}/categories/${slug}`
                );

                if (!categoryResponse.ok) {
                    throw new Error("Category fetch failed");
                }

                const categoryResult = await categoryResponse.json();

                // Category object বের করা
                const categoryData =
                    categoryResult.data?.category ||
                    categoryResult.data ||
                    categoryResult.category ||
                    categoryResult;

                // Category এবং products state-এ রাখা
                setCategory(categoryData);
                setProducts(productsData);

                // Category না থাকলে অথবা products না থাকলে error দেখানো
                if (
                    !categoryData ||
                    !Array.isArray(productsData) ||
                    productsData.length === 0
                ) {
                    setError(true);
                }
            } catch (error) {
                console.error("Category page error:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        if (slug) {
            loadCategory();
        }
    }, [slug]);

    // দাম অনুযায়ী products সাজানো
    const sortedProducts = [...products];

    if (sortBy === "price-asc") {
        sortedProducts.sort((a, b) => Number(a.today) - Number(b.today));
    } else if (sortBy === "price-desc") {
        sortedProducts.sort((a, b) => Number(b.today) - Number(a.today));
    }

    // Loading skeleton
    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8">
                <div className="mb-6 animate-pulse">
                    <div className="h-8 w-48 rounded bg-gray-200"></div>
                    <div className="mt-3 h-4 w-32 rounded bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse rounded-xl border border-gray-200 bg-white p-4"
                        >
                            <div className="h-24 rounded-lg bg-gray-100"></div>
                            <div className="mt-4 h-4 w-3/4 rounded bg-gray-100"></div>
                            <div className="mt-3 h-4 w-1/2 rounded bg-gray-100"></div>
                            <div className="mt-5 h-6 w-2/3 rounded bg-gray-100"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Invalid category অথবা কোনো product না থাকলে
    if (error || products.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mb-4 text-6xl">😢</div>

                <h2 className="text-2xl font-bold text-gray-800">
                    কোনো পণ্য পাওয়া যায়নি
                </h2>

                <p className="mt-2 max-w-md text-gray-500">
                    এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরির ঠিকানা সঠিক নয়।
                </p>

                <Link
                    href="/"
                    className="mt-6 rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-800"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </div>
        );
    }

    // Category page
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Category title and icon */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                        <span>{category.icon || category.categoryIcon || "🛒"}</span>
                        <span>
                            {category.nameBn || category.name || "পণ্যের ক্যাটাগরি"}
                        </span>
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        এই ক্যাটাগরিতে মোট{" "}
                        {products.length.toLocaleString("bn-BD")}টি পণ্য
                    </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap text-sm text-gray-600">
                        সাজান:
                    </span>

                    <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>
            </div>

            {/* Responsive product cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
export default CategoryPage;