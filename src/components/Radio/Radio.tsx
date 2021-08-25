import React from "react";
import MUIRadio from "@material-ui/core/Radio";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

type OptionType = {
    value: string;
    label: string;
};

export interface RadioType extends RadioGroupProps {
    /**
     * The class name to apply to the component
     */
    className?: string;
    /**
     * Label of the radio
     */
    label?: string;
    /**
     * onChange function
     */
    onChange: (value: any) => void;
    /**
     * Options
     */
    options: OptionType[];
}

/** A radio component */
function Radio({ label, value, onChange, options, ...other }: RadioType) {
    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup value={value} onChange={change} {...other}>
                {options.map((option: OptionType) => (
                    <FormControlLabel key={option.value} value={option.value} control={<MUIRadio />} label={option.value} />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

export default Radio;
