import ProductCard from "./ProductCard";

const AllProducts = ({ products }) => {
    return (
        <section id="সব-পণ্য" className="py-8">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        সব পণ্য
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        মোট {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের বাজার দর
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
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

export default AllProducts;