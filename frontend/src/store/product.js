import { create } from "zustand"; // Fix import statement

export const useProductStore = create((set) => ({
	products: [],
	setproducts: (products) => set({ products }),

	createProduct: async (newProduct) => {
		if (!newProduct.name || !newProduct.image || !newProduct.price) {
			return { success: false, message: "Please fill in all the fields" };
		}

		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newProduct),
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					success: false,
					message: errorData?.message || "Failed to create product",
				};
			}

			const data = await res.json();

			if (data?.data) {
				set((state) => ({ products: [...state.products, data.data] }));
				return {
					success: true,
					message: "Product created successfully",
				};
			} else {
				return {
					success: false,
					message: "Invalid response structure",
				};
			}
		} catch (error) {
			console.error("Error creating product:", error);
			return {
				success: false,
				message: "An error occurred while creating the product",
			};
		}
	},

	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();

		set({ products: data.data });
	},

	deleteProduct: async (pid) => {
		try {
			const res = await fetch(`/api/products/${pid}`, {
				method: "DELETE",
			});

			if (!res.ok) {
				return { success: false, message: "Failed to delete product." };
			}

			const data = await res.json();
			if (!data.success) return { success: false, message: data.message };

			// Update the UI immediately without needing a refresh
			set((state) => ({
				products: state.products.filter(
					(product) => product._id !== pid
				),
			}));

			return { success: true, message: data.message };
		} catch (error) {
			console.error("Error deleting product:", error);
			return {
				success: false,
				message: "An error occurred. Please try again.",
			};
		}
	},
	updateProduct: async (pid, updatedProduct) => {
		try {
			const res = await fetch(`/api/products/${pid}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedProduct),
			});

			if (!res.ok) {
				const errorData = await res.json();
				return {
					success: false,
					message: errorData?.message || "Failed to update product",
				};
			}

			const data = await res.json();

			// Ensure data contains updated product before updating state
			if (!data.success || !data.data) {
				return {
					success: false,
					message: data.message || "Update failed",
				};
			}

			// Update the UI immediately without needing a refresh
			set((state) => ({
				products: state.products.map((product) =>
					product._id === pid ? data.data : product
				),
			}));

			return { success: true, message: data.message };
		} catch (error) {
			console.error("Error updating product:", error);
			return {
				success: false,
				message: "An error occurred. Please try again.",
			};
		}
	},
}));
