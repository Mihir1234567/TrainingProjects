import Product from "../models/productModel.js";

// =======================================================
// HELPER: Build MongoDB Filter Object
// =======================================================
const buildFilter = (query, excludeKey = null) => {
  let filter = {};

  // -----------------------------
  // CATEGORY FILTER
  // -----------------------------
  if (excludeKey !== "category" && query.category) {
    // Support ?category=A&category=B (array) or ?category=A
    filter.category = Array.isArray(query.category)
      ? { $in: query.category }
      : query.category;
  }

  // -----------------------------
  // FORMAT FILTER
  // -----------------------------
  if (excludeKey !== "format" && query.format) {
    filter.format = Array.isArray(query.format)
      ? { $in: query.format }
      : query.format;
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
    if (excludeKey !== field && query[field] !== undefined) {
      filter[field] = query[field] === "true"; // convert string → boolean
    }
  });

  // -----------------------------
  // PRICE RANGE FILTER
  // -----------------------------
  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  // -----------------------------
  // TEXT SEARCH FILTER
  // -----------------------------
  if (query.search) {
    filter.$text = { $search: query.search };
  }

  return filter;
};

// =======================================================
// GET ALL PRODUCTS
// =======================================================
// ===============================
// GET ALL PRODUCTS (Filters + Sort + Pagination)
// ===============================
const getAllProducts = async (req, res) => {
  try {
    const filter = buildFilter(req.query);

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

// =======================================================
// GET PRODUCT FILTERS (FACETS)
// =======================================================
const getProductFilters = async (req, res) => {
  try {
    // 1. Filter for Categories: Apply ALL filters EXCEPT Category
    const categoryMatch = buildFilter(req.query, "category");

    // 2. Filter for Formats: Apply ALL filters EXCEPT Format
    const formatMatch = buildFilter(req.query, "format");

    // 3. Filter for Ratings: Apply all filters EXCEPT Rating (if any)
    const ratingMatch = buildFilter(req.query, "rating");

    // 4. Filter for Availability: Apply all filters EXCEPT Availability (if any)
    // Note: Availability is boolean (isSoldOut), so exclude both isSoldOut
    const availabilityMatch = buildFilter(req.query, "isSoldOut");

    const facets = await Product.aggregate([
      {
        $facet: {
          categories: [
            { $match: categoryMatch },
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ],
          formats: [
            { $match: formatMatch },
            { $group: { _id: "$format", count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
          ],
          // Rating buckets: 4+, 3+, 2+, 1+
          ratings: [
            { $match: ratingMatch },
            {
              $bucket: {
                groupBy: "$rating",
                boundaries: [0, 1, 2, 3, 4, 6], // 6 to include 5.something
                default: "0",
                output: { count: { $sum: 1 } },
              },
            },
          ],
          // Availability: In Stock vs Out of Stock
          availability: [
            { $match: availabilityMatch },
            { $group: { _id: "$isSoldOut", count: { $sum: 1 } } },
          ],
        },
      },
    ]);

    // Format Response
    const categories = facets[0].categories.map((c) => ({
      name: c._id || "Uncategorized",
      count: c.count,
    }));

    const formats = facets[0].formats.map((f) => ({
      name: f._id || "Other",
      count: f.count,
    }));

    // Process Rating Buckets (Cumulative)
    // bucket result: _id is lower bound. e.g. _id: 4 means [4, 6)
    const ratingBuckets = facets[0].ratings;
    const getRatingCount = (min) => {
      // Sum all buckets where _id >= min
      return ratingBuckets
        .filter((b) => b._id >= min)
        .reduce((acc, curr) => acc + curr.count, 0);
    };

    const ratings = [
      { name: "4 Star & Up", count: getRatingCount(4) },
      { name: "3 Star & Up", count: getRatingCount(3) },
      { name: "2 Star & Up", count: getRatingCount(2) },
      { name: "1 Star & Up", count: getRatingCount(1) },
    ];

    // Process Availability
    const availStats = facets[0].availability;
    const inStockCount = availStats.find((a) => a._id === false)?.count || 0;
    const outStockCount = availStats.find((a) => a._id === true)?.count || 0;

    const availability = [
      { name: "In stock", count: inStockCount },
      { name: "Out of stock", count: outStockCount },
    ];

    res.status(200).json({
      success: true,
      data: {
        categories,
        formats,
        ratings,
        availability,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching filters",
      error: error.message,
    });
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  getProductFilters,
};
