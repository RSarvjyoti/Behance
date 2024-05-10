// import React from "react";
// import {
//   Box,
//   Image,
//   Text,
//   Heading,
//   Flex,
//   Button,
//   VStack,
//   Spinner,
//   // Center,
// } from "@chakra-ui/react";
// import axios from "axios";

// const ProductDescriptionPage = () => {
//   const [product, setProduct] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   React.useEffect(() => {
//     axios
//       .get("https://behance-z9se.onrender.com/data")
//       .then((response) => {
//         const data = response.data;
//         setProduct(data[0]); // Assuming you want to display the first product
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <Box maxW="container.md" p={4} mx="auto">
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   if (!product) {
//     return (
//       <Box maxW="container.md" p={4} mx="auto">
//         <Text>No product found</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       p={4}
//       mx="auto"
//       display="flex"
//       alignItems="center"
//       justifyContent="space-evenly"
//     >
//       <Box
//         // maxW="container.md"
//         style={{ flex: 1 }}
//       >
//         <Flex justify="center" mb={4}>
//           <Image src={product.img_src} alt={product.name} />
//         </Flex>
//         <Flex justify="center" mb={4}>
//           <Image src="../../../Images/Home_Pool_2.jpg" alt={product.name} />
//         </Flex>
//       </Box>
//       <Box style={{ flex: 1 }}>
//         <Flex>
//           <VStack align="start" spacing={14}>
//             <Heading as="h1" fontSize="xl">
//               {product.title}
//             </Heading>
//             <Text fontSize="lg" color="gray.600" w={"20rem"} align="start">
//               {product.main_desc}
//             </Text>
//             <Box w="100%" style={{ display: "flex", justifyContent: "center" }}>
//               <Text fontSize="xl" fontWeight="bold">
//                 {product.price_item}
//               </Text>
//             </Box>
//             <Box w="100%" style={{ display: "flex", justifyContent: "center" }}>
//               <Button
//                 variant="solid"
//                 colorScheme="blue"
//                 size="lg"
//                 align="center"
//               >
//                 Add to Cart
//               </Button>
//             </Box>
//           </VStack>
//         </Flex>
//       </Box>
//       {/* <Box>
//         <Flex justify="center" mb={4}>
//           <Image src={product.img_src_2} alt={product.name} />
//         </Flex>
//       </Box> */}
//     </Box>
//   );
// };

// export default ProductDescriptionPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  Grid,
  Text,
  Button,
  Image,
  Flex,
  Link,
} from "@chakra-ui/react";

const ProductDescriptionPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    // Simulate fetching product data from an API based on ID from URL
    const productId = match.params.id;
    fetch(`https://behance-z9se.onrender.com/data/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));

    // Simulate fetching similar products data (replace with your API logic)
    fetch("/api/similar-products")
      .then((response) => response.json())
      .then((data) => setSimilarProducts(data))
      .catch((error) => console.error(error));
  }, [match]);

  return (
    <Box
      p={4}
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Box
        // maxW="container.md"
        style={{ flex: 1 }}
      >
        <Flex justify="center" mb={4}>
          <Image src={product.img_src} alt={product.name} />
        </Flex>
        <Flex justify="center" mb={4}>
          <Image src="../../../Images/Home_Pool_2.jpg" alt={product.name} />
        </Flex>
      </Box>
      <Box style={{ flex: 1 }}>
        <Flex>
          <VStack align="start" spacing={14}>
            <Heading as="h1" fontSize="xl">
              {product.title}
            </Heading>
            <Text fontSize="lg" color="gray.600" w={"20rem"} align="start">
              {product.main_desc}
            </Text>
            <Box w="100%" style={{ display: "flex", justifyContent: "center" }}>
              <Text fontSize="xl" fontWeight="bold">
                {product.price_item}
              </Text>
            </Box>
            <Box w="100%" style={{ display: "flex", justifyContent: "center" }}>
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
  );
};
export default ProductDescriptionPage;
