import React, { useState, useEffect } from "react";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import SearchArea from "../orgnism/SearchArea";
import { CATEGORIES, CATEGORIES_NUM } from "../../consts/Categories";
import { Book } from "../../types/Book";
import { suggestBook } from "../../functions/suggestBoook";
import { getBooks } from "../../functions/getBooks";
import { useAuthUserContext } from "../../providers/AuthUser";
import BookCard from "../orgnism/BookCard";

const RecommendBook = () => {
    const {user} = useAuthUserContext();
    const [keyword, setKeyword] = useState<string>('');
    const [isCheckedCategory, setIsCheckedCategory] = useState<boolean[]>([...Array(CATEGORIES_NUM)].map(()=>false));
    const [bookListByCategory, setBookListByCategory] = useState<{
        category: string;
        books: Book[];
    }[]>([]);

    const getSuggestBooks = async () => {
        if(!user) return;
        const res = await suggestBook(user.id, isCheckedCategory);
        setBookListByCategory(res);
    };
    useEffect(()=>{
        getSuggestBooks();
    },[isCheckedCategory]);
    return(
        <HStack w='100%' h='100%' alignItems='flex-start'>
            <SearchArea
                width="25%"
                keyword={keyword}
                setKeyword={setKeyword}
                onClick={()=>{}}
                showStateOption={false}
                setIsCheckedCategory={setIsCheckedCategory}
            />
            <Box width='75%' h='100%' overflowY='auto'>
                <VStack>
                    {bookListByCategory.map(value => {
                        return (
                            <VStack minW='100%' maxW='100%' p={2} align='left' bg='rgba(200,100,0,0.5)'>
                                <Text fontSize='x-large' fontWeight='bold'>
                                    {value.category==='other' ? 'その他' : CATEGORIES.categories[Number(value.category)]}
                                </Text>
                                {value.books.length===0
                                ? <Text fontSize='x-large'>本が登録されていません</Text> :
                                <HStack overflowX='auto' overflowY='hidden'>
                                    {value.books.map(book => {
                                        return (
                                            <>
                                                <BookCard userId={user?.id||-1} book={book}/>
                                            </>
                                        );
                                    })}
                                </HStack>
                                }
                            </VStack>
                        );
                    })}
                </VStack>
            </Box>
        </HStack>
    );
}

export const RecommendBookTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本を探す' />
            <Flex w='100%' h='90vh' alignItems='center' justify='center'>
                <Box alignItems='center' w='90%' maxW='90%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px'>
                    <RecommendBook/>
                </Box>
            </Flex>
        </VStack>
    );
};

export default RecommendBookTemplate;