import { ChakraProvider } from "@chakra-ui/react";
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
