import React, { useEffect, useRef, useState } from "react";
import { MyBook } from "../../types/MyBook";
import { Box, Card, CardBody, CardFooter, Divider, Flex, HStack, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { imageNotFound } from "../../consts/IMAGE";
import { STATES } from "../../consts/States";
import CardRadioButtons from "../molecules/CardRadioButtons";
import FavoriteButton from "../molecules/FavoriteButton";
import { editBook } from "../../functions/editBookState";
import MyBookDetailModal from "../molecules/MyBookDetailModal";

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
    const [image, setImage] = useState<string | string[]>(imageNotFound);
    const [readingState, setReadingState] = useState(book.stateId);
    const [isFavorite, setIsFavorite] = useState(book.favorite);
    const toast = useToast();
    const isPreventEdit = useRef(true);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const options = STATES.state.map((state, idx) => {
        return {name: state, id: idx}
    });

    const openToast = (text:string, status:"success" | "error") => {
        toast({
            title: text,
            status: status,
            isClosable: true,
            duration: 1000,
        })
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
        if(book.image) setImage(book.image);
        setIsFavorite(book.favorite);
        setReadingState(book.stateId);
        isPreventEdit.current = true;
    },[book]);
    useEffect(()=>{
        if(isPreventEdit.current){
            isPreventEdit.current = false;
            return;
        }
        handleEditBook();
    },[readingState, isFavorite]);

    return (
        <>
            <Box minW={width} maxW={width} height={height} onClick={onOpen}>
                <Card w='100%' h='100%' variant='filled'>
                    <CardBody h='80%' p={1}>
                        <Flex w='100%' h='90%' justify='center'>
                            <Image objectFit='cover' src={image as string} />
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