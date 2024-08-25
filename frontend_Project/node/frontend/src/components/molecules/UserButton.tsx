import { Text, Button, Box } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { User } from "../../types/User";
import { AccountCircle } from "@mui/icons-material";

type UserButtonProps = {
    user: User | null;
    variant?: string;
    onClick: ()=>void;
}

export const UserButton = ({
    user,
    variant='ghost',
    onClick,
}: UserButtonProps) => {
    return (
        <Box>
            <Button variant={variant} onClick={onClick}>
                <AccountCircle/>
                {user ? <Text fontSize='x-large'>{user.name}</Text> : null}
            </Button>
        </Box>
    );
};

export default UserButton;