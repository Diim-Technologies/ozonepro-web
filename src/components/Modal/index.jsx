import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { CustomButton } from "../Button";

export default function CustomModal({ isOpen, onClose }) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please check your Whatsapp for a message from us!</Text>
          </ModalBody>
          <ModalFooter>
            <CustomButton
              px="60px"
              h="40px"
              bg="primary.500"
              mr={3}
              onClick={onClose}
            >
              Close
            </CustomButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
