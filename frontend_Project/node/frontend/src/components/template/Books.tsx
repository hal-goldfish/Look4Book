import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Book } from "../../types/Book";
import { getBooks } from "../../functions/getBooks";
import { Box, HStack, Table, Td, Thead, Tr } from "@chakra-ui/react";
import { menuListWhenSignIn } from "../../consts/SideMenu";
import { Header } from "../orgnism/Header";
import { SideMenu } from "../orgnism/SideMenu";
import { commonBG } from "../../consts/IMAGE";

export const Books = () => {
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
        <Box bgImage={commonBG} bgSize='cover' overflow='hidden'>
            <Header curPage='本棚'/>
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignIn}/>
                <Box w='100%' h='90vh' overflow='auto'>
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
                </Box>
            </HStack>
        </Box>
    );
}

export default Books;