import { Button, HStack, Text } from "@chakra-ui/react";
import { Delete } from "@mui/icons-material";
import React from "react";

type DeleteButtonProps = {
    handleDelete: ()=>void;
};

export const DeleteButton = ({
    handleDelete,
}: DeleteButtonProps) => {
    return (
        <Button w='100%' p={1} color='red' variant='ghost' onClick={handleDelete}>
            <HStack>
                <Delete/>
                <Text color="black">削除</Text>
            </HStack>
        </Button>
    );
};

export default DeleteButton;