import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: { type: String, required: true },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      format: {
        type: String,
        default: "Paperback",
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingInfo: {
    country: { type: String, required: true },
    province: { type: String, required: true },
    zip: { type: String, required: true },
    cost: { type: Number, default: 0 },
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  note: {
    type: String,
  },
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
