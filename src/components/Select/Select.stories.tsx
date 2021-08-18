import React from "react";
import { Story, Meta } from "@storybook/react";
import Select, { SelectType } from "./Select";
import { useArgs } from "@storybook/client-api";

export default {
    component: Select,
    title: "Select",
    args: {
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" }
        ],
        value: "3",
        label: "Label",
        placeholder: "Placeholder",
        clearable: true
    }
} as Meta;

export const Simple: Story<SelectType> = args => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (val: string) => updateArgs({ value: val });

    return <Select {...args} onChange={onChange} value={value} />;
};
