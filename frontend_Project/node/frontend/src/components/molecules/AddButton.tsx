import { Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import React from "react";

type AddButtonProps = {
    showLabel?: boolean;
    handleAdd: ()=>void;
};

export const AddButton = ({
    showLabel=false,
    handleAdd,
}: AddButtonProps) => {
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleAdd();
    };
    return (
        <Button w='100%' p={1} color='red' variant='ghost' onClick={onClick}>
            {
                showLabel?
                    <HStack>
                        <Add/>
                        <Text color="black">登録</Text>
                    </HStack>
                :
                    <Tooltip label='登録'>
                        <Add/>
                    </Tooltip>
            }
        </Button>
    );
};

export default AddButton;