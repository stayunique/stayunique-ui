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

function Loader() {
    return (
        <CircularProgressContainer>
            <CircularProgress />
        </CircularProgressContainer>
    );
}

export default Loader;
