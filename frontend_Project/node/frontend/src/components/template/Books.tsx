import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Book } from "../../types/Book";
import { getBooks } from "../../functions/getBooks";
import { Table, Td, Thead, Tr } from "@chakra-ui/react";

export const Books = () => {
    const {user} = useAuthUserContext();
    const [bookList, setBookList] = useState<Book[]>([]);

    const getBooksByUserId = async () => {
        if(!user) return ;
        const res = await getBooks(user.id);
        setBookList(res);
    };
    useEffect(() => {
        getBooksByUserId();
    },[]);
    return (
        <Table>
            <Thead>
                <Td>タイトル</Td>
                <Td>ISBN</Td>
                <Td>筆者</Td>
                <Td>出版社</Td>
            </Thead>
            {bookList.map(book =>
                <Tr>
                    <Td>{book.title}</Td>
                    <Td>{book.isbn}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publisher}</Td>
                </Tr>
            )}
        </Table>
    );
}

export default Books;