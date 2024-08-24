import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { getBooks } from "../../functions/getBooks";
import { Box, Flex, Table, Td, Thead, Tr, VStack, HStack, Text, Button } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import SearchArea from "../orgnism/SearchArea";
import { CATEGORIES_NUM } from "../../consts/Categories";
import { MyBook } from "../../types/MyBook";
import MyBookCard from "../orgnism/MyBookCard";

const Books = () => {
    const {user} = useAuthUserContext();
    const [bookList, setBookList] = useState<MyBook[]>([]);
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
            <Box width='75%' h='100%' overflow='auto'>
                {
                    bookList.map(book => {
                        return (
                            <MyBookCard book={book}/>
                        );
                    })
                }
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