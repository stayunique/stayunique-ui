import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

const CircularProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

export type LoaderType = {
    /**
     * The color of the loader
     */
    color?: "primary" | "secondary";
};

/** This is a loader component to be used to show when a load is happening e.g. api call */
function Loader({ color }: LoaderType) {
    return (
        <CircularProgressContainer>
            <CircularProgress color={color} />
        </CircularProgressContainer>
    );
}

export default Loader;
