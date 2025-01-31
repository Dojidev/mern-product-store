import {
	Container,
	Text,
	VStack,
	SimpleGrid,
	Box,
	Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ProductCard from "../component/ProductCard";
import { useProductStore } from "../store/product";
import { useEffect } from "react";

function HomePage() {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<Container maxW="container.xl" py={12}>
			<VStack spacing={8} align="center">
				<Text
					fontSize={{ base: "2xl", md: "4xl" }}
					fontWeight="bold"
					bgGradient="linear(to-r, cyan.400, blue.500, purple.500)"
					bgClip="text"
					textAlign="center"
					letterSpacing="wide"
					lineHeight="shorter"
				>
					✨ Explore Our Products 🚀
				</Text>

				{products.length > 0 ? (
					<SimpleGrid
						columns={{ base: 1, md: 2, lg: 3 }}
						spacing={8}
						w="full"
					>
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</SimpleGrid>
				) : (
					<Box
						textAlign="center"
						bg="gray.50"
						px={6}
						py={8}
						rounded="lg"
						shadow="md"
						w="full"
						maxW="lg"
					>
						<Text fontSize="lg" fontWeight="bold" color="gray.600">
							No products found 😢
						</Text>
						<Link to="/create">
							<Button
								mt={4}
								colorScheme="blue"
								px={6}
								py={3}
								fontSize="md"
								fontWeight="medium"
								rounded="lg"
								transition="all 0.3s"
								_hover={{
									bg: "blue.600",
									transform: "scale(1.05)",
								}}
							>
								+ Create a Product
							</Button>
						</Link>
					</Box>
				)}
			</VStack>
		</Container>
	);
}

export default HomePage;
