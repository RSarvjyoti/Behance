import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import ProductDescriptionPage from "./ProductDescriptionPage";

export const MyCarousel = ({ fetchUrl, onCardClick } ) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(fetchUrl)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error("Error fetching data:", err);
      });
  }, [fetchUrl]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, products.length - itemsToShow)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  //responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleAddToCart =()=>{
      console.log("Add To Cart Listnening!!");
  }


  const handleProductPage=(id)=>{
        localStorage.setItem('productId' , JSON.stringify(id));
        console.log("setItems",  id);
        navigate("/prodesc");
        onCardClick(id);

        const proId = (localStorage.getItem('productId'));
        console.log("getItems",  proId);
  }

  return (
    <>
      <div>
        {loading && <h3>Loading...</h3>}
        {error && <h3>error...</h3>}

        <Flex direction="row" alignItems="center" justifyContent="center">
  <Button
    onClick={handlePrev}
    disabled={currentIndex === 0}
    mt={4}
    leftIcon={<ChevronLeftIcon />}
  ></Button>
  <Carousel
    showStatus={false}
    showIndicators={false}
    showThumbs={false}
  >
    <Flex className="carousel">
      {products
        .slice(currentIndex, currentIndex + itemsToShow)
        .map((product) => (
          <Box onClick={()=> handleProductPage(product.id)}
            
            key={product.id}
            className="carousel-item"
            textAlign="center"
            p={4}
            _hover={{ bg: "blue.100" }}
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            borderRadius="10px"
            width={`calc(100% / ${itemsToShow})`} 
          >
            <Image  
              src={product.img}
            //   boxSize="200px"
              objectFit="cover"
              borderRadius="10px"
              mb={2}
            />
            <Text
              fontSize="sm"
              lineHeight="1.2"
              mb={2}
              _hover={{ textDecoration: "underline" }}
            >
              {product.title}
            </Text>

            <Text fontSize="md" color="gray.800">
              {product.price_item}
            </Text>
            <Button
              onClick={handleAddToCart}
              mt={2}
              fontSize="sm"
              bg="white"
              color="black"
              border="1px solid"
              borderRadius="10px"
              _hover={{ bg: "black", color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        ))}
    </Flex>
  </Carousel>
  {/* <PopupExample /> */}
  <Button
    onClick={handleNext}
    disabled={currentIndex >= products.length - itemsToShow}
    mt={2}
    rightIcon={<ChevronRightIcon />}
  ></Button>
</Flex>

      </div>
    </>
  );
};