import React from "react";

export type ImageType = {
    image: string;
    width: number;
    height: number;
};

const Image = ({ image, width, height }: ImageType) => {
    const alt = image.split("/").pop();

    return <img src={image} alt={alt} width={width} height={height} style={{ objectFit: "contain" }} />;
};

export default Image;
