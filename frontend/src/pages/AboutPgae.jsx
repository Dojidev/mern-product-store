import { Box, Heading, Text, Container } from "@chakra-ui/react";

const AboutPage = () => {
	return (
		<Container maxW="container.md" py={10}>
			<Box textAlign="center" mb={6}>
				<Heading as="h1" size="2xl" mb={4}>
					About Us
				</Heading>
				<Text fontSize="lg">
					Welcome to our website! We are dedicated to providing the
					best service possible.
				</Text>
			</Box>
			<Box>
				<Text fontSize="md" mb={4}>
					Our mission is to deliver high-quality products that bring
					value to our customers. We believe in innovation, integrity,
					and excellence in everything we do.
				</Text>
				<Text fontSize="md">
					Our team is composed of talented and passionate individuals
					who are committed to making a difference. Thank you for
					choosing us!
				</Text>
			</Box>
		</Container>
	);
};

export default AboutPage;
