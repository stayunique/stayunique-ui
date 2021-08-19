import React from "react";
import { Story, Meta } from "@storybook/react";
import TextField, { TextFieldType } from "./TextField";
import { useArgs } from "@storybook/client-api";

export default {
    component: TextField,
    title: "TextField",
    args: {
        value: "text",
        label: "Label",
        placeholder: "Placeholder"
    }
} as Meta;

export const Simple: Story<TextFieldType> = args => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (val: string) => updateArgs({ value: val });

    return <TextField {...args} onChange={onChange} value={value} />;
};
