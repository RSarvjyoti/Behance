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
  Center,
  Accordion,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import AccordianItems from "./AccordianItems";
import "../css files/ProductDP.css";



const ProductDescriptionPage = ({productId}) => {
 console.log("pdp" ,productId);
 let proId = parseInt(productId);
 console.log(typeof(proId));
  const [product, setProduct] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://behance-z9se.onrender.com/data/${proId}`
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
  }, [proId]);

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
  const accTitle = [ 
    "How to Refill",
    "How to use",
    "Ingredients",
    "Shipping & Payment",
  ];
  const sectData = [
    product.refill,
    product.usage,
    product.incredients,
    product.shipping_payment,
  ];
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

        <Box style={{ flex: 1 }} ml={"150px"}>
          <Flex>
            <VStack align="start" spacing={4}>
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
          <Box>
            <Accordion defaultIndex={[0]} allowMultiple>
              {accTitle.map((title, index) => {
                return (
                  <AccordianItems
                    titleOfSection={title}
                    description={sectData[index]}
                    ind ={index}
                  />
                );
              })}
            </Accordion>
          </Box>
        </Box>
      </Box>
      {/* <Box>
          <Flex justify="center" mb={4}>
            <Image src={product.img_src_2} alt={product.name} />
          </Flex>
        </Box> */}
    </>
  );
};

export default ProductDescriptionPage;
