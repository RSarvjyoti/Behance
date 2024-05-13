import React, { useState } from "react";
import {
  Stack,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
  Text,
  
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const payload = {
      username,
      email,
      password,
    };

    fetch("http://localhost:8080/users", { // Updated API endpoint for registration
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/"); 
      })
      .catch((err) => console.error(err));
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignUp=()=>{
    navigate("/");
  }
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign up for an account</Heading>
          <form onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
            <Stack spacing={6}>
              <Checkbox>Agree to terms and conditions</Checkbox>
              <Button colorScheme={"blue"} width={"50%"}  onClick={handleSignUp}>
                Sign up
              </Button>
            </Stack>
          </form>
          <Text>
            Already have an account?{" "}
            <Button colorScheme="blue" onClick={handleLoginClick}>
             Login
    </Button>
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}

export default Register;
