import React from 'react';
import { Box, Card, CardBody, CardHeader, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";

type SimpleCardProps = {
    label: string;
    value: string;
    size: 'large'|'normal';
};

export const SimpleCard = ({
    label,
    value,
    size,
}: SimpleCardProps) => {
    const width = size==='large' ? '300px' : '250px';
    const height = size==='large' ? '150px' : '125px';
    const labelFontSize = size==='large' ? 'larger' : 'large';
    const valueFontSize = size==='large' ? 'xxx-large' : 'xx-large';
    return (
        <Box minW={width} maxW={width} minH={height} maxH={height}>
            <Card w='100%' h='100%'>
                <CardHeader py={0}>
                    <Flex justify='left'>
                        <Text isTruncated fontSize={labelFontSize}>{label}</Text>
                    </Flex>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <Flex justify='right'>
                        <Text fontSize={valueFontSize} fontWeight='bold'>{value}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
    );
};

export default SimpleCard;