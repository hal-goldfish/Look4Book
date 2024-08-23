import React, { useState } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import SearchArea from "../orgnism/SearchArea";
import { CATEGORIES_NUM } from "../../consts/Categories";
import SearchArea from "../orgnism/SearchArea";
import { CATEGORIES_NUM } from "../../consts/Categories";

const RecommendBook = () => {
    const [keyword, setKeyword] = useState<String>('');
    const [isCheckedCategory, setIsCheckedCategory] = useState<boolean[]>([...Array(CATEGORIES_NUM)].map(()=>false));
    const [keyword, setKeyword] = useState<String>('');
    const [isCheckedCategory, setIsCheckedCategory] = useState<boolean[]>([...Array(CATEGORIES_NUM)].map(()=>false));
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
        </HStack>
        <HStack w='100%' h='100%' alignItems='flex-start'>
        <SearchArea
            width="25%"
            keyword={keyword}
            setKeyword={setKeyword}
            onClick={()=>{}}
            showStateOption={false}
            setIsCheckedCategory={setIsCheckedCategory}
        />
        </HStack>
    );
}

export const RecommendBookTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本を追加' />
            <Flex w='100%' h='90vh' alignItems='center'>
                <VStack alignItems='center' w='100%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px' m='5%'>
                    <Box w='100%' h='100%' overflow='auto'>
                        <RecommendBook/>
                    </Box>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default RecommendBookTemplate;