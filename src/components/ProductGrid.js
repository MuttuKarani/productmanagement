import ProductCard from "./ProductCard";
import "../styles/ProductsList.css";

const ProductGrid = ({ products, onEdit, onDelete }) => {
  return (
    <div className="container mt-4">
      <div className="row g-3">
        {products.map((product) => (
          <div
            key={product._tempId || product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <ProductCard
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
