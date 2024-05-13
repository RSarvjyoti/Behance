

// import React, { useState } from "react";
// import '../App.css'
// import {
//   Flex,
//   Box,
//   Text,
//   Stack,
//   Input,
//   InputGroup,
//   InputRightElement,
//   Button,
//   Checkbox,
//   useColorModeValue,
//   Link as ChakraLink, // Renaming Link to avoid conflict with React Router's Link
// } from "@chakra-ui/react";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import { Link as RouterLink, useNavigate } from "react-router-dom"; // Importing Link from react-router-dom

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Assume the login logic here
//     // For demonstration purposes, let's assume successful login if email and password are not empty
//     if (email && password) {
//       // Redirect to home page on successful login
//       navigate("/");
//       // Show alert for successful login
//       alert("Login successful!");
//     } else {
//       // Show alert if email or password is empty
//       alert("Please enter valid email and password.");
//     }
//   };
//   const handleLoginPage=()=>{
//     navigate("/");
//   }
//   const handleAdmin  = ()=> {
//     if(email === "admin@gmail.com" && password=== "admin"){
//       navigate("/admin")
//     }

//   }
//   return (
//     <Flex
      
//       minH={"100vh"}
//       align={"center"}
//       justify={"center"}
//       bg={useColorModeValue("gray.50", "gray.800")}
//     >
//       <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
//         <Stack align={"center"}>
//           <Text fontWeight={700} fontSize={"4xl"}>
//             Sign in to your account
//           </Text>
//           <Text fontSize={"lg"} color={"gray.600"}>
//             to enjoy all of our cool{" "}
//             <Text as="span" color="blue.500">
//               features
//             </Text>
//           </Text>
//         </Stack>
//         <Box
//           rounded={"lg"}
//           bg={useColorModeValue("white", "gray.700")}
//           boxShadow={"lg"}
//           p={8}
//         >
//           <Box spacing={4} as={"form"} onSubmit={handleLoginPage}>
//             <Input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <InputGroup>
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <InputRightElement h={"full"}>
//                 <Button
//                   variant={"ghost"}
//                   onClick={() => setShowPassword((show) => !show)}
//                 >
//                   {showPassword ? <ViewIcon /> : <ViewOffIcon />}
//                 </Button>
//               </InputRightElement>
//             </InputGroup>
//             <Stack spacing={4}>
//               <Checkbox>Remember me</Checkbox>
//               <Button colorScheme="blue" type="submit"  onClick={handleLogin}>
//                 Sign in
//               </Button>
//             </Stack>
//           </Box>
//           <Text mt={4}>
//             Don't have an account?{" "}
//             <ChakraLink as={RouterLink} to="/register" color="blue.500">
//               Sign up here
//             </ChakraLink>
//           </Text>
//           <Box boxSize='l'>
//             {/* <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' /> */}
//           </Box>
//         </Box>
//       </Stack>
//     </Flex>
//   );
// }

// export default Login;

import React, { useState } from "react";
import '../App.css'
import {
  Flex,
  Box,
  Text,
  Stack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  useColorModeValue,
  Link as ChakraLink, // Renaming Link to avoid conflict with React Router's Link
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom"; // Importing Link from react-router-dom

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Assume the login logic here
    // For demonstration purposes, let's assume successful login if email and password are not empty
    if (email && password) {
      // Check if admin login
      handleAdmin();
    } else {
      // Show alert if email or password is empty
      alert("Please enter valid email and password.");
    }
  };

  const handleAdmin = () => {
    if (email === "admin@gmail.com" && password === "admin") {
      navigate("/admin");
    } else {
      // If not admin, proceed with normal login
      navigate("/");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Text fontWeight={700} fontSize={"4xl"}>
            Sign in to your account
          </Text>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool{" "}
            <Text as="span" color="blue.500">
              features
            </Text>
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Box spacing={4} as={"form"} onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() => setShowPassword((show) => !show)}
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Stack spacing={4}>
              <Checkbox>Remember me</Checkbox>
              <Button colorScheme="blue" type="submit">
                Sign in
              </Button>
            </Stack>
          </Box>
          <Text mt={4}>
            Don't have an account?{" "}
            <ChakraLink as={RouterLink} to="/register" color="blue.500">
              Sign up here
            </ChakraLink>
          </Text>
          <Box boxSize='l'>
            {/* <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' /> */}
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
