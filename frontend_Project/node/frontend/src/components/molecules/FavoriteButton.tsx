import { Button, HStack, Text, Tooltip } from "@chakra-ui/react";
import { Star, StarBorderOutlined } from "@mui/icons-material";
import React from "react";

type FavoriteButtonProps = {
    isClicked: Boolean;
    setIsClicked;
    color?: string;
    showLabel?: boolean;
};

export const FavoriteButton = ({
    isClicked,
    setIsClicked,
    color='blue',
    showLabel=false,
}: FavoriteButtonProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsClicked(!isClicked);
    }
    const label = 'お気に入り-'+(isClicked? '解除': '登録');
    return (
        <Button w='100%' p={1} color={color} variant='ghost' onClick={(e) => {handleClick(e)}}>
            {
                showLabel?
                    <HStack>
                        {isClicked? <Star/>: <StarBorderOutlined/>}
                        <Text color="black">{label}</Text>
                    </HStack>
                :
                    <Tooltip label={label}>
                        {isClicked? <Star/>: <StarBorderOutlined/>}
                    </Tooltip>
            }
        </Button>
    );
};

export default FavoriteButton;