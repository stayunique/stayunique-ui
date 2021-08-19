import React from "react";
import Typography from "@material-ui/core/Typography";
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
    className?: string;
    label?: string;
    placeholder?: string;
    options: OptionsType[];
    clearable?: boolean;
    value?: string | undefined;
    onChange: (value: any) => void;
};

const getValue = (value: any, options: OptionsType[]) => {
    if (value) {
        const option = options.find((o: any) => o.value === value);

        if (option) {
            return { value, label: option.label };
        }
    }
};

function Select({ className, label, placeholder, options, clearable, value, onChange }: SelectType) {
    const theme = useTheme();
    const selectTheme = getSelectTheme(theme);

    const currentValue = getValue(value, options);

    return (
        <Container className={className}>
            {label && (
                <Typography variant="caption" display="block">
                    {label}
                </Typography>
            )}
            <ReactSelect
                isClearable={clearable}
                placeholder={placeholder}
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
            />
        </Container>
    );
}

export default Select;
