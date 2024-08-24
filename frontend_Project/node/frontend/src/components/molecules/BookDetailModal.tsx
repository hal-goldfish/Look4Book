import { Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Image, Divider, AbsoluteCenter, HStack, VStack, Spacer, Button } from "@chakra-ui/react";
import React from "react";
import DetailLabel from "../atoms/DetailLabel";
import { Book } from "../../types/Book";
import AddButton from "../molecules/AddButton";

type BookDetailModalProps = {
    isOpen: boolean;
    onClose: ()=>void;
    image: string | string[];
    book: Book;
    handleAdd: ()=>void;
    isRegistered:  boolean;
};

export const BookDetailModal = ({
    isOpen,
    onClose,
    image,
    book,
    handleAdd,
    isRegistered,
}: BookDetailModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>詳細</ModalHeader>
                <ModalCloseButton />
                <Box position='relative' p={2}>
                    <Divider borderColor='black' />
                    <AbsoluteCenter w='90%' maxW='90%' overflow='hidden'>
                        <Flex justify='center'>
                            <Text bg='white' p={2}>{book.title}</Text>
                        </Flex>
                    </AbsoluteCenter>
                </Box>
                <ModalBody mt={2}>
                    <HStack alignItems='flex-start'>
                        <Box w='40%'>
                            <Image w='100%' objectFit='cover' src={image as string}/>
                        </Box>
                        <Box w='60%' h='100%' pt={2}>
                            <VStack alignItems='flex-start'>
                                <DetailLabel label='タイトル' value={book.title}/>
                                <Divider/>
                                <DetailLabel label='著者' value={book.author}/>
                                <Divider/>
                                <DetailLabel label='出版社' value={book.publisher}/>
                                <Divider/>
                                <DetailLabel label='カテゴリ' value={book.categoryName}/>
                            </VStack>
                        </Box>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack w='100%' h='100%' spacing={1}>
                        <Button variant='ghost'>
                            <AddButton isRegistered={isRegistered} handleAdd={handleAdd} showLabel={true}/>
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default BookDetailModal;