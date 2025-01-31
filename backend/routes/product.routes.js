import express from "express";

import {
	createProduct,
	deleteProduct,
	getProducts,
	updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

// Routes
router.get("/", getProducts); // GET /api/products
router.post("/", createProduct); // POST /api/products
router.put("/:id", updateProduct); // PUT /api/products/:id
router.delete("/:id", deleteProduct); // DELETE /api/products/:id

export default router;
