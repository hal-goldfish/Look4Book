import React, { useEffect, useRef, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { getBooks } from "../../functions/getBooks";
import { Box, Flex, VStack, HStack, Grid } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import SearchArea from "../orgnism/SearchArea";
import { CATEGORIES_NUM } from "../../consts/Categories";
import { MyBook } from "../../types/MyBook";
import MyBookCard from "../orgnism/MyBookCard";
import { searchBooks } from "../../functions/searchBooks";
import { useCacheImageContext } from "../../providers/CacheImage";

const Books = () => {
    const {user} = useAuthUserContext();
    const {getImageWithCache} = useCacheImageContext();
    const [bookList, setBookList] = useState<MyBook[]>([]);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [isOnlyFavorite, setIsOnlyFavorite] = useState<boolean>(false);
    const [isReadingState, setIsReaingState] = useState<boolean[]>([false,false,false]);
    const [isCheckedCategory, setIsCheckedCategory] = useState<boolean[]>([...Array(CATEGORIES_NUM)].map(()=>false));
    const isFirstTime = useRef(true);

    const getBooksByUserId = async () => {
        if(!user) return ;
        const res = await getBooks(user.id, getImageWithCache);
        setBookList(res);
        setIsDisabled(false);
    };
    const getBooksBySearchOptions = async () => {
        if(!user) return ;
        const res = await searchBooks(user.id, isOnlyFavorite, isReadingState, isCheckedCategory, getImageWithCache);
        setBookList(res);
        setIsDisabled(false);
    };
    useEffect(() => {
        setIsDisabled(true);
        if(isFirstTime.current){
            getBooksByUserId();
            isFirstTime.current = false;
        }else{
            getBooksBySearchOptions();
        }
    },[isOnlyFavorite, isReadingState, isCheckedCategory]);
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
                isDisabled={isDisabled}
            />
            <Box width='75%' maxH='100%' overflow='auto'>
                <Grid templateColumns='repeat(5, 1fr)' gap={5}>
                    {
                        bookList.map(book => {
                            return (
                                <MyBookCard book={book}/>
                            );
                        })
                    }
                </Grid>
            </Box>
        </HStack>
    );
};

export const BooksTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本棚'/>
            <Flex w='100%' h='90vh' alignItems='center' justify='center'>
                <Box alignItems='center' w='90%' maxW='90%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px'>
                    <Books/>
                </Box>
            </Flex>
        </VStack>
    );
}

export default BooksTemplate;