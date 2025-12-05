import "dotenv/config";
import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 4000;


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  });
