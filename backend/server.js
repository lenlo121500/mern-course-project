import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); //allows to accept JSON data in the body
const __dirname = path.resolve();

app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5004;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
