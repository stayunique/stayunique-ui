import React from "react";
import styled from "styled-components";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

const Video = styled.div<{ selected: boolean; width: number; height: number }>`
    border-radius: 4px;
    opacity: ${(props: any) => (props.selected ? 1 : 0.2)};
    cursor: pointer;
    color: white;
    width: ${(props: any) => props.width}px;
    height: ${(props: any) => props.height}px;
    border: 1px solid white;
`;

const Icon = styled(VideoLibraryIcon)`
    font-size: 100px !important;
`;

export type VideoThumbnailType = {
    alt: string;
    width: number;
    height: number;
    selected: boolean;
    onClick: () => void;
};

const VideoThumbnail = ({ alt, width, height, selected, onClick }: VideoThumbnailType) => {
    return (
        <Video selected={selected} onClick={onClick} height={height} width={width} title={alt}>
            <Icon color="inherit" />
        </Video>
    );
};

export default VideoThumbnail;
