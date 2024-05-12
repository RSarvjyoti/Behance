import { ChakraProvider } from "@chakra-ui/react";
// import AllProduct from "./components/AllProduct";
import { Home } from "./components/Home";
import './App.css'
// import { PopupExample } from "./components/Model";

function App() {

  return (
    <>
      <ChakraProvider>
      <Home />
      {/* <PopupExample /> */}
        {/* <AllProduct /> */}
      </ChakraProvider>
    </>
  )
}

export default App;
