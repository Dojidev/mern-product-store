import mongoose from "mongoose";

export const connectDb = async () => {
	try {
		// Check if URI is defined
		if (!process.env.MONGO_URI) {
			throw new Error("MONGO_URI environment variable not defined");
		}

		// Prevent duplicate connections
		if (mongoose.connection.readyState === 1) {
			console.log("Already connected to MongoDB");
			return;
		}

		// Connect with options
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			serverSelectionTimeoutMS: 5000,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);

		// Graceful shutdown
		process.on("SIGINT", () => {
			mongoose.connection.close(() => {
				console.log("MongoDB connection closed due to app termination");
				process.exit(0);
			});
		});
	} catch (error) {
		console.error(`MongoDB Connection Error: ${error.message}`);
		process.exit(1);
	}
};
