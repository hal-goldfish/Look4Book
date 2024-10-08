import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, HStack, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { imageNotFound } from "../../consts/IMAGE";
import { Book } from "../../types/Book";
import BookDetailModal from "../molecules/BookDetailModal";
import AddButton from "../molecules/AddButton";
import { registerBook } from "../../functions/registerBook";
import { isAlreadyRegistered } from "../../functions/isAlreadyRegistered";

type BookCardPops = {
    userId: number;
    book: Book;
    width?: string;
    height?: string;
};

export const BookCard = ({
    userId,
    book,
    width='150px',
    height='200px',
}: BookCardPops) => {
    const [image, setImage] = useState<string | string[]>(imageNotFound);
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [prevRegistered, setPrevRegistered] = useState<boolean|null>(null);
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const isFirstTime = useRef(true);

    const openToast = (text:string, status:"success" | "error") => {
        toast({
            title: text,
            status: status,
            isClosable: true,
            duration: 1000,
        })
    };
    const hasBook = async () => {
        setIsFetched(false);
        const res = await isAlreadyRegistered(userId, book.id);
        setIsRegistered(res);
        setIsFetched(true);
    };
    const handleAdd = async () => {
        const res = await registerBook(userId, book.ISBN);
        if(res !== -1){
            setIsRegistered(true);
            openToast('更新しました', 'success');
        }else{
            // openToast('失敗しました', 'error');
        }
        hasBook();
    };

    useEffect(() => {
        if(book.image) setImage(book.image);
        hasBook();
    },[book]);
    useEffect(()=>{
        setPrevRegistered(isRegistered);
        if(isFirstTime.current){
            isFirstTime.current = false ;
            return ;
        }
        if(isFetched){
            if(isRegistered && (prevRegistered===false)){
                handleAdd();
            }
        }
    },[isRegistered]);

    return (
        <>
            <Box minW={width} maxW={width} height={height} onClick={onOpen}>
                <Card w='100%' h='100%' variant='filled'>
                    <CardBody h='80%' p={1}>
                        <Flex w='100%' h='85%' justify='center'>
                            <Image objectFit='cover' src={image as string} />
                        </Flex>
                        <Flex h='15%' justify='left' overflow='hidden'>
                            <Text isTruncated w='100%' fontSize='small'>{book.title}</Text>
                        </Flex>
                    </CardBody>
                    <Divider/>
                    <CardFooter w='100%' h='20%' py={1} px={0}>
                        <Flex w='100%' h='100%' px={2} justify='right'>
                            <Flex>
                                <AddButton isRegistered={isRegistered||false} setIsRegistered={setIsRegistered}/>
                            </Flex>
                        </Flex>
                    </CardFooter>
                </Card>
            </Box>
            <BookDetailModal
                isOpen={isOpen}
                onClose={onClose}
                image={image}
                book={book}
                setIsRegistered={setIsRegistered}
                isRegistered={isRegistered||false}
            />
        </>
    );
};

export default BookCard;
