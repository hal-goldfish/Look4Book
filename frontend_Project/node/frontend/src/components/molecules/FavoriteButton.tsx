import { Button } from "@chakra-ui/react";
import { Star, StarBorderOutlined } from "@mui/icons-material";
import React from "react";

type FavoriteButtonProps = {
    isClicked: Boolean;
    setIsClicked;
    color?: string;
};

export const FavoriteButton = ({
    isClicked,
    setIsClicked,
    color='yellow'
}: FavoriteButtonProps) => {
    return (
        <Button w='100%' color={color} variant='link' onClick={()=>{setIsClicked(!isClicked)}}>
            {isClicked? <Star/>: <StarBorderOutlined/>}
        </Button>
    );
};

export default FavoriteButton;