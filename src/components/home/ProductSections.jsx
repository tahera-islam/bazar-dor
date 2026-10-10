
"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const API_URLS = [
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];

// API থেকে সব product আনার function
const fetchProducts = async () => {
    for (const apiUrl of API_URLS) {
        try {
            const response = await fetch(`${apiUrl}/products`);

            if (!response.ok) {
                throw new Error("Products API failed");
            }

            const data = await response.json();

            const productList = Array.isArray(data)
                ? data
                : Array.isArray(data.data)
                    ? data.data
                    : Array.isArray(data.products)
                        ? data.products
                        : [];

            if (productList.length === 0) {
                throw new Error("No products found");
            }

            return productList;
        } catch (error) {
            console.error("API failed:", apiUrl, error);
        }
    }

    throw new Error("Both Products APIs failed");
};

const ProductSections = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
                setError("পণ্যের তথ্য লোড করা যায়নি।");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <p className="py-8 text-center">পণ্য লোড হচ্ছে...</p>;
    }

    if (error) {
        return <p className="py-8 text-center text-red-600">{error}</p>;
    }


    return (
        <div className="space-y-10 py-8">

            {/* Section A: দাম বেড়েছে */}
            <section>
                <h2 className="mb-5 text-xl font-bold text-gray-900  sm:text-2xl">
                    আজ দাম বেড়েছে ▲
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products
                        .filter((product) => product.change?.dir === "up")
                        .sort((a, b) => b.change.pct - a.change.pct)
                        .slice(0, 6)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                </div>
            </section>

            {/* Section B: দাম কমেছে */}
            <section>
                <h2 className="mb-5 text-xl font-bold text-gray-900  sm:text-2xl">
                    আজ দাম কমেছে ▼
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products
                        .filter((product) => product.change?.dir === "down")
                        .sort((a, b) => a.change.pct - b.change.pct)
                        .slice(0, 6)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                </div>
            </section>

            {/* Section C: সব পণ্য */}
            <section id="সব-পণ্য" className="scroll-mt-24">
                <h2 className="mb-2 text-xl font-bold text-gray-900  sm:text-2xl">
                    সব পণ্য
                </h2>

                <p className="mb-5 text-gray-600">
                    নিত্যপ্রয়োজনীয় সব পণ্যের আজকের বাজারদর এক নজরে দেখুন।
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>

        </div>
    );

};

export default ProductSections;
