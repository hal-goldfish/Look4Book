import React from "react";
import { Text, VStack } from '@chakra-ui/react';

type ISBNListAreaProps = {
    status: 'normal'|'error'|'success';
    ISBNList: string[];
    width?: string;
    label: string;
};

export const ISBNListArea = ({
    status,
    ISBNList,
    width='20%',
    label,
}: ISBNListAreaProps) => {
    const bgColor = status==='normal' ? 'rgba(255,255,255,0.5)'
                    : status==='error' ? 'rgba(255,100,100,0.5)'
                    : 'rgba(100,255,100,0.5)';
    return (
        <VStack minW={width} maxW={width} h='100%' p={2} align='left'>
            <Text fontWeight='bold' w='100%' bg='rgba(50,50,200,0.2)' p={1}>{label}</Text>
            <VStack w='100%' h='100%' align='left' p={2} bg={bgColor} borderColor='black' borderWidth='2px' overflow='auto'>
                {
                    ISBNList.map(ISBN => {
                        return (
                            <Text>{ISBN}</Text>
                        );
                    })
                }
            </VStack>
        </VStack>
    );
};

export default ISBNListArea;