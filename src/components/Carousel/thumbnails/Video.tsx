import React from "react";
import styled from "styled-components";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const Video = styled.div`
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid;
`;

const Icon = styled(VideoLibraryIcon)`
    font-size: ${(props: any) => props.height}px !important;
`;

export type VideoThumbnailType = {
    className?: string;
    alt: string;
    onClick: () => void;
    height: number;
};

const VideoThumbnail = ({ className, alt, onClick, height }: VideoThumbnailType) => {
    return (
        <Video className={className} onClick={onClick} title={alt}>
            <Icon height={height} color="inherit" />
        </Video>
    );
};

export default VideoThumbnail;
