import { ChakraProvider } from "@chakra-ui/react";
import { Home } from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MyCarousel } from "./components/Carousel";
import ProductDescriptionPage from "./components/ProductDescriptionPage";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/carousel"
            element={<MyCarousel fetchUrl="your-fetch-url" />}
          />
          <Route
            path="/product/:productId"
            element={<ProductDescriptionPage  productId={productId}/>}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
