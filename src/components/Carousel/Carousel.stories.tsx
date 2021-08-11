import React from "react";
import { Story, Meta } from "@storybook/react";
import Carousel, { CarouselType } from "./Carousel";
import { useArgs } from "@storybook/client-api";

export default {
    component: Carousel,
    title: "Carousel",
    args: {
        open: true,
        items: [
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_f68b29345d_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_7defa2817a_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_a12975cec8_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/14e11a5b7awiki_210427.mp4"
        ]
    }
} as Meta;

export const Widget: Story<CarouselType> = args => {
    const [{ open }, updateArgs] = useArgs();

    const close = () => updateArgs({ open: false });

    return <Carousel {...args} onClose={close} open={open} />;
};
