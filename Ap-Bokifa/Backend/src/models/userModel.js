import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  cart: [
    {
      id: String,
      format: String,
      quantity: Number,
      title: String,
      price: Number,
      imageUrl: String,
    },
  ],
  wishlist: [
    {
      id: String,
      title: String,
      price: Number,
      imageUrl: String,
      slug: String,
    },
  ],
  compare: [
    {
      id: String,
      title: String,
      price: Number,
      imageUrl: String,
      slug: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
