import { MyCarousel } from "./Carousel";
import home1 from "../Images/home-1.jpg";
import home2 from "../Images/home-2.webp";
import home3 from "../Images/home-3.webp";
import home4 from "../Images/home-4.webp";
import { Box, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const MainContent = () => {
  // const handleCardClick=()=>{
  //   console.log();
  // }
  const navigate = useNavigate();
  const handleCardClick = (id) => {
    localStorage.setItem("productId", id);
    navigate("/prodesc");
  };

  return (
    <>
      <div>
        {/* <Image src={home1} /> */}
        <Box
          style={{ marginTop: "10px", marginBottom: "20px" }}
          bgImage={`url(${home1})`}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          position="relative"
          width="100%"
          fontSize="32px"
          textAlign="left"
          height="400px"
        >
          <Text
            position="absolute"
            width="300px"
            top="50%"
            left="10%"
            transform="translateY(-50%)"
            color="white"
          >
            Escape Ordinary. Embrace Extraordinary.
          </Text>
        </Box>

        <br />

        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Shop our Hydrating Hand Sanitizers
        </h1>
        <MyCarousel
          fetchUrl={"https://behance-z9se.onrender.com/home-1"}
          onCardClick={handleCardClick}
        />

        {/* image 2 */}
        <Image
          src={home2}
          style={{ marginTop: "30px", marginBottom: "20px" }}
        />
        <br />
        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Keep Your Skin Healthy On The Move!
        </h1>
        <MyCarousel
          fetchUrl={"https://behance-z9se.onrender.com/home-2"}
          onCardClick={handleCardClick}
        />

        <br />
        <h1 style={{ marginTop: "20px", marginBottom: "20px" }}>
          Shop Our Best Sellers
        </h1>
        <MyCarousel
          fetchUrl={"https://behance-z9se.onrender.com/home-3"}
          onCardClick={handleCardClick}
        />
        {/* image 2 */}

        {/* <Image src={home3} /> */}
        <Box display="flex" style={{ marginTop: "30px", marginBottom: "20px" }}>
          <Box
            bg="#b19dc9"
            color="white"
            position="relative"
            width="50%"
            textAlign="center"
            height="400px"
            margin="auto"
            fontSize="18px"
          >
            <h2
              style={{
                fontSize: "100%",
                marginBottom: "5%",
                marginTop: "10%",
              }}
            >
              REFILLS
            </h2>{" "}
            <h1 style={{ fontSize: "100%", marginBottom: "5%" }}>
              Join The Refill Revolution{" "}
            </h1>{" "}
            <p
              style={{
                fontSize: "70%",
                marginBottom: "10%",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              Subscribe to your favorite product’s Refill and get a 10% off
            </p>{" "}
            <button
              style={{
                fontSize: "50%",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "1px solid white",
                backgroundColor: "#b19dc9",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              SUBSCRIBE & SAVE
            </button>{" "}
          </Box>
          <Box
            bgImage={`url(${home3})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            position="relative"
            width="50%"
            fontSize="35px"
            textAlign="left"
            height="400px"
          ></Box>
        </Box>
        {/* end image 3 */}

        <br />
        <h1 style={{ marginTop: "30px", marginBottom: "20px" }}>Our Refills</h1>
        <MyCarousel
          fetchUrl={"https://behance-z9se.onrender.com/home-4"}
          onCardClick={handleCardClick}
        />

        {/* <Image src={home4} /> */}
        <Box display="flex" style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Box
            bg="#da8879"
            color="white"
            position="relative"
            width="50%"
            textAlign="center"
            height="400px"
            margin="auto"
            fontSize="18px"
          >
            <h2
              style={{
                fontSize: "100%",
                marginBottom: "5%",
                marginTop: "10%",
              }}
            >
              REFILLS
            </h2>{" "}
            <h1 style={{ fontSize: "100%", marginBottom: "5%" }}>
              Our Purpose{" "}
            </h1>{" "}
            <p
              style={{
                fontSize: "70%",
                marginBottom: "10%",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              Our aim is to eradicate Water Crisis. We support clean water
              projects by creating water wells in developing countries.
            </p>{" "}
            <button
              style={{
                fontSize: "50%",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "1px solid white",
                backgroundColor: "#da8879",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              DISCOVER MORE
            </button>{" "}
          </Box>
          <Box
            bgImage={`url(${home4})`}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            position="relative"
            width="50%"
            fontSize="35px"
            textAlign="left"
            height="400px"
          ></Box>
        </Box>
        {/* <PopupExample /> */}
      </div>
    </>
  );
};
