import { Flex, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Image, Divider, AbsoluteCenter, HStack, VStack, Spacer } from "@chakra-ui/react";
import React from "react";
import { MyBook } from "../../types/MyBook";
import DetailLabel from "../atoms/DetailLabel";
import CardRadioButtons from "./CardRadioButtons";
import FavoriteButton from "./FavoriteButton";
import DeleteButton from "./DeleteButton";

type MyBookDetailModalProps = {
    isOpen: boolean;
    onClose: ()=>void;
    image: string | string[];
    book: MyBook;
    options: {
		name: String;
		id: Number;
	}[];
	setReadingState;
	readingState: Number;
    isFavorite: Boolean;
    setIsFavorite;
    handleDelete: ()=>void;
};

export const MyBookDetailModal = ({
    isOpen,
    onClose,
    image,
    book,
    options,
    setReadingState,
    readingState,
    isFavorite,
    setIsFavorite,
    handleDelete,
}:MyBookDetailModalProps) => {
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
                            <Image w='100%' objectFit='cover' src={image}/>
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
                                <Divider/>
                                <DetailLabel label='登録日' value={book.registerDate.toLocaleString()}/>
                            </VStack>
                        </Box>
                    </HStack>
                </ModalBody>
                <ModalFooter>
                    <HStack w='100%' h='100%' spacing={1}>
                        <Box h='100%' pl={1}>
                            <CardRadioButtons options={options} setValue={setReadingState} defaultValue={readingState}/>
                        </Box>
                        <Spacer/>
                        <Flex h='100%'>
                            <FavoriteButton isClicked={isFavorite} setIsClicked={setIsFavorite} showLabel/>
                        </Flex>
                        <Spacer/>
                        <Flex h='100%'>
                            <DeleteButton handleDelete={handleDelete}/>
                        </Flex>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MyBookDetailModal;