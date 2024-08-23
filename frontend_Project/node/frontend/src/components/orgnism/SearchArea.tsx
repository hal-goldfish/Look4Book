import { Box, Button, Checkbox, Divider, Flex, HStack, Input, Spacer, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Search } from "@mui/icons-material";
import React, { useState } from "react";
import { CATEGORIES } from "../../consts/Categories";
import SearchCheckBox from "../molecules/SearchCheckBox";

type SearchAreaProps = {
    width?: string;
    keyword: String;
    setKeyword;
    onClick: ()=>void;
    showStateOption?: boolean;
    setIsOnlyFavorite?;
    setIsReadingState?;
    setIsCheckedCategory;
};

export const SearchArea = ({
    width='100%',
    keyword,
    setKeyword,
    onClick,
    showStateOption=true,
    setIsOnlyFavorite,
    setIsReadingState,
    setIsCheckedCategory,
}: SearchAreaProps) => {
    const handleChangeIsReadingState = (e, stateNum: number) => {
        setIsReadingState((prev) => prev.map((value, idx) => {
            return idx === stateNum ? e.target.checked : value;
        }));
    };
    const handleChangeIsCheckedCategory = (e, categoryNum: number) => {
        setIsCheckedCategory((prev) => prev.map((value, idx) => {
            return idx === categoryNum ? e.target.checked : value;
        }));
    };
    return (
        <VStack h='100%' width={width} spacing='5%' p='8px' bg='rgba(50,50,200,0.2)' borderColor='brown' borderWidth='3px'>
            <HStack h='10%' w='100%' spacing={5} align='center' p='8px'>
                <Input bgColor='white' placeholder='フリーワード' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} />
                <Tooltip label='検索'>
                    <Button colorScheme="blue" onClick={onClick}>
                        <Search/>
                    </Button>
                </Tooltip>
            </HStack>
            {showStateOption ?
                <VStack maxH='40%' w='100%' p='8px' bgColor='white' borderRadius='8px'>
                    <Flex w='100%' justify='left'>
                        <Text fontWeight='bold' fontSize='larger'>絞り込み</Text>
                    </Flex>
                    <Divider borderColor='black' />
                    <VStack w='100%' alignItems='left' overflow='auto'>
                        <SearchCheckBox text='お気に入り' onChange={(e)=>{setIsOnlyFavorite(e.target.checked)}} />
                        <SearchCheckBox text='積読' onChange={(e)=>{handleChangeIsReadingState(e, 0)}}/>
                        <SearchCheckBox text='読書中' onChange={(e)=>{handleChangeIsReadingState(e, 1)}}/>
                        <SearchCheckBox text='読了' onChange={(e)=>{handleChangeIsReadingState(e, 2)}}/>
                    </VStack>
                </VStack>
            : null}
            <VStack maxH={showStateOption?'40%':'80%'} w='100%' p='8px' bgColor='white' borderRadius='8px'>
                <Flex w='100%' justify='left'>
                    <Text fontWeight='bold' fontSize='larger'>カテゴリ</Text>
                </Flex>
                <Divider borderColor='black' />
                <VStack w='100%' alignItems='left' overflow='auto'>
                    {CATEGORIES.categories.map((category, idx) => {
                        return (
                            <SearchCheckBox text={category} onChange={(e)=>{handleChangeIsCheckedCategory(e, idx)}}/>
                        );
                    })}
                </VStack>
            </VStack>
        </VStack>
    );
};

export default SearchArea;