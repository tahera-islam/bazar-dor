"use client";

import { useEffect, useState } from "react";

const API_URLS = [
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
];

const PriceTicker = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = (apiIndex) => {
            fetch(`${ API_URLS[apiIndex] }/products`)
                .then((res) => {
    if (!res.ok) {
        throw new Error("Products API failed");
    }
    return res.json();
})
    .then((data) => {
        const productList = Array.isArray(data)
            ? data
            : Array.isArray(data.data)
                ? data.data
                : Array.isArray(data.products)
                    ? data.products
                    : [];

        setProducts(productList);
    })
    .catch((error) => {
        console.error("Products API error:", error);

        if (apiIndex < API_URLS.length - 1) {
            fetchProducts(apiIndex + 1);
        }
    });
        };

fetchProducts(0);
    }, []);

if (products.length === 0) {
    return null;
}

return (
    <div className="overflow-hidden border-y border-gray-200 bg-white py-3">
        <div className="price-ticker-track flex w-max">
            {[...products, ...products].map((product, index) => {
                const price = product.price ?? product.currentPrice ?? 0;
                const change = Number(
                    product.changePercent ?? product.change ?? 0
                );
                const isUp = change >= 0;

                return (
                    <div
                        key={`${product.id ?? product.name ?? "product"}-${index}`}
                        className="flex shrink-0 items-center gap-2 px-6 text-sm"
                    >
                        <span>{product.emoji || "🛒"}</span>
                        <span className="font-semibold text-gray-800">
                            {product.nameBn || product.name}
                        </span>
                        <span className="text-gray-700">
                            {price} টাকা/{product.unit || "কেজি"}
                        </span>
                        <span
                            className={
                                isUp ? "text-red-600" : "text-green-700"
                            }
                        >
                            {isUp ? "▲" : "▼"}{" "}
                            {Math.abs(change)}%
                        </span>
                    </div>
                );
            })}
        </div>
    </div>
);
};

export default PriceTicker;
