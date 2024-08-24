import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Image } from "@chakra-ui/react";
import React from "react";

type MyBookDetailModalProps = {
    isOpen: boolean;
    onClose: ()=>void;
    image: string;
};

export const MyBookDetailModal = ({
    isOpen,
    onClose,
    image,
}:MyBookDetailModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>詳細</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>うおおおお</Text>
                    <Image src={image}/>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                    </Button>
                    <Button variant='ghost'>削除する</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MyBookDetailModal;