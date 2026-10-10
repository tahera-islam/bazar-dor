"use client";

import { useEffect, useState } from "react";
import { formatPrice, toBengaliNumber } from "@/lib/utils";

const PriceTicker = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://api.api-store.workers.dev/api/bazardor/products")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.data)) {
                    setProducts(data.data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                }
            })
            .catch((err) => console.error("Ticker error:", err));
    }, []);

    if (products.length === 0) {
        return null;
    }

    const unitMap = {
        kg: "কেজি",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
    };

    const tickerItems = [...products, ...products];

    return (
        <div className="overflow-hidden border-t border-gray-100 bg-gray-50">
            <div className="animate-marquee flex whitespace-nowrap py-2">
                {tickerItems.map((product, index) => {
                    const change = product.change || {};
                    const direction = change.dir;
                    const percentage = Math.abs(Number(change.pct || 0))
                        .toFixed(1);

                    return (
                        <span
                            key={`${product.id || product.nameBn}-${index}`}
                            className="mx-4 inline-flex items-center gap-1.5 text-sm"
                        >
                            <span>{product.image}</span>

                            <span className="font-medium text-gray-700">
                                {product.nameBn}
                            </span>

                            <span className="text-gray-500">
                                {formatPrice(product.today)} টাকা/
                                {unitMap[product.unit] || product.unit}
                            </span>

                            <span
                                className={`font-semibold ${direction === "up"
                                        ? "text-red-500"
                                        : direction === "down"
                                            ? "text-green-500"
                                            : "text-gray-400"
                                    }`}
                            >
                                {direction === "up"
                                    ? "▲"
                                    : direction === "down"
                                        ? "▼"
                                        : "—"}{" "}
                                {toBengaliNumber(percentage)}%
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default PriceTicker;