import React from "react";
import styled from "styled-components";

export type ImageThumbnailType = {
    item: string;
    alt: string;
    width: number;
    height: number;
    selected: boolean;
    onClick: () => void;
};

const Image = styled.img<{ selected: boolean }>`
    border-radius: 4px;
    opacity: ${(props: any) => (props.selected ? 1 : 0.2)};
    cursor: pointer;
`;

const ImageThumbnail = ({ item, alt, width, height, selected, onClick }: ImageThumbnailType) => {
    return <Image selected={selected} src={item} alt={alt} width={width} height={height} onClick={onClick} title={alt} />;
};

export default ImageThumbnail;
