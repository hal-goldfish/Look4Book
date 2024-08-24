import { Checkbox, Text } from "@chakra-ui/react";
import React from "react";

type SearchCheckBoxProps = {
    text: string;
    onChange: (e:React.ChangeEvent)=>void;
}

export const SearchCheckBox = ({
    text,
    onChange,
}: SearchCheckBoxProps) => {
    return (
        <Checkbox colorScheme='green' borderColor='green' onChange={onChange}>
            <Text>{text}</Text>
        </Checkbox>
    );
};

export default SearchCheckBox;