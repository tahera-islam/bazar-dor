
import Link from "next/link";

const ProductCard = ({ product }) => {
    const price = Number(product.today ?? 0);
    const change = Number(product.change?.pct ?? 0);

    const isUp = product.change?.dir === "up";
    const isDown = product.change?.dir === "down";

    const unitNames = {
        kg: "কেজি",
        liter: "লিটার",
        litre: "লিটার",
        dozen: "ডজন",
        piece: "পিস",
        pcs: "পিস",
    };

    const unitName = unitNames[product.unit] || product.unit;

    let badgeStyle = "bg-gray-100 text-gray-600";
    let badgeText = "—";

    if (isUp) {
        badgeStyle = "bg-green-100 text-green-700";
        badgeText = "▲";
    } else if (isDown) {
        badgeStyle = "bg-red-100 text-red-700";
        badgeText = "▼";
    }

    return (
        <Link
            href={`/product/${product.slug}`}
            className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
        >
            {/* Product Emoji */}
            <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-gray-50 text-5xl">
                {product.image || product.categoryIcon || "🛒"}
            </div>

            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900">
                {product.nameBn}
            </h3>

            {/* Unit */}
            <p className="mt-1 text-sm text-gray-500">
                প্রতি {unitName}
            </p>

            {/* Price Row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                    <p className="text-sm text-gray-500">
                        আজকের দাম
                    </p>

                    <p className="text-xl font-bold text-gray-900">
                        {price.toLocaleString("bn-BD")} টাকা
                    </p>
                </div>

                {/* Change Badge */}
                <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeStyle}`}
                >
                    {badgeText}{" "}
                    {Math.abs(change).toLocaleString("bn-BD")}%
                </span>
            </div>
        </Link>
    );
};

export default ProductCard;
