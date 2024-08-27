import React, { useState, useEffect } from "react";
import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import { InputISBN } from '../molecules/InputISBN';
import { ISBNListArea } from './../molecules/ISBNListArea';
import { Book } from "../../types/Book";
import { useAuthUserContext } from "../../providers/AuthUser";
import { getBookByISBN } from "../../functions/getBookByISBN"
import BookCard from "../orgnism/BookCard";

const AddBook = () => {
    const {user} = useAuthUserContext();
    const [ISBN, setISBN] = useState<string>('');
    const [preISBNList, setPreISBNList] = useState<string[]>([]);
    const [errorISBNList, setErrorISBNList] = useState<string[]>([]);
    const [successISBNList, setSuccessISBNList] = useState<string[]>([]);
    const [bookList, setBookList] = useState<Book[]>([]);

    const handleClick = () => {
        setPreISBNList((prev)=>{
            return [...prev,ISBN]
        });
        setISBN('');
    };
    const handleGetBook = async (ISBN: string) => {
        if(!user) return;
        const res = await getBookByISBN(user.id, ISBN);
        if(!!res){
            setBookList((prev)=>[...prev, res]);
            setPreISBNList(preISBNList.filter(value=>value!=ISBN));
            setSuccessISBNList((prev)=>[...prev, ISBN]);
        }else{
            setPreISBNList(preISBNList.filter(value=>value!=ISBN));
            setErrorISBNList((prev)=>[...prev, ISBN]);
        }
    };
    useEffect(()=>{
        if(preISBNList.length===0) return;
        const ISBN = preISBNList[0];
        handleGetBook(ISBN);
    },[preISBNList]);
    return(
        <VStack h='100%' p={2}>
            <HStack h='50%' w='100%'>
                <InputISBN ISBN={ISBN} setISBN={setISBN} handleClick={handleClick}/>
                <Spacer/>
                <ISBNListArea status='normal' label='未取得' ISBNList={preISBNList}/>
                <Spacer/>
                <ISBNListArea status='error' label='取得失敗' ISBNList={errorISBNList}/>
                <Spacer/>
                <ISBNListArea status='success' label='取得成功' ISBNList={successISBNList}/>
            </HStack>
            <HStack w='100%' h='50%' p={2} borderColor='black' borderWidth='2px' overflowX='auto'>
                {
                    bookList.map(book => {
                        return (
                            <BookCard userId={user?.id||-1} book={book} />
                        );
                    })
                }
            </HStack>
        </VStack>
    );
}

export const AddBookTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本の追加'/>
            <Flex w='100%' h='90vh' alignItems='center' justify='center'>
                <Box alignItems='center' w='90%' maxW='90%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px'>
                    <AddBook/>
                </Box>
            </Flex>
        </VStack>
    );
};

export default AddBookTemplate;