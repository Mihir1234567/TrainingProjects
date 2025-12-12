import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/v1/productsRoutes.js";
import blogRoutes from "./src/routes/v1/blogsRoutes.js";
import authRoutes from "./src/routes/v1/authRoutes.js";
import ordersRoutes from "./src/routes/v1/ordersRoutes.js"; // ADDED

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/orders", ordersRoutes); // ADDED

export default app;
