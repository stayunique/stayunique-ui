import React from "react";
import MUITextField from "@material-ui/core/TextField";

export type TextFieldType = {
    className?: string;
    label?: string;
    placeholder?: string;
    value?: string | undefined;
    onChange: (value: any) => void;
    fullWidth?: boolean;
};

function TextField({ className, label, placeholder, value, onChange, fullWidth }: TextFieldType) {
    const change = (event: any) => onChange(event.target.value);

    return <MUITextField className={className} label={label} placeholder={placeholder} value={value} onChange={change} fullWidth={fullWidth} />;
}

export default TextField;