import { Box, Input, Text,  } from "@chakra-ui/react";
import React from "react";

export default function CustomInput({ placeholder, type, label, ...rest }) {
	return (
		<Box pt="25px" w="full">
			<Box display="flex" gap="4px">
				<Text pb="2">{label}</Text>
				<Text color="red">*</Text> 
			</Box>
			<Input
				type={type}
				variant="outline"
				borderColor="#6CA6D0"
				_placeholder={{
					color: "#6CA6D0",
				}}
				color="gray"
				placeholder={placeholder}
				style={{ outline: "none", boxShadow: "none" }}
				h="50px"
				w="full"
				{...rest}
			/>
		</Box>
	);
}
