import React from "react";
import { MyBook } from "../../types/MyBook";
import { Box, Card, CardBody } from "@chakra-ui/react";
import { getBookImage } from "../../functions/getBookImage";

type MyBookCardPops = {
    book: MyBook;
    width?: string;
    height?: string;
};

export const MyBookCard = ({
    book,
    width='150px',
    height='200px',
}:MyBookCardPops) => {
    console.log(book);
    const image = getBookImage(book.bookId);
    return (
        <Box width={width} height={height} bg='red'>
            <Card w='100%' h='100%' p={5}>
                <CardBody>

                </CardBody>
            </Card>
        </Box>
    );
};

export default MyBookCard;