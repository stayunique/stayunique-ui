import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MUICheckbox from "@material-ui/core/Checkbox";

export type CheckboxType = {
    className?: string;
    label?: string;
    checked: boolean;
    onChange: () => void;
};

function Checkbox({ className, label, checked, onChange }: CheckboxType) {
    return <FormControlLabel className={className} control={<MUICheckbox checked={checked} onChange={onChange} />} label={label} />;
}

export default Checkbox;
