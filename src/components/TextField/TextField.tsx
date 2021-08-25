import React from "react";
import MUITextField, { StandardTextFieldProps } from "@material-ui/core/TextField";

//we omit the variant here as Ts cannot handle the union correctly
export interface TextFieldType extends Omit<StandardTextFieldProps, "variant"> {
    /**
     * The class name to apply to the component
     */
    className?: string;
    /**
     * onChange function
     */
    onChange: (value: any) => void;
    /**
     * input of the variant
     */
    variant?: "standard" | "outlined" | "filled";
}

/** A textfield component  */
function TextField({ className, onChange, value, ...other }: TextFieldType) {
    const change = (event: any) => onChange(event.target.value);

    return <MUITextField className={className} onChange={change} value={value} {...other} />;
}

export default TextField;
