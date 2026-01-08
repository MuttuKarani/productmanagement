import "../styles/ProductSkeleton.css";

const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton-image shimmer"></div>

      <div className="product-info">
        <div className="skeleton-text shimmer"></div>
        <div className="skeleton-text small shimmer"></div>
        <div className="skeleton-price shimmer"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
