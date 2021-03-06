import styled from "styled-components";

export const font = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";

export const CenteredColContainer = styled.div`
    display: flex;
    flex-direction: column;
    place-items: center;
`;

export const CenteredRowContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

export const HeadlineOne = styled.h1`
    font-family: ${font};
    font-size: 2em;
    margin: 0;
    padding: 0;
`;

export const Para = styled.p`
    font-family: ${font};
    font-size: 1em;
    margin: 0.25em;
    padding: 0.25em;
    width: 75%;
`;

export const CenterPara = styled.p`
    font-family: ${font};
    font-size: 1em;
    margin: 0.25em;
    padding: 0.25em;
    width: 75%;
    text-align: center;
`;

export const CreatedBy = styled.p`
    font-family: ${font};
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.25em;
    padding: 0.25em;
    width: 75%;
    text-align: center;
`;