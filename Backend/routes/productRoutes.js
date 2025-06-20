const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router() ;

// @route POST /api/products
// @desc Create a new Product
// @access Private/Admin
router.post("/",protect, async (req, res) => {
try {
const{
    name,
description,
price,
discountPrice,
countInStock,
category,
brand,
sizes,
colors,
collections,
material,
gender,
images,
isFeatured,
isPublished,
tags,
dimensions,
weight,
sku,
} = req.body;

const product = new Product({
        name,
description,
price,
discountPrice,
countInStock,
category,
brand,
sizes,
colors,
collections,
material,
gender,
images,
isFeatured,
isPublished,
tags,
dimensions,
weight,
sku,
user:req.user._id, //id of admin user who creating the product
})

//201=created
const createdProduct = await product.save();
res.status(201).json(createdProduct);
} catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
}
})

// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
try {
    const{
    name,
description,
price,
discountPrice,
countInStock,
category,
brand,
sizes,
colors,
collections,
material,
gender,
images,
isFeatured,
isPublished,
tags,
dimensions,
weight,
sku,
} = req.body;

//find product in db
const product = await Product.findById(req.params.id);
if(product){
    //update product fields
product.name = name || product.name;
product.description = description || product.description;
product.price = price || product.price;
product.discountPrice = discountPrice || product.discountPrice;
product.countInStock = countInStock || product.countInStock;
product.category = category || product.category;
product.brand = brand || product.brand;
product.sizes = sizes || product.sizes;
product.colors = colors || product.colors;
product.collections = collections || product.collections;
product.material = material || product.material;
product.gender = gender || product.gender;
product.images = images || product.images;
product.isFeatured =
isFeatured !== undefined ? isFeatured : product.isFeatured;
product.isPublished =
isPublished !== undefined ? isPublished : product.isPublished;
product.tags = tags || product. tags;
product.dimensions = dimensions || product.dimensions;
product.weight = weight || product.weight;
product.sku = sku || product.sku;

//save the updated product to the db
const updatedProduct = await product.save();
res.json(updatedProduct);
}else{
    res.status(404).json({message:"product not found."})
}
} catch (error) { //500 = internal server error
    console.error(error);
    res.status(500).send("Server Error");
}
})

// @route DELETE /api/products/:id
// @desc Delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      // Remove the product from DB
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", async (req, res) => {
try {
const {collection,
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
 limit
} = req. query;

let query = {};
// Filter logic
if (collection && collection. toLocaleLowerCase() !== "all") {
query.collections = collection;
}
if (category && category. toLocaleLowerCase() !== "all") {
query.category = category;
}
if (material) { // ($in-> as we can hv multiple materials selected in the filter)
query.material = { $in: material.split(",") };
}
if (brand) {
query.brand = { $in: brand. split(",") };
}
if (size) {
query. sizes = { $in: size.split(",") };
}
if (color) {
query. colors = { $in: [color] };
}
if (gender) {
query.gender = gender;
}
if (minPrice || maxPrice) {
query.price = {};
if (minPrice) query.price.$gte = Number(minPrice); //gte >=
if (maxPrice) query.price.$lte = Number(maxPrice); //lte <=

}

if (search && search.trim() !== "") {
  const searchRegex = new RegExp(search.trim(), "i");

  // Wrap search in $and if other filters exist
  query.$and = query.$and || [];

  query.$and.push({
    $or: [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
    ]
  });
}


// Sort Logic
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
// Fetch products and apply sorting and limit
let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
res.json(products);


} catch (error) {
  console.error(error);
    res.status(500).send("Server Error");
}
})

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", async (req, res) => {
try {
const product = await Product. findById(req.params.id);
if (product) {
res.json(product);
} else {
res.status (404) . json({ message: "Product Not Found" });
}
} catch (error){
console.error(error);
res.status(500).send("Server Error");
}

});

module.exports = router;

