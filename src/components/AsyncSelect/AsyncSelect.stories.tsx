import React from "react";
import { Story, Meta } from "@storybook/react";
import AsyncSelect, { AsyncSelectType } from "./AsyncSelect";
import { useArgs } from "@storybook/client-api";

export default {
    component: AsyncSelect,
    title: "Inputs/AsyncSelect",
    args: {
        defaultValue: { value: 62201, label: "Josh Fradley - 20903" },
        label: "Label",
        placeholder: "Placeholder",
        isClearable: true,
        value: null
    }
} as Meta;

async function fetchResults(inputValue: string): Promise<any> {
    try {
        const res = await fetch(`${process.env.STORYBOOK_API_URL}/api/messages/search?search=${encodeURI(inputValue)}`, {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        const result = await res.json();

        if (res.status !== 200) {
            throw result;
        }

        return result.bookings.map((booking: any) => {
            return {
                value: booking.id,
                label: booking.customerName + " - " + booking.refId
            };
        });
    } catch (e) {
        throw e;
    }
}

export const Default: Story<AsyncSelectType> = args => {
    const [_, updateArgs] = useArgs();

    const onChange = (val: string) => updateArgs({ value: val });

    return <AsyncSelect {...args} onChange={onChange} fetchResults={fetchResults} />;
};
