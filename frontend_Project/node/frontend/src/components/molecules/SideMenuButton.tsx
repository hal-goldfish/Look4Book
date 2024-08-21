import { ArrowLeftIcon, ArrowRightIcon, CopyIcon, MoonIcon, QuestionOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export type SideMenuButtonProps = {
    iconType: string;
    label: string;
    url: string;
}

export const SideMenuButton = ({
    iconType,
    label,
    url,
}: SideMenuButtonProps) => {
    const router = useRouter();
    const color: string = 'black';
    const bgcolor: string = 'lightblue';
    const icon = iconType==='top' ? <MoonIcon color={color}/>
                    : iconType==='signin' ? <ArrowRightIcon color={color}/>
                    : iconType==='signout' ? <ArrowLeftIcon color={color}/>
                    : iconType==='userprofile' ? <SettingsIcon color={color}/>
                    : iconType==='books' ? <CopyIcon color={color}/>
                    : <QuestionOutlineIcon color={color}/>
    const onClick = () => {
        router.push(url);
    }
    return (
        <Box>
            <Tooltip label={label}>
                <Button onClick={onClick} bg='transparent' colorScheme="whiteAlpha">
                    {icon}
                </Button>
            </Tooltip>
        </Box>
    );
}