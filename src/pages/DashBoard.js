import { useEffect, useState, useCallback } from "react";
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

const STORAGE_KEY = "products";

const DashBoard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProducts();

      const withTempIds = res.data.map((p) => ({
        ...p,
        _tempId: p.id,
      }));

      setProducts(withTempIds);
    } catch {
      showToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setProducts(JSON.parse(stored));
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, [fetchProducts]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, loading]);

  const handleSaveProduct = async (product) => {
    try {
      if (editingProduct) {
        const res = await updateProduct(editingProduct.id, product);

        setProducts((prev) =>
          prev.map((p) =>
            (p._tempId || p.id) ===
            (editingProduct._tempId || editingProduct.id)
              ? { ...res.data, _tempId: editingProduct._tempId }
              : p
          )
        );

        showToast("Product updated successfully");
      } else {
        const res = await addProduct(product);

        setProducts((prev) => [...prev, { ...res.data, _tempId: Date.now() }]);

        showToast("Product added successfully");
      }
    } catch {
      showToast("Action failed", "error");
    } finally {
      setEditingProduct(null);
      setShowModal(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id && p._tempId !== id)
      );

      showToast("Product deleted", "error");
    } catch {
      showToast("Delete failed", "error");
    }
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

    return (
      normalizeText(p.title).includes(searchText) ||
      normalizeText(p.category).includes(searchText)
    );
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="text-primary">Product Management Dashboard</h3>

        <button
          className="fab-add bg-primary text-secondary"
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
        >
          +
        </button>
      </div>

      <SearchBar search={search} setSearch={setSearch} />

      {loading ? (
        <div className="row g-3 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onEdit={(product) => {
            setEditingProduct(product);
            setShowModal(true);
          }}
          onDelete={handleDeleteProduct}
        />
      )}

      <ProductModal
        show={showModal}
        editingProduct={editingProduct}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
      />

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
};

export default DashBoard;
