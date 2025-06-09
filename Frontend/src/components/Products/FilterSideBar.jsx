import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    color: '',
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ['Top Wear', 'Bottom Wear', 'Shoes', 'Jackets'];
  const genders = ['Men', 'Women'];
  const colors = ['Red', 'Blue', 'Black', 'White', 'Gray'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const materials = ['Cotton', 'Denim', 'Leather'];
  const brands = ['Nike', 'Adidas', 'Zara', 'H&M'];

  // Sync filters from URL params on mount and when URL changes
 useEffect(() => {
  const params = Object.fromEntries([...searchParams.entries()]);

  setFilters({
    category: params.category || '',
    gender: params.gender || '',
    color: params.color || '',
    size: params.size ? params.size.split(',') : [],
    material: params.material ? params.material.split(',') : [],
    brand: params.brand ? params.brand.split(',') : [],
    minPrice: parseInt(params.minPrice) || 0,
    maxPrice: parseInt(params.maxPrice) || 100,
  });

  setPriceRange([0, parseInt(params.maxPrice) || 100]);
}, [searchParams]);
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      const arr = newFilters[name] || [];
      if (checked) {
        // Add value if not already in array
        if (!arr.includes(value)) arr.push(value);
      } else {
        // Remove value from array
        newFilters[name] = arr.filter((item) => item !== value);
      }
    } else if (type === "radio") {
      newFilters[name] = value;
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, val]) => {
      if (Array.isArray(val) && val.length > 0) {
        params.set(key, val.join(','));
      } else if (val !== '' && val !== null && val !== undefined) {
        params.set(key, val);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handlePriceRange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    setPriceRange([0, newMaxPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newMaxPrice };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filters.category === category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filters.gender === gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={() => {
                const newFilters = { ...filters, color };
                setFilters(newFilters);
                updateURLParams(newFilters);
              }}
              className={`h-6 w-6 rounded-full border-2 cursor-pointer transition ${
                filters.color === color ? 'border-blue-500' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              aria-label={color}
            />
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700"> {size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Material Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
        <div className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <div key={material} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="material"
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700"> {material}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center mb-1">
              <input
                type="checkbox"
                name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <span className="text-gray-700"> {brand}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
        <input
          type="range"
          name="maxPrice"
          min={0}
          max={100}
          value={priceRange[1]}
          onChange={handlePriceRange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
