// import React from "react";
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
  // url,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import AccordianItems from "./AccordianItems";
import "../css files/ProductDP.css";
import React, { useState, useEffect } from "react";

// const ProductDescriptionPage = ({productId}) => {
//  console.log("pdp" ,productId);
//  let proId = parseInt(productId);
//  console.log(typeof(proId));

import spray_400 from "../Images/400_Sprays.avif";
import kills from "../Images/Kills_99_9_Virus.webp";
import nature from "../Images/Natural_Origin.avif";
import probiotics from "../Images/Prebiotics.webp";
import spray from "../Images/Spray_System.avif";

const ProductDescriptionPage = ({ productId }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const productImages = [product.img_src, product.img_src_2];
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
        </Box>
      </Box>
      <Box width={"100%"}>
        <Accordion defaultIndex={[0]} allowMultiple>
          {accTitle.map((title, index) => {
            return (
              <AccordianItems
                titleOfSection={title}
                description={sectData[index]}
                ind={index}
              />
            );
          })}
        </Accordion>
      </Box>
      <Box mt={"60px"}>
        <Flex
          justify="center"
          alignItems="center"
          mb={4}
          width={"40%"}
          ml={"2rem"}
        >
          <Image src={spray} style={{ width: "90px", height: "90px" }} />
          <Image src={spray_400} style={{ width: "90px", height: "90px" }} />
          <Image src={nature} style={{ width: "90px", height: "90px" }} />
          <Image src={probiotics} style={{ width: "90px", height: "90px" }} />
          <Image src={kills} style={{ width: "90px", height: "90px" }} />
        </Flex>
      </Box>
      <Box display="flex" style={{ marginTop: "160px", marginBottom: "20px" }}>
        <Box
          bg={product.color}
          color="white"
          position="relative"
          width="50%"
          textAlign="center"
          height="500px"
          margin="auto"
          fontSize="18px"
        >
          <h1
            style={{
              fontSize: "50px",
              marginBottom: "20px",
              marginTop: "150px",
            }}
          >
            {/* Our Purpose{" "} */}
            {product.pdp_title}
          </h1>{" "}
          <p
            style={{
              fontSize: "35px",
              marginBottom: "20px",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {/* Our aim is to eradicate Water Crisis. We support clean water0 */}
            {product.pdp_text}
          </p>{" "}
        </Box>
        <Box
          bgImage={`url(${product.pdp_section_Img})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          position="relative"
          width="50%"
          fontSize="35px"
          textAlign="left"
          height="500px"
        ></Box>
      </Box>
    </>
  );
};

export default ProductDescriptionPage;
