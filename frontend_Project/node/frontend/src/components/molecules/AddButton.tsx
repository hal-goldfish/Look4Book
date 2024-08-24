import { Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import { Add, Check } from "@mui/icons-material";
import React, { ReactNode } from "react";

type AddButtonProps = {
    showLabel?: boolean;
    isRegistered: boolean;
    handleAdd: ()=>void;
};

export const AddButton = ({
    showLabel=false,
    isRegistered,
    handleAdd,
}: AddButtonProps) => {
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        handleAdd();
    };
    const label: string = isRegistered ? '登録済み' : '登録';
    const icon: ReactNode = isRegistered ? <Check/> : <Add/>;
    const color: string = isRegistered ? 'green' : 'red';
    return (
        <Button w='100%' p={1} colorScheme={color} variant='ghost' onClick={onClick} isDisabled={isRegistered}>
            {
                showLabel?
                    <HStack>
                        {icon}
                        <Text color="black">{label}</Text>
                    </HStack>
                :
                    <Tooltip label={label}>
                        {icon}
                    </Tooltip>
            }
        </Button>
    );
};

export default AddButton;