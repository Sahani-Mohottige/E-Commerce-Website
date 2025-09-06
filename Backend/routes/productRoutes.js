const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");
const { query, validationResult } = require("express-validator");

const router = express.Router();

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { name: { $regex: searchRegex } },
          { description: { $regex: searchRegex } },
        ],
      });
    }

    let sort = {};

    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    res.json(newArrivals);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.json(similarProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

// @route GET /api/products/search
// @desc Search for products by query
// @access Public
router.get(
  "/search",
  [
    query('query').optional().trim().escape(),
  ],
  async (req, res) => {
    // Add a log to confirm the route is being hit at all
   // console.log("[SEARCH] /api/products/search route HIT");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     // console.log("[SEARCH] Validation errors:", errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const searchQuery = req.query.query || "";
    console.log(`[SEARCH] Incoming query param: "${searchQuery}"`);
    try {
      if (!searchQuery.trim()) {
   //     console.log("[SEARCH] Empty search query, returning []");
        return res.json([]);
      }
      const products = await Product.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      });
      console.log(`[SEARCH] Query: "${searchQuery}" | Results: ${products.length}`);
      if (products.length > 0) {
   //     console.log("[SEARCH] First product:", products[0]);
      }
      res.json(products);
    } catch (err) {
      console.error('Search error:', err);
      res.status(500).json({ error: "Server error", details: err.message, stack: err.stack });
    }
  }
);

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
