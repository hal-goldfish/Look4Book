import { Text, Button, Box, HStack, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useAuthUserContext } from "../../providers/AuthUser";
import React from "react";
import { User } from "../../types/User";
import { AccountCircle, KeyboardArrowDownOutlined, Logout } from "@mui/icons-material";
import { useRouter } from "next/router";
import { TOP_PAGE } from "../../consts/PAGE";

type UserButtonProps = {
    user: User | null;
    variant?: string;
    onClick: ()=>void;
    curPage: string;
}

export const UserButton = ({
    user,
    variant='ghost',
    onClick,
    curPage,
}: UserButtonProps) => {
    const {signout} = useAuthUserContext();
    const router = useRouter();
    const cur = curPage==='プロフィール';
    const color = cur ? 'blue' : 'black';
    const logout = () => {
        signout(()=>{
            router.push(TOP_PAGE);
        });
    };
    return (
        <Box>
            <Menu>
                <MenuButton variant={variant} as={Button} rightIcon={<KeyboardArrowDownOutlined/>}>
                    <HStack color={color}>
                        <AccountCircle/>
                        {user ? <Text fontSize='x-large'>{user.name}</Text> : null}
                    </HStack>
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onClick} isDisabled={cur}><Text>プロフィール</Text></MenuItem>
                    <MenuItem onClick={logout}>
                        <HStack>
                            <Logout/>
                            <Text>ログアウト</Text>
                        </HStack>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default UserButton;