import React, { useEffect, useState } from "react";
import {
  createProduct,
  fetchProductsByFilters,
  updateProducts,
} from "../../redux/slices/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "sonner";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({ name: "", price: "", sku: "" });
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const adminToken = localStorage.getItem("adminToken");

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProductsByFilters({ token: adminToken }));
  }, [dispatch, adminToken]);

  // Add new product via Redux
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.sku) {
      toast.error("Please fill in all fields", {
        description: "Product name, price, and SKU are required.",
      });
      return;
    }

    try {
      await dispatch(createProduct({
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        sku: newProduct.sku,
        token: adminToken,
      })).unwrap();

      toast.success("Product added successfully!", {
        description: `${newProduct.name} has been added to the inventory.`,
      });

      setNewProduct({ name: "", price: "", sku: "" });
      setIsAddFormVisible(false);
    } catch (err) {
      toast.error("Failed to add product", { description: err.message });
    }
  };

  // Update product via Redux
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price || !editingProduct.sku) {
      toast.error("Please fill in all fields", {
        description: "Product name, price, and SKU are required.",
      });
      return;
    }

    try {
      await dispatch(updateProducts({
        productId: editingProduct._id,
        productData: editingProduct,
        token: adminToken,
      })).unwrap();

      toast.success("Product updated successfully!", {
        description: `${editingProduct.name} has been updated.`,
      });

      setEditingProduct(null);
    } catch (err) {
      toast.error("Failed to update product", { description: err.message });
    }
  };

  const handleCancelEdit = () => setEditingProduct(null);
  const handleEditProduct = (product) => setEditingProduct({ ...product });

  return (
    <div className="mt-12 lg:mt-0 space-y-8">
      {/* Page Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800">Product Management</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setIsAddFormVisible(!isAddFormVisible)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {isAddFormVisible ? "Cancel" : "Add New Product"}
        </button>
      </div>

      {/* Add New Product Form */}
      {isAddFormVisible && (
        <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input
                  type="text"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter SKU"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setIsAddFormVisible(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Edit Product</h2>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                <input
                  type="text"
                  value={editingProduct.sku}
                  onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Update Product</button>
                <button type="button" onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Products List</h2>
          <div className="text-sm text-gray-500">Total Products: {products.length}</div>
        </div>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => (
                <tr key={product._id || index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-4 text-slate-800 font-medium">{product.name}</td>
                  <td className="py-4 px-4 text-gray-600 font-semibold">${product.price}</td>
                  <td className="py-4 px-4 text-gray-600 font-mono text-sm">{product.sku}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        Edit
                      </button>
                      {/* Delete button can dispatch a Redux thunk later */}
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No products found. Add a new product to get started.
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up { animation: fadeInUp 0.6s ease forwards; }
        `}
      </style>
    </div>
  );
};

export default ProductManagement;
