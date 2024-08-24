import { Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const CurTime = () => {
    const [curTime, setCurTime] = useState<Date>(new Date());
    setInterval(()=>{setCurTime(new Date())}, 30*1000);
    return (
        <Text fontSize='18px' fontWeight="bold">
            {curTime.toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})}
        </Text>
    );
};

export default CurTime;