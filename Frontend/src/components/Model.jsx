import { useState } from "react";
import {
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
} from "@chakra-ui/react";

export const PopupExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={openPopup}>Add To Cart</Button>
      <Modal isOpen={isOpen} onClose={closePopup} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Email</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <h1>Good afternoon.</h1>
              <Button colorScheme="blue">Subscribe for more access</Button>
              <Link color="black" textDecoration="underline" href="#">
                Log out
              </Link>
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* Any additional footer content can be added here */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};