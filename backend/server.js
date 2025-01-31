import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json()); // Parses incoming JSON data

// API Routes
app.use("/api/products", productRoutes);

// Serve frontend in production mode
if (process.env.NODE_ENV === "production") {
	// Serve static files from the frontend build
	app.use(express.static(path.join(__dirname, "../frontend/dist"))); // Adjust the path to the correct directory

	// Serve index.html for any route
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html")); // Adjust path here as well
	});
}

// Connect to DB and start server
connectDb()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`✅ Server running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("❌ Database connection failed:", err);
		process.exit(1); // Exit with failure
	});
