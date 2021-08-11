import React from "react";

export type VideoType = {
    video: string;
    width: number;
    height: number;
};

const Video = ({ video, width, height }: VideoType) => {
    return (
        <video controls height={height} width={width} muted autoPlay>
            <source src={video} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
        </video>
    );
};

export default Video;
