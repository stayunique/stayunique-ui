import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import ReactSelect from "react-select";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { getSelectTheme } from "../../utils/theme";

const Container = styled.div`
    margin: 10px 0;
`;

type OptionsType = {
    value: string;
    label: string;
};

export type SelectType = {
    /**
     * The class name to apply to the component
     */
    className?: string;
    /**
     * label
     */
    label?: string;
    /**
     * is select clearable
     */
    isClearable?: boolean;
    /**
     * On change function
     */
    onChange: (value: any) => void;
    /**
     * The value
     */
    value: string | undefined;
    /**
     * array of options
     */
    options: OptionsType[];
};

const getValue = (value: any, options: any) => {
    if (value) {
        const option = options.find((o: any) => o.value === value);

        if (option) {
            return { value, label: option.label };
        }
    }
};

/** A select component */
function Select({ className, onChange, options, value, label, isClearable }: SelectType) {
    const theme = useTheme();
    const selectTheme = getSelectTheme(theme);

    const currentValue = getValue(value, options);

    return (
        <Container className={className}>
            {label && <InputLabel shrink={true}>{label}</InputLabel>}

            <ReactSelect
                value={currentValue}
                onChange={value => onChange(value ? value.value : null)}
                options={options}
                theme={(theme: any) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...selectTheme
                    }
                })}
                isClearable={isClearable}
            />
        </Container>
    );
}

export default Select;
