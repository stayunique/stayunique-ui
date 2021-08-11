import React from "react";
import styled from "styled-components";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const PDF = styled.div`
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid;
`;

const Icon = styled(PictureAsPdfIcon)`
    font-size: ${(props: any) => props.height}px !important;
`;

export type VideoThumbnailType = {
    className?: string;
    alt: string;
    onClick: () => void;
    height: number;
};

const PDFThumbnail = ({ className, alt, onClick, height }: VideoThumbnailType) => {
    return (
        <PDF className={className} onClick={onClick} title={alt}>
            <Icon height={height} color="inherit" />
        </PDF>
    );
};

export default PDFThumbnail;
