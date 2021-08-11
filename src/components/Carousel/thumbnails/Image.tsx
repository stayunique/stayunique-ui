import React from "react";
import styled from "styled-components";

export type ImageThumbnailType = {
    className?: string;
    item: string;
    alt: string;
    onClick: () => void;
};

const Image = styled.img`
    border-radius: 4px;
    cursor: pointer;
`;

const ImageThumbnail = ({ className, item, alt, onClick }: ImageThumbnailType) => {
    return <Image className={className} src={item} alt={alt} onClick={onClick} title={alt} />;
};

export default ImageThumbnail;
