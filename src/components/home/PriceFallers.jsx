import ProductCard from "./ProductCard";

const PriceFallers = ({ products }) => {
    // যেসব পণ্যের দাম কমেছে, শুধু সেগুলো নেওয়া
    const fallers = products
        .filter((product) => product.change.dir === "down")

        // দাম কমার শতাংশ অনুযায়ী বেশি থেকে কম সাজানো
        .sort((a, b) => a.change.pct - b.change.pct)

        // প্রথম ৬টি পণ্য নেওয়া
        .slice(0, 6);

    // দাম কমা কোনো পণ্য না থাকলে section দেখাবে না
    if (fallers.length === 0) {
        return null;
    }

    return (
        <section className="py-8">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                    <span className="text-green-600">▼</span>
                    আজ দাম কমেছে
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {fallers.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PriceFallers;