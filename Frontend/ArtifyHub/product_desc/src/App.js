import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import ProductDescriptionPage from "./component/ProductDescriptionPage";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <ChakraProvider>
        <ProductDescriptionPage productId={5} />
      </ChakraProvider>
    </div>
  );
}

export default App;
