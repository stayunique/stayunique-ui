import React from "react";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import MUICheckbox from "@mui/material/Checkbox";

export interface CheckboxType extends Omit<FormControlLabelProps, "control" | "onChange"> {
    /**
     * On change function
     */
    onChange: (checked: boolean) => void;
}

/** A checkbox component */
function Checkbox({ className, onChange, ...other }: CheckboxType) {
    const change = (event: any) => {
        onChange(event.target.checked);
    };

    return <FormControlLabel className={className} onChange={change} control={<MUICheckbox />} {...other} />;
}

export default Checkbox;
