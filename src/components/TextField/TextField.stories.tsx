import React from "react";
import { Story, Meta } from "@storybook/react";
import TextField, { TextFieldType } from "./TextField";
import { useArgs } from "@storybook/client-api";

export default {
    component: TextField,
    title: "Inputs/TextField",
    args: {
        value: "text",
        label: "Label",
        placeholder: "Placeholder"
    }
} as Meta;

export const Default: Story<TextFieldType> = args => {
    const [_, updateArgs] = useArgs();

    const onChange = (val: string) => updateArgs({ value: val });

    return <TextField {...args} onChange={onChange} />;
};
