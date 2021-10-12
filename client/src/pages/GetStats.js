import * as React from 'react';
import { useState, useEffect } from 'react';

import { CenteredColContainer } from '../components/styles/SSOT.style';
import { Table, TableHeader, TableRow, TableData } from '../components/styles/Stats.style';

import { gql } from '../utils/gql';

const GetStats = () => {
    const [openGate, setOpenGate] = useState(true);
    const [allStats, setAllStats] = useState([]);

    useEffect(() => {
        (async () => {
            if (openGate) {
                setOpenGate(false);

                try {
                    const r = await gql(`{getStats {
                        id,
                        won,
                        selectionlost,
                        timeoverlost,
                        correctanswers,
                        totalscore,
                        answerspeed,
                        gametimelength,
                        mouseoverevents,
                        datetimeplayed
                    }}`);
                    setAllStats(r.getStats);
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, [openGate]);

    return (
        <CenteredColContainer>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Correct</TableHeader>
                        <TableHeader>Total Score</TableHeader>
                        <TableHeader>Answer Speed</TableHeader>
                        <TableHeader>Game Seconds</TableHeader>
                        {/* <TableHeader>Mouse Overs</TableHeader> */}
                        <TableHeader>Time</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {allStats?.map(stat => (
                        <TableRow key={stat.id}>
                            <TableData>{stat.won && <span>Won</span>}
                                {stat.selectionlost && <span>Selection Loss</span>}
                                {stat.timeoverlost && <span>Time Out Loss</span>}</TableData>
                            <TableData><span>{stat.correctanswers}</span></TableData>
                            <TableData><span>{stat.totalscore}</span></TableData>
                            <TableData><span>{stat.answerspeed}</span></TableData>
                            <TableData><span>{stat.gametimelength}</span></TableData>
                            {/* <TableData><span>{stat.mouseoverevents}</span></TableData> */}
                            <TableData><span>{stat.datetimeplayed}</span></TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </CenteredColContainer>
    )
}

export default GetStats;