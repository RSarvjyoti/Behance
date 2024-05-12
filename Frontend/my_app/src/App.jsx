import { ChakraProvider } from "@chakra-ui/react";
// import AllProduct from "./components/AllProduct";
import { Home } from "./components/Home";
import './App.css'

function App() {

  return (
    <>
      <ChakraProvider>
      <Home />
        {/* <AllProduct /> */}
      </ChakraProvider>
    </>
  )
}

export default App;
