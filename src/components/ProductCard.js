import "../styles/ProductsList.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <h6 className="product-title">
          {product.title.length > 40
            ? product.title.slice(0, 40) + "..."
            : product.title}
        </h6>

        <p className="product-category">{product.category}</p>

        <div className="product-price">₹ {product.price}</div>

        <div className="product-actions">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>

          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
