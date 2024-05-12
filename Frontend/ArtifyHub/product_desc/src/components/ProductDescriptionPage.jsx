import React from "react";
import {
  Box,
  Image,
  Text,
  Heading,
  Flex,
  Button,
  VStack,
  Spinner,
  // ChakraProvider,
  Center,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const ProductDescriptionPage = ({ productId }) => {
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://behance-z9se.onrender.com/data/${productId}`
        );
        const data = response.data;
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box maxW="container.md" p={4} mx="auto">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box maxW="container.md" p={4} mx="auto">
        <Text>No product found</Text>
      </Box>
    );
  }

  const productImages = [product.img_src, product.img_src_2]; // Assuming img_src_2 exists

  return (
    <>
      <Box
        p={4}
        mx="auto"
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
      >
        {/* <Box
        // maxW="container.md"
        style={{ flex: 1 }}
      >
        <Flex justify="center" mb={4}>
          <Image src={product.img_src} alt={product.name} />
        </Flex>
      </Box> */}
        <Box style={{ flex: 1 }}>
          <Carousel>
            {productImages.map((imageSrc, index) => (
              <Center key={index}>
                <Image src={imageSrc} alt={product.name} />
              </Center>
            ))}
          </Carousel>
        </Box>

        <Box style={{ flex: 1 }} ml={"100px"}>
          <Flex>
            <VStack align="start" spacing={14}>
              <Heading as="h1" fontSize="xl">
                {product.title}
              </Heading>
              <Text fontSize="lg" color="gray.600" w={"20rem"} align="start">
                {product.main_desc}
              </Text>
              <Box
                w="100%"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Text fontSize="xl" fontWeight="bold">
                  {product.price_item}
                </Text>
              </Box>
              <Box
                w="100%"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="solid"
                  colorScheme="blue"
                  size="lg"
                  align="center"
                >
                  Add to Cart
                </Button>
              </Box>
            </VStack>
          </Flex>
        </Box>
        {/* <Box>
          <Flex justify="center" mb={4}>
            <Image src={product.img_src_2} alt={product.name} />
          </Flex>
        </Box> */}
        
      </Box>
      <Box style={{ flex: 1 }}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section 1 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Section 2 title
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </>
  );
};

export default ProductDescriptionPage;
