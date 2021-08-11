import React from "react";
import { Story, Meta } from "@storybook/react";
import { FileRow, FileRowType } from "./Carousel";
import { useArgs } from "@storybook/client-api";

export default {
    component: FileRow,
    title: "FileRow",
    args: {
        height: 100,
        width: 100,
        selectedItem: 0,
        color: "black",
        items: [
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_f68b29345d_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_7defa2817a_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_a12975cec8_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/14e11a5b7awiki_210427.mp4",
            "https://sustorage.s3.eu-west-1.amazonaws.com/supplier_invoices/7142c3f122supplier_invoice_210810.pdf"
        ],
        align: "flex-start",
        embedded: true
    }
} as Meta;

export const Widget: Story<FileRowType> = args => {
    const [{ selectedItem }, updateArgs] = useArgs();

    const onClick = (index: number) => updateArgs({ selectedItem: index });

    return <FileRow {...args} onClick={(index: any) => onClick(index)} selectedItem={selectedItem} />;
};
