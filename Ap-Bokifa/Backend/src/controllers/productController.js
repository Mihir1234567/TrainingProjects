import Product from "../models/productModel.js";

// =======================================================
// GET ALL PRODUCTS
// =======================================================
// ===============================
// GET ALL PRODUCTS (Filters + Sort + Pagination)
// ===============================
const getAllProducts = async (req, res) => {
  try {
    let filter = {};

    // -----------------------------
    // CATEGORY FILTER
    // -----------------------------
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // -----------------------------
    // FORMAT FILTER
    // -----------------------------
    if (req.query.format) {
      filter.format = req.query.format;
    }

    // -----------------------------
    // BOOLEAN FILTERS
    // -----------------------------
    const booleanFields = [
      "currentBestselling",
      "isHighlight",
      "isHalfPrice",
      "isSoldOut",
      "isPickForYou",
      "isFeatured",
      "isWishlist",
    ];

    booleanFields.forEach((field) => {
      if (req.query[field] !== undefined) {
        filter[field] = req.query[field] === "true"; // convert string → boolean
      }
    });

    // -----------------------------
    // PRICE RANGE FILTER
    // -----------------------------
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    }

    // -----------------------------
    // SORTING
    // -----------------------------
    let sort = {};

    switch (req.query.sort) {
      case "price_asc":
        sort.price = 1;
        break;
      case "price_desc":
        sort.price = -1;
        break;
      case "rating":
        sort.rating = -1;
        break;
      case "newest":
        sort.dateAdded = -1;
        break;
      default:
        sort.dateAdded = -1; // default sort
        break;
    }

    // -----------------------------
    // PAGINATION
    // -----------------------------
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Count total documents (for pagination UI)
    const total = await Product.countDocuments(filter);

    // -----------------------------
    // QUERY EXECUTION
    // -----------------------------
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // -----------------------------
    // RESPONSE
    // -----------------------------
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// =======================================================
// GET PRODUCT BY ID
// =======================================================
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ id: Number(id) });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Invalid product ID",
      error: error.message,
    });
  }
};

// =======================================================
// CREATE PRODUCT
// =======================================================
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create product",
      error: error.message,
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
};
