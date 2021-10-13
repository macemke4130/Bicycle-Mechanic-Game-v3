import styled from 'styled-components';
import { font } from "./SSOT.style";

export const Table = styled.table`
    border-collapse: collapse;
    font-family: ${font};
`;

export const TableHeader = styled.th`
    padding-left: 1em;
    padding-right: 1em;
`;

export const TableRow = styled.tr`
    background-color: white;

    &:nth-of-type(even) {
        background-color: #f2f2f2;
    }

    &:hover{
        background-color: lightblue;
    }
`;

export const TableData = styled.td`
    text-align: center;
    padding: 0.5em;
    border-right: 1px solid black;
    border-left: 1px solid black;
`;