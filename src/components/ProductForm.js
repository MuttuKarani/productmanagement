import { useEffect, useState } from "react";

const ProductForm = ({ onSubmit, editingProduct }) => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (editingProduct) setForm(editingProduct);
  }, [editingProduct]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", price: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <input
        className="form-control mb-2"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-2"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        className="form-control mb-2"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <button className="btn btn-primary">
        {editingProduct ? "Update" : "Add"} Product
      </button>
    </form>
  );
};

export default ProductForm;
