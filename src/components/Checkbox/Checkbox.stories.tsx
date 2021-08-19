import React from "react";
import { Story, Meta } from "@storybook/react";
import Checkbox, { CheckboxType } from "./Checkbox";
import { useArgs } from "@storybook/client-api";

export default {
    component: Checkbox,
    title: "Checkbox",
    args: {
        checked: true,
        label: "label"
    }
} as Meta;

export const Widget: Story<CheckboxType> = args => {
    const [{ checked }, updateArgs] = useArgs();

    const onChange = () => updateArgs({ checked: !checked });

    return <Checkbox {...args} onChange={onChange} checked={checked} />;
};
