import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, HStack, Image, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { imageNotFound } from "../../consts/IMAGE";
import { Book } from "../../types/Book";
import BookDetailModal from "../molecules/BookDetailModal";
import AddButton from "../molecules/AddButton";

type BookCardPops = {
    book: Book;
    width?: string;
    height?: string;
};

export const BookCard = ({
    book,
    width='150px',
    height='200px',
}: BookCardPops) => {
    const [image, setImage] = useState<string | string[]>(imageNotFound);
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const openToast = (text:string, status:"success" | "error") => {
        toast({
            title: text,
            status: status,
            isClosable: true,
            duration: 1000,
        })
    };
    const handleAdd = () => {
        console.log('追加されました');
    };

    useEffect(() => {
        if(book.image) setImage(book.image);
    },[book]);

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
                            <Button variant='ghost'>
                                <AddButton handleAdd={handleAdd}/>
                            </Button>
                        </HStack>
                    </CardFooter>
                </Card>
            </Box>
            <BookDetailModal
                isOpen={isOpen}
                onClose={onClose}
                image={image}
                book={book}
                handleAdd={handleAdd}
            />
        </>
    );
};

export default BookCard;