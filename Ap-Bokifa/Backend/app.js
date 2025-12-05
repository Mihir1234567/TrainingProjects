import express from "express";
import cors from "cors";
import productRoutes from "./src/routes/v1/productsRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/v1/products", productRoutes);

export default app;
