// components/Logout.jsx
import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box as="form" onSubmit={handleLogout}>
      <Button type="submit">Logout</Button>
    </Box>
  );
}

export default Logout;
