import { Checkbox, Text } from "@chakra-ui/react";
import React from "react";

type SearchCheckBoxProps = {
    text: string;
    onChange: (e:React.ChangeEvent)=>void;
    isDisabled: boolean;
}

export const SearchCheckBox = ({
    text,
    onChange,
    isDisabled,
}: SearchCheckBoxProps) => {
    return (
        <Checkbox isDisabled={isDisabled} colorScheme='green' borderColor='green' onChange={onChange}>
            <Text>{text}</Text>
        </Checkbox>
    );
};

export default SearchCheckBox;