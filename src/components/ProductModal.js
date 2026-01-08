import { useEffect, useState } from "react";
import "../styles/ProductModal.css";

const ProductModal = ({ show, onClose, onSave, editingProduct }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        title: editingProduct.title || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        image: editingProduct.image || "",
      });
    } else {
      setForm({
        title: "",
        price: "",
        category: "",
        image: "",
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-custom animate-scale">
        <div className="modal-header-custom">
          <h5>{editingProduct ? "Edit Product" : "Add New Product"}</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-custom">
            <label>Product Title</label>
            <input
              className="form-control"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />

            <label>Price</label>
            <input
              className="form-control"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <input
              className="form-control"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            />

            <label>Image URL</label>
            <input
              className="form-control"
              name="image"
              value={form.image}
              onChange={handleChange}
              required
            />

            {form.image && (
              <div className="image-preview">
                <img
                  src={form.image}
                  alt="Preview"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </div>
            )}
          </div>

          <div className="modal-footer-custom">
            <button type="button" className="btn btn-light" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="btn btn-primary">
              {editingProduct ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
