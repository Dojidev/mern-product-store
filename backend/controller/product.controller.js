import Product from "../models/product.model.js";
import mongoose from "mongoose";

//==========================Use Get for deleting product=============================//
export const getProducts = async (req, res) => {
	try {
		// Fetch all products from the database
		const products = await Product.find({});

		// If no products are found (empty array), return a 404 response
		if (products.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No products found",
			});
		}

		// If products are successfully fetched, return them in the response
		res.status(200).json({
			success: true,
			message: "All products fetched successfully",
			data: products,
		});
	} catch (error) {
		console.error("Error fetching products:", error.message); // Log the error for debugging
		res.status(500).json({
			success: false,
			message: "Server error while fetching products",
		}); // Respond with a server error
	}
};

//==========================Use POST for creating a product==========================//
export const createProduct = async (req, res) => {
	const product = req.body; // User sends this data to the server

	// Validate required fields
	if (!product.name || !product.price || !product.image) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all the fields" });
	}

	const newProduct = new Product(product); // Create a new product instance

	try {
		await newProduct.save(); // Save the product to the database
		res.status(201).json({ success: true, data: newProduct }); // Respond with the created product
	} catch (error) {
		console.log("Error in creating product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

//==========================Use put for udating product=============================//
export const updateProduct = async (req, res) => {
	const { id } = req.params; // Extract the `id` from the URL parameters
	const product = req.body; // Extract the update data from the request body

	console.log("id: ", id); // Log the `id` for debugging
	console.log("product: ", product); // Log the update data for debugging

	// Check if the `id` is a valid MongoDB ObjectId
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			success: false,
			message: "Invalid product ID",
		});
	}

	try {
		// Find and update the product
		const updateProduct = await Product.findByIdAndUpdate(id, product, {
			new: true, // Return the updated document
		});

		// If no product is found with the given `id`
		if (!updateProduct) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		// If the product is successfully updated
		res.status(200).json({
			success: true,
			message: "Product updated successfully",
			data: updateProduct,
		});
	} catch (error) {
		console.error("Error updating product:", error.message); // Log the error
		res.status(500).json({
			success: false,
			message: "Server error while updating the product",
		}); // Respond with a server error
	}
};

//==========================use Delete for deleting product==========================//
export const deleteProduct = async (req, res) => {
	const { id } = req.params; // Extract the `id` from the URL parameters
	console.log("id: ", id); // Log the `id` for debugging

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			success: false,
			message: "Invalid product ID",
		});
	}

	try {
		const deletedProduct = await Product.findByIdAndDelete(id); // Find and delete the product

		// If no product is found with the given `id`
		if (!deletedProduct) {
			return res
				.status(404)
				.json({ success: false, message: "Product not found" });
		}

		// If the product is successfully deleted
		res.status(200).json({
			success: true,
			message: "Product Deleted",
			data: deletedProduct,
		});
	} catch (error) {
		console.error("Error deleting product:", error.message); // Log the error
		res.status(500).json({ success: false, message: "Server Error" }); // Respond with a server error
	}
};
