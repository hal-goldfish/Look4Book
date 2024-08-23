import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Book } from "../../types/Book";
import { getBooks } from "../../functions/getBooks";
import { Box, Flex, Table, Td, Thead, Tr, VStack, HStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import SearchArea from "../orgnism/SearchArea";
import { CATEGORIES_NUM } from "../../consts/Categories";

const Books = () => {
    const {user} = useAuthUserContext();
    const [bookList, setBookList] = useState<Book[]>([]);
    const [keyword, setKeyword] = useState<String>('');
    const [isOnlyFavorite, setIsOnlyFavorite] = useState<boolean>(false);
    const [isReadingState, setIsReaingState] = useState<boolean[]>([false,false,false]);
    const [isCheckedCategory, setIsCheckedCategory] = useState<boolean[]>([...Array(CATEGORIES_NUM)].map(()=>false));

    const getBooksByUserId = async () => {
        if(!user) return ;
        const res = await getBooks(user.id);
        setBookList(res);
    };
    useEffect(() => {
        getBooksByUserId();
    },[]);
    return (
        <HStack h='100%' alignItems='flex-start'>
            <SearchArea
                width="25%"
                keyword={keyword}
                setKeyword={setKeyword}
                onClick={()=>{}}
                setIsOnlyFavorite={setIsOnlyFavorite}
                setIsReadingState={setIsReaingState}
                setIsCheckedCategory={setIsCheckedCategory}
            />
            <Box width='75%'>
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