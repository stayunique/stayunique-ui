import React from "react";
import Typography from "@material-ui/core/Typography";
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
    className?: string;
    label?: string;
    placeholder?: string;
    clearable?: boolean;
    onChange: (value: any) => void;
    fetchResults: (value: any) => void;
    defaultValue?: OptionsType;
};

function AsyncSelect({ className, label, placeholder, clearable, onChange, fetchResults, defaultValue }: AsyncSelectType) {
    const theme = useTheme();
    const selectTheme = getSelectTheme(theme);

    return (
        <Container className={className}>
            {label && (
                <Typography variant="caption" display="block">
                    {label}
                </Typography>
            )}
            <ReactSelectAsync
                isClearable={clearable}
                cacheOptions
                placeholder={placeholder}
                loadOptions={fetchResults}
                defaultValue={defaultValue}
                onChange={value => onChange(value ? value.value : null)}
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

export default AsyncSelect;
