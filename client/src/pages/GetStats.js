import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { CenteredColContainer } from '../components/styles/SSOT.style';
import { Table, TableHeader, TableRow, TableData } from '../components/styles/Stats.style';

import { gql } from '../utils/gql';

const GetStats = () => {
    const [openGate, setOpenGate] = useState(true);
    const [allStats, setAllStats] = useState([]);

    const history = useHistory();

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
                        mobile,
                        browser,
                        city,
                        region,
                        country,
                        datetimeplayed
                    }}`);
                    setAllStats(r.getStats);
                } catch (e) {
                    console.error(e);
                }
            }
        })();
    }, [openGate, history]);

    return (
        <CenteredColContainer>
            <Table>
                <thead>
                    <TableRow>
                        <TableHeader>Type</TableHeader>
                        <TableHeader>Correct</TableHeader>
                        <TableHeader>Total<br></br>Score</TableHeader>
                        <TableHeader>Answer<br></br>Speed</TableHeader>
                        <TableHeader>Game<br></br>Seconds</TableHeader>
                        {/* <TableHeader>Mouse Overs</TableHeader> */}
                        <TableHeader>Mobile</TableHeader>
                        <TableHeader>Browser</TableHeader>
                        <TableHeader>City and<br></br>Region</TableHeader>
                        <TableHeader>Central<br></br>Time</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {allStats?.map(stat => (
                        <TableRow key={stat.id}>
                            <TableData>{stat.won && <span>Won</span>}
                                {stat.selectionlost && <span>Selection<br></br>Loss</span>}
                                {stat.timeoverlost && <span>Time Out<br></br>Loss</span>}</TableData>
                            <TableData><span>{stat.correctanswers}</span></TableData>
                            <TableData><span>{stat.totalscore.toLocaleString()}</span></TableData>
                            <TableData><span>{stat.answerspeed}</span></TableData>
                            <TableData><span>{stat.gametimelength}</span></TableData>
                            {/* <TableData><span>{stat.mouseoverevents}</span></TableData> */}
                            <TableData><span>{stat.mobile ? "True" : "False"}</span></TableData>
                            <TableData><span>{stat.browser}</span></TableData>
                            <TableData><span>{stat.city === "undefined" ? "" : stat.city},<br></br>{stat.region === "undefined" ? "" : stat.region}</span></TableData>
                            <TableData><span>{stat.datetimeplayed}</span></TableData>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </CenteredColContainer>
    )
}

export default GetStats;