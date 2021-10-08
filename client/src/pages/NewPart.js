import * as React from 'react';
import { useState, useEffect } from 'react';

import { CenteredColContainer } from '../components/styles/SSOT.style';

import { gql } from '../utils/gql';

const NewPart = () => {
    const [win, setWin] = useState("");
    const [lose1, setLose1] = useState("");
    const [lose2, setLose2] = useState("");
    const [lose3, setLose3] = useState("");
    const [photo1, setPhoto1] = useState("");
    const [photo2, setPhoto2] = useState("");
    const [newPartId, setNewPartId] = useState(null);
    const [newPhoto1Id, setNewPhoto1Id] = useState(null);
    const [newPhoto2Id, setNewPhoto2Id] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const handleWin = (e) => {
        setWin(e.target.value);
    }
    const handleLose1 = (e) => {
        setLose1(e.target.value);
    }
    const handleLose2 = (e) => {
        setLose2(e.target.value);
    }
    const handleLose3 = (e) => {
        setLose3(e.target.value);
    }
    const handlePhoto1 = (e) => {
        setPhoto1(e.target.value);
    }
    const handlePhoto2 = (e) => {
        setPhoto2(e.target.value);
    }

    const submitNewPart = async () => {
        const r = await gql(` mutation { 
            newPart(
                win: "${win}",
                lose1: "${lose1}",
                lose2: "${lose2}",
                lose3: "${lose3}"
                ) { insertId } } `);
        const newPartId = r.newPart.insertId;
        setNewPartId(newPartId);
        submitNewPhotos(newPartId);
    }

    const submitNewPhotos = async (newPartId) => {
        const r = await gql(` mutation { 
            newPhotos(
                part_id: ${newPartId},
                filename1: "${photo1}",
                filename2: "${photo2}"
                ) { photo1, photo2 } } `);

        setNewPhoto1Id(r.newPhotos.photo1);
        setNewPhoto2Id(r.newPhotos.photo2);
    }

    const handleRefresh = () => {
        // Clear inputs to insert another part --

        setWin("");
        setLose1("");
        setLose2("");
        setLose3("");
        setPhoto1("");
        setPhoto2("");
        setNewPartId("");
        setNewPhoto1Id("");
        setNewPhoto2Id("");
    }

    useEffect(() => {
        if ( newPartId && newPhoto1Id && newPhoto2Id ) {
            setFeedback("New Part Inserted");
        }
    }, [newPartId, newPhoto1Id, newPhoto2Id]);

    return (
        <CenteredColContainer>
            <div><label>Win: </label><input type="text" onChange={handleWin} value={win} /></div>
            <div><label>Lose 1: </label><input type="text" onChange={handleLose1} value={lose1} /></div>
            <div><label>Lose 2: </label><input type="text" onChange={handleLose2} value={lose2} /></div>
            <div><label>Lose 3: </label><input type="text" onChange={handleLose3} value={lose3} /></div>
            <div><label>Photo 1: </label><input type="text" onChange={handlePhoto1} value={photo1} /></div>
            <div><label>Photo 2: </label><input type="text" onChange={handlePhoto2} value={photo2} /></div>
            <button onClick={submitNewPart}>New Part</button>
            <p>New Part ID: {newPartId}</p>
            <p>New Photo ID 1: {newPhoto1Id}</p>
            <p>New Photo ID 2: {newPhoto2Id}</p>
            <p>{feedback}</p>
            {feedback && <button onClick={handleRefresh}>Add Another?</button>}
        </CenteredColContainer>
    )
}

export default NewPart;