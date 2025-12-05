import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },

    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true, default: "" },
    description: { type: String, default: "" },

    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },

    discount: { type: Number, default: null },
    saleEndDate: { type: Date, default: null },

    imageUrl: { type: String, required: true },

    currentBestselling: { type: Boolean, default: false },
    isHighlight: { type: Boolean, default: false },
    isHalfPrice: { type: Boolean, default: false },
    isSoldOut: { type: Boolean, default: false },
    isPickForYou: { type: Boolean, default: false },
    isWishlist: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },

    category: { type: String, default: "Uncategorized" },
    format: { type: String, default: "" },

    dateAdded: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// For future search functionality
productSchema.index({ title: "text", author: "text", category: "text" });

export default mongoose.model("Product", productSchema);
