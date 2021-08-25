import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import ReactSelectAsync from "react-select/async";
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

export type AsyncSelectType = {
    /**
     * The class name to apply to the component
     */
    className?: string;
    /**
     * On change function
     */
    onChange: (value: any) => void;
    /**
     * A function to fetch the results
     */
    fetchResults: (value: any) => void;
    /**
     * Default value of the select
     */
    defaultValue?: OptionsType;
    /**
     * label
     */
    label?: string;
    /**
     * is select clearable
     */
    isClearable?: boolean;
    /**
     * placeholder
     */
    placeholder?: string;
};

/** Async select to fetch remote results */
function AsyncSelect({ className, label, placeholder, onChange, fetchResults, isClearable, defaultValue }: AsyncSelectType) {
    const theme = useTheme();
    const selectTheme = getSelectTheme(theme);

    const [value, setValue] = useState<OptionsType | undefined>(defaultValue);

    const change = (value: any) => {
        setValue(value);
        onChange(value.value ? value.value : null);
    };

    return (
        <Container className={className}>
            {label && <InputLabel shrink={true}>{label}</InputLabel>}
            <ReactSelectAsync
                cacheOptions
                placeholder={placeholder}
                loadOptions={fetchResults}
                onChange={change}
                value={value}
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

export default AsyncSelect;
