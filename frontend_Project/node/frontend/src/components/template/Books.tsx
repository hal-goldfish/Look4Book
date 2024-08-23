import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Book } from "../../types/Book";
import { getBooks } from "../../functions/getBooks";
import { Box, Flex, Table, Td, Thead, Tr, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";

const Books = () => {
    const {user} = useAuthUserContext();
    const [bookList, setBookList] = useState<Book[]>([]);

    const getBooksByUserId = async () => {
        if(!user) return ;
        const res = await getBooks(user.id);
        setBookList(res);
    };
    useEffect(() => {
        getBooksByUserId();
    },[]);
    return (
        <Table>
            <Thead>
                <Td>タイトル</Td>
                <Td>ISBN</Td>
                <Td>筆者</Td>
                <Td>出版社</Td>
            </Thead>
            {bookList.map(book =>
                <Tr>
                    <Td>{book.title}</Td>
                    <Td>{book.isbn}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publisher}</Td>
                </Tr>
            )}
        </Table>
    );
};

export const BooksTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本棚'/>
            <Flex w='100%' h='90vh' alignItems='center'>
                <Box w='100%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px' m='5%'>
                    <Box w='100%' h='100%' overflow='auto'>
                        <Books/>
                    </Box>
                </Box>
            </Flex>
        </VStack>
    );
}

export default BooksTemplate;