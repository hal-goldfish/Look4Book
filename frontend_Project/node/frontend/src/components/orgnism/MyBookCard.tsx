import React, { useEffect, useRef, useState } from "react";
import { MyBook } from "../../types/MyBook";
import { Box, Card, CardBody, CardFooter, Divider, Flex, HStack, Image, Text, useDisclosure, useToast, Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { getBookImage } from "../../functions/getBookImage";
import { imageNotFound } from "../../consts/IMAGE";
import { STATES } from "../../consts/States";
import CardRadioButtons from "../molecules/CardRadioButtons";
import FavoriteButton from "../molecules/FavoriteButton";
import { editBook } from "../../functions/editBookState";
import MyBookDetailModal from "../molecules/MyBookDetailModal";
import { duration } from "@mui/material";

type MyBookCardPops = {
    book: MyBook;
    width?: string;
    height?: string;
};

export const MyBookCard = ({
    book,
    width='150px',
    height='200px',
}:MyBookCardPops) => {
    const [image, setImage] = useState(imageNotFound);
    const [readingState, setReadingState] = useState(book.stateId);
    const [isFavorite, setIsFavorite] = useState(book.favorite);
    const toast = useToast();
    const isFirstTime = useRef(true);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const options = STATES.state.map(state => {
        return {name: state, id: STATES.id[state]}
    });

    const openToast = (text:string, status:string) => {
        toast({
            title: text,
            status: status,
            isClosable: true,
            duration: 1000,
        })
    };
    const getImageById = async () => {
        const res = await getBookImage(book.ISBN);
        setImage(res);
    };
    const handleEditBook = async () => {
        const res = await editBook(book.userId, book.bookId, readingState, isFavorite);
        if(res){
            openToast('更新しました', 'success');
        }else{
            openToast('更新できませんでした', 'error');
        }
    };
    const handleDelete = () => {
        // TODO: 本棚から削除する処理を書く
    };

    useEffect(() => {
        getImageById();
    },[]);
    useEffect(()=>{
        if(isFirstTime.current){
            isFirstTime.current = false;
            return;
        }
        handleEditBook();
    },[readingState, isFavorite]);

    return (
        <>
            <Box width={width} height={height} onClick={onOpen}>
                <Card w='100%' h='100%' variant='filled'>
                    <CardBody h='80%' p={1}>
                        <Flex w='100%' h='90%' justify='center'>
                            <Image objectFit='cover' src={image} />
                        </Flex>
                        <Flex h='10%' justify='left' overflow='hidden'>
                            <Text w='100%' fontSize='x-small'>{book.title}</Text>
                        </Flex>
                    </CardBody>
                    <Divider/>
                    <CardFooter w='100%' h='20%' py={1} px={0}>
                        <HStack w='100%' h='100%' spacing={1}>
                            <Box w='70%' h='100%' pl={1}>
                                <CardRadioButtons options={options} setValue={setReadingState} defaultValue={readingState}/>
                            </Box>
                            <Flex w='30%' h='100%'>
                                <FavoriteButton isClicked={isFavorite} setIsClicked={setIsFavorite}/>
                            </Flex>
                        </HStack>
                    </CardFooter>
                </Card>
            </Box>
            <MyBookDetailModal
                isOpen={isOpen}
                onClose={onClose}
                image={image}
                book={book}
                options={options}
                setReadingState={setReadingState}
                readingState={readingState}
                isFavorite={isFavorite}
                setIsFavorite={setIsFavorite}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default MyBookCard;