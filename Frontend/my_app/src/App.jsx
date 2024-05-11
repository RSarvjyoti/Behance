import { ChakraProvider } from "@chakra-ui/react";
import AllProduct from "./components/AllProduct";

function App() {

  return (
    <>
      <ChakraProvider>
        <AllProduct />
      </ChakraProvider>
    </>
  )
}

export default App;
