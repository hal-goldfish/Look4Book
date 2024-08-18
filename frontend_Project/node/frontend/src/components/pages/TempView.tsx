import React from "react";
type tempviewProps = {
    text: string;
}

export const TempView = ({
    text,
}:tempviewProps) => {
    return (
        <p>{text}</p>
    );
};

export default TempView;