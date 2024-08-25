import { Button, Divider, Flex, HStack, Input, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Search } from "@mui/icons-material";
import React from "react";
import { CATEGORIES } from "../../consts/Categories";
import SearchCheckBox from "../molecules/SearchCheckBox";
import { STATES } from "../../consts/States";

type SearchAreaProps = {
    width?: string;
    keyword: string;
    setKeyword: any;
    onClick: ()=>void;
    showStateOption?: boolean;
    setIsOnlyFavorite?: any;
    setIsReadingState?: any;
    setIsCheckedCategory: any;
    isDisabled: boolean;
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
    isDisabled,
}: SearchAreaProps) => {
    const handleChangeIsReadingState = (e: any, stateNum: number) => {
        setIsReadingState((prev: boolean[]) => prev.map((value, idx) => {
            return idx === stateNum ? e.target.checked : value;
        }));
    };
    const handleChangeIsCheckedCategory = (e: any, categoryNum: number) => {
        setIsCheckedCategory((prev: boolean[]) => prev.map((value, idx) => {
            return idx === categoryNum ? e.target.checked : value;
        }));
    };
    return (
        <VStack h='100%' width={width} maxW={width} spacing='5%' p='8px' bg='rgba(50,50,200,0.2)' borderColor='black' borderWidth='3px'>
            <HStack h='10%' w='100%' spacing={5} align='center' p='8px'>
                <Input isDisabled={isDisabled} bgColor='white' placeholder='フリーワード' value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} />
                <Tooltip label='検索'>
                    <Button isDisabled={isDisabled} colorScheme="blue" onClick={onClick}>
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
                        <SearchCheckBox isDisabled={isDisabled} text='お気に入り' onChange={(e: any)=>{setIsOnlyFavorite(e.target.checked)}} />
                        {STATES.state.map((state, idx) => {
                            return (
                                <SearchCheckBox isDisabled={isDisabled} text={state} onChange={(e)=>{handleChangeIsReadingState(e, idx)}}/>
                            );
                        })}
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
                            <SearchCheckBox isDisabled={isDisabled} text={category} onChange={(e)=>{handleChangeIsCheckedCategory(e, idx)}}/>
                        );
                    })}
                </VStack>
            </VStack>
        </VStack>
    );
};

export default SearchArea;