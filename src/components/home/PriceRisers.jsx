import ProductCard from "./ProductCard";

const PriceRisers = ({ products }) => {
    // যেসব পণ্যের দাম বেড়েছে, শুধু সেগুলো নেওয়া
    const risers = products
        .filter((product) => product.change.dir === "up")

        // দাম বৃদ্ধির শতাংশ অনুযায়ী বড় থেকে ছোট সাজানো
        .sort((a, b) => b.change.pct - a.change.pct)

        // প্রথম ৬টি পণ্য নেওয়া
        .slice(0, 6);

    // দাম বাড়া কোনো পণ্য না থাকলে section দেখাবে না
    if (risers.length === 0) {
        return null;
    }

    return (
        <section className="py-8">
            <div className="mx-auto max-w-7xl px-4">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                    <span className="text-red-500">▲</span>
                    আজ দাম বেড়েছে
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {risers.map((product) => (
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

export default PriceRisers;