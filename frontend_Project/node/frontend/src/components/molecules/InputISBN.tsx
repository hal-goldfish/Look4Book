import React, { useState, useEffect } from 'react';
import { HStack, Input, Text, VStack, Button, Tooltip, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Start } from '@mui/icons-material';

type InputISBNProps = {
    ISBN: string;
    setISBN: any;
    width?: string;
    handleClick: () => void;
}

export const InputISBN = ({
    ISBN,
    setISBN,
    width='30%',
    handleClick,
}: InputISBNProps) => {
    const [isInvalid, setIsInvalid] = useState<boolean>(false);
    const handleChange = (e: any) => {
        setISBN(e.target.value);
    };
    useEffect(()=>{
        const invalid = !( ISBN.length===10 || ISBN.length===13 );
        setIsInvalid(invalid);
    },[ISBN]);
    return (
        <VStack minW={width} maxW={width} p={2} justify='center' h='100%' bg='rgba(50,50,200,0.2)'>
            <Text fontSize='xxx-large' fontWeight='bold'>Register</Text>
            <FormControl isInvalid={isInvalid}>
                <HStack>
                    <Input variant='shost' type='number' value={ISBN} placeholder='ISBN' onChange={handleChange}/>
                    <Tooltip label='検索'>
                        <Button isDisabled={isInvalid} colorScheme='blue' onClick={handleClick}>
                            <Start/>
                        </Button>
                    </Tooltip>
                </HStack>
                <FormErrorMessage><Text px={2} color='black' bg='rgba(255,100,100,0.5)'>ISBNは10桁か13桁の数字です</Text></FormErrorMessage>
            </FormControl>
        </VStack>
    );
};

export default InputISBN;