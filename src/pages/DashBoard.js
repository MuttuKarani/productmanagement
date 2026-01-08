import { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api/API";

import ProductGrid from "../components/ProductGrid";
import ProductSkeleton from "../components/ProductSkeleton";
import SearchBar from "../components/SearchBar";
import ProductModal from "../components/ProductModal";
import Toast from "../components/Toast";
import "../styles/DashBoard.css";

const DashBoard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    const res = await getProducts();

    const withTempIds = res.data.map((p) => ({
      ...p,
      _tempId: p.id,
    }));

    setProducts(withTempIds);
    setLoading(false);
  };

  const handleSaveProduct = async (product) => {
    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, product);

      setProducts((prev) =>
        prev.map((p) =>
          (p._tempId || p.id) === (editingProduct._tempId || editingProduct.id)
            ? { ...res.data, _tempId: editingProduct._tempId }
            : p
        )
      );

      showToast("Product updated successfully ");
    } else {
      const res = await addProduct(product);

      setProducts((prev) => [...prev, { ...res.data, _tempId: Date.now() }]);

      showToast("Product added successfully ");
    }

    setEditingProduct(null);
    setShowModal(false);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);

    setProducts((prev) => prev.filter((p) => p.id !== id && p._tempId !== id));

    showToast("Product deleted ", "error");
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const normalizeText = (text = "") =>
    text
      .toLowerCase()
      .replace(/['’]/g, "")
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();

  const filteredProducts = products.filter((p) => {
    const searchText = normalizeText(search);
    const title = normalizeText(p.title);
    const category = normalizeText(p.category);

    return title.includes(searchText) || category.includes(searchText);
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-tertiary">Product Management Dashboard</h3>

        <button
          className="fab-add bg-secondary"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            openAddModal();
          }}
          aria-label="Add Product"
        >
          +
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      {loading ? (
        <div className="row g-3 mt-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onEdit={openEditModal}
          onDelete={handleDeleteProduct}
        />
      )}

      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
        editingProduct={editingProduct}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DashBoard;
