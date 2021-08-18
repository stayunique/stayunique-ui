import React from "react";
import { Story, Meta } from "@storybook/react";
import Uploader, { UploaderType } from "./Uploader";
import { useArgs } from "@storybook/client-api";

export default {
    component: Uploader,
    title: "Uploader",
    args: {
        values: [
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_f68b29345d_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_7defa2817a_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/wiki_a12975cec8_210425.jpg",
            "https://sustorage.s3.eu-west-1.amazonaws.com/wiki/14e11a5b7awiki_210427.mp4",
            "https://sustorage.s3.eu-west-1.amazonaws.com/supplier_invoices/7142c3f122supplier_invoice_210810.pdf"
        ],
        destination: "test",
        uploadType: "test"
    }
} as Meta;

async function createSignedURL(file: any): Promise<any> {
    try {
        const res = await fetch(`${process.env.STORYBOOK_API_URL}/api/upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                destination: "test",
                upload_type: "test",
                filename: file.name,
                contentType: file.type
            })
        });

        const result = await res.json();

        if (res.status !== 200) {
            throw result;
        }

        return result;
    } catch (e) {
        throw e;
    }
}

export const Aws: Story<UploaderType> = args => {
    const [{ values }, updateArgs] = useArgs();

    const onChange = (val: string) => {
        updateArgs({ values: [...args.values, val] });
    };

    const onDelete = (index: number) => {
        let newValues = [...args.values];

        if (index !== -1) {
            newValues.splice(index, 1);
        }

        updateArgs({ values: newValues });
    };

    return <Uploader {...args} onChange={onChange} onDelete={onDelete} createSignedURL={createSignedURL} />;
};
