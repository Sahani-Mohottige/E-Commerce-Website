import React, { useState } from 'react';

const ProductManagement = () => {
  // Product management state
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Printed Resort Shirt',
      price: 29.99,
      sku: 'PRNT-RES-004'
    },
    {
      id: 2,
      name: 'Chino Pants',
      price: 55,
      sku: 'BW-005'
    },
    {
      id: 3,
      name: 'Cargo Pants',
      price: 50,
      sku: 'BW-008'
    },
    {
      id: 4,
      name: 'Long-Sleeve Thermal Tee',
      price: 27.99,
      sku: 'LST-THR-009'
    },
    {
      id: 5,
      name: 'Pleated Midi Skirt',
      price: 55,
      sku: 'BW-W-004'
    },
    {
      id: 6,
      name: 'Graphic Print Tee',
      price: 30,
      sku: 'TW-W-006'
    },
    {
      id: 7,
      name: 'Ribbed Long-Sleeve Top',
      price: 55,
      sku: 'TW-W-007'
    },
    {
      id: 8,
      name: 'Slim-Fit Stretch Shirt',
      price: 29.99,
      sku: 'SLIM-SH-002'
    },
    {
      id: 9,
      name: 'Cargo Joggers',
      price: 45,
      sku: 'BW-002'
    },
    {
      id: 10,
      name: 'Off-Shoulder Top',
      price: 45,
      sku: 'TW-W-004'
    },
    {
      id: 11,
      name: 'Slim-Fit Easy-Iron Shirt',
      price: 34.99,
      sku: 'SLIM-EIR-005'
    },
    {
      id: 12,
      name: 'Tapered Sweatpants',
      price: 35,
      sku: 'BW-003'
    }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    sku: ''
  });

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Product management functions
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.sku) {
      const product = {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        sku: newProduct.sku
      };
      setProducts([...products, product]);
      setNewProduct({ name: '', price: '', sku: '' });
      setIsAddFormVisible(false);
      alert('Product added successfully!');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    if (editingProduct.name && editingProduct.price && editingProduct.sku) {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? editingProduct : product
      ));
      setEditingProduct(null);
      alert('Product updated successfully!');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-slate-800">Product Management</h1>
            <p className="text-gray-600 mt-2">Manage your product inventory</p>
          </div>
          <button
            onClick={() => setIsAddFormVisible(!isAddFormVisible)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {isAddFormVisible ? 'Cancel' : 'Add New Product'}
          </button>
        </div>
      </div>

      {/* Add New Product Form */}
      {isAddFormVisible && (
        <div 
          className="bg-white rounded-xl shadow-sm p-6 opacity-0 animate-fade-in-up"
          style={{ 
            animation: 'fadeInUp 0.6s ease forwards',
            animationDelay: '0.1s'
          }}
        >
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Add New Product</h2>
          
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div 
        className="bg-white rounded-xl shadow-sm p-6 opacity-0 animate-fade-in-up"
        style={{ 
          animation: 'fadeInUp 0.6s ease forwards',
          animationDelay: '0.2s'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Products List</h2>
          <div className="text-sm text-gray-500">
            Total Products: {products.length}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-gray-50 transition-colors duration-200 opacity-0 animate-fade-in-up"
                  style={{ 
                    animation: 'fadeInUp 0.6s ease forwards',
                    animationDelay: `${0.3 + (index * 0.05)}s`
                  }}
                >
                  <td className="py-4 px-4 text-slate-800 font-medium">
                    {product.name}
                  </td>
                  <td className="py-4 px-4 text-gray-600 font-semibold">
                    ${product.price}
                  </td>
                  <td className="py-4 px-4 text-gray-600 font-mono text-sm">
                    {product.sku}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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
        </div>

        {products.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products found. Add a new product to get started.
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default ProductManagement;