import React from "react";
import { Story, Meta } from "@storybook/react";
import Radio, { RadioType } from "./Radio";
import { useArgs } from "@storybook/client-api";

export default {
    component: Radio,
    title: "Inputs/Radio",
    args: {
        label: "label",
        options: [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" }
        ],
        value: "2"
    }
} as Meta;

export const Default: Story<RadioType> = args => {
    const [{ value }, updateArgs] = useArgs();

    const onChange = (newValue: string) => updateArgs({ value: newValue });

    return <Radio {...args} onChange={onChange} value={value} />;
};
