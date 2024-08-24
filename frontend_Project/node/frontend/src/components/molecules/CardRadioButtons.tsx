import { Box, HStack, RadioGroup } from "@chakra-ui/react";
import React from "react"
import RadioCard from "../atoms/RadioCard";

type CardRadioButtonsProps = {
	options: {
		name: String;
		id: Number;
	}[];
	setValue: any;
	defaultValue: Number;
}

export const CardRadioButtons = ({
	options,
	setValue,
	defaultValue,
}:CardRadioButtonsProps) => {
	return (
		<Box w='100%' h='100%'>
			<RadioGroup>
				<HStack spacing={1}>
					{options.map((value) => {
						return <RadioCard label={value.name} onClick={()=>{setValue(value.id)}} isSelected={value.id===defaultValue} />;
					})}
				</HStack>
			</RadioGroup>
		</Box>
	);
}

export default CardRadioButtons;