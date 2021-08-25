import React from "react";
import { Story, Meta } from "@storybook/react";
import Loader, { LoaderType } from "./Loader";

export default {
    component: Loader,
    title: "Components/Loader"
} as Meta;

export const Default: Story<LoaderType> = args => {
    return <Loader {...args} />;
};
