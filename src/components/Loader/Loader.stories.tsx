import React from "react";
import { Story, Meta } from "@storybook/react";
import Loader from "./Loader";

export default {
    component: Loader,
    title: "Loader"
} as Meta;

export const Widget: Story = args => {
    return <Loader {...args} />;
};
