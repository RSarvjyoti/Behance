import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import ProductDescriptionPage from "./components/ProductDescriptionPage";
function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <ProductDescriptionPage productId={2} />
      </ChakraProvider>
    </div>
  );
}

export default App;
