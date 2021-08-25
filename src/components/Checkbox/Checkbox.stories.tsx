import React from "react";
import { Story, Meta } from "@storybook/react";
import Checkbox, { CheckboxType } from "./Checkbox";
import { useArgs } from "@storybook/client-api";

export default {
    component: Checkbox,
    title: "Inputs/Checkbox",
    args: {
        checked: true,
        label: "label"
    }
} as Meta;

export const Default: Story<CheckboxType> = args => {
    const [{ checked }, updateArgs] = useArgs();

    const onChange = (checked: boolean) => updateArgs({ checked });

    return <Checkbox {...args} onChange={onChange} checked={checked} />;
};
