import { products } from '../../data/products';

export default function ProductsSection() {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Sản phẩm nổi bật</h2>
        <div className="w-20 h-1 bg-yellow-400 mx-auto mb-12"></div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-xl transition-all">
              <div className="h-40 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}