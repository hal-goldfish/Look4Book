import React, { useEffect, useRef, useState } from "react";
import { MyBook } from "../../types/MyBook";
import { Box, Card, CardBody, CardFooter, Divider, Flex, HStack, Image, Text, useToast, VStack } from "@chakra-ui/react";
import { getBookImage } from "../../functions/getBookImage";
import { imageNotFound } from "../../consts/IMAGE";
import { STATES } from "../../consts/States";
import CardRadioButtons from "../molecules/CardRadioButtons";
import FavoriteButton from "../molecules/FavoriteButton";
import { editBook } from "../../functions/editBookState";

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
    const getImageById = async () => {
        const res = await getBookImage(book.ISBN);
        setImage(res);
    };
    useEffect(() => {
        getImageById();
    },[]);
    const options = STATES.state.map(state => {
        return {name: state, id: STATES.id[state]}
    });
    const [readingState, setReadingState] = useState(book.stateId);
    const [isFavorite, setIsFavorite] = useState(book.favorite);
    const toast = useToast();
    const isFirstTime = useRef(true);

    const openToast = (text:string, status:string) => {
        toast({
            title: text,
            status: status,
            isClosable: true,
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
    useEffect(()=>{
        if(isFirstTime.current){
            isFirstTime.current = false;
            return;
        }
        handleEditBook();
    },[readingState, isFavorite]);
    return (
        <Box width={width} height={height}>
            <Card w='100%' h='100%' variant='filled'>
                <CardBody h='80%' p={1}>
                    <Flex w='100%' h='90%' borderColor='black' borderWidth='2px'>
                        <Image w='100%' h='100%' src={imageNotFound} />
                    </Flex>
                    <Flex h='10%' justify='left' overflow='hidden'>
                        <Text w='100%' fontSize='x-small'>{book.title}</Text>
                    </Flex>
                </CardBody>
                <Divider/>
                <CardFooter w='100%' h='20%' py={1} px={0}>
                    <HStack w='100%' h='100%' spacing={1}>
                        <Box w='70%' h='100%'>
                            <CardRadioButtons options={options} setValue={setReadingState} defaultValue={readingState}/>
                        </Box>
                        <Flex w='30%' h='100%'>
                            <FavoriteButton isClicked={isFavorite} setIsClicked={setIsFavorite} color='lightblue'/>
                        </Flex>
                    </HStack>
                </CardFooter>
            </Card>
        </Box>
    );
};

export default MyBookCard;