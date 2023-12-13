import React, { useEffect, useState } from 'react';
import MatchList from './MatchList';
import { FormGroup, Input, Toast, ToastBody, ToastHeader } from 'reactstrap';

export default function Fixtures({ selectedLeague }) {
    const [matches, setMatches] = useState([]);
    const [selectedRound, setSelectedRound] = useState("Matchday 1");
    const [data, setData] = useState();
    const [accordionState, setAccordionState] = useState(0);
    const [playersArray, setPlayersArray] = useState(0);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/${selectedLeague}`);
                const fetchedData = await response.json();
                setData(fetchedData.matches);
                setPlayersArray(fetchData.players)
                setMatches(fetchedData.matches.filter(match => match.round === selectedRound));
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        const getPlayersData = async () => {
            fetch(`http://localhost:3000/${selectedLeague}`)
                .then(response => response.json())
                .then(data => {
                    setPlayersArray(data.players);
                })

        }
        fetchData();
        getPlayersData();
    }, [selectedRound, selectedLeague]);

    const rounds = data ? Array.from(new Set(data.map(match => match.round))) : null

    return (
        <div className="toastStyle container p-3 my-2 rounded text-center" style={{ backgroundColor: "RGB(255, 222, 89)" }}>
            <Toast style={{ width: "100%" }} className="container my-1 rounded text-center" >
                <ToastHeader className='mt-2' tag="h5">Fixtures</ToastHeader>

                <FormGroup>
                    <ToastHeader className='mb-1'>Select Matchday: </ToastHeader>
                    <Input type='select' onChange={(e) => setSelectedRound(e.target.value)}>
                        {rounds && rounds.map((round, index) => (
                            <option key={index} value={round}>{round}</option>
                        ))}
                    </Input>
                </FormGroup>
                <ToastBody>
                    <MatchList selectedRound={selectedRound} playersArray={playersArray} _data={data} _setData={setData} setMatches={setMatches} selectedLeague={selectedLeague} roundMatches={matches} accordionState={accordionState} setAccordionState={setAccordionState} />
                </ToastBody>
            </Toast>
        </div>
    );
}