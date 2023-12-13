import React, { useState, useEffect } from 'react';
import { ListGroup, ListGroupItem, Toast, ToastBody, ToastHeader } from 'reactstrap';

export default function AsisstsTable({ playerUpdateSwitch, selectedLeague }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(`http://localhost:3000/${selectedLeague}`);
      const data = await response.json();

      if (data && data.players) {
        const allPlayers = data.players;
        const sortedPlayers = allPlayers.sort((a, b) => b.assists - a.assists);
        const top10Players = sortedPlayers.slice(0, 10);
        setPlayers(top10Players);

      }
    };

    //calling the func
    fetchData();
  }, [selectedLeague]);


  if (playerUpdateSwitch === true) {
    const fetchData = async () => {

      const response = await fetch(`http://localhost:3000/${selectedLeague}`);
      const data = await response.json();

      if (data && data.players) {
        const allPlayers = data.players;
        const sortedPlayers = allPlayers.sort((a, b) => b.assists - a.assists);
        const top10Players = sortedPlayers.slice(0, 10);
        setPlayers(top10Players);
      }
    };
    fetchData();
  }





  return (
    <div className="toastStyle container p-3 bg-success my-2 rounded">
      <Toast style={{ width: "100%" }}>
        <ToastHeader tag="h5">Top Assists</ToastHeader>
        <ToastBody>
          <ListGroup>
            {players.map((player, index) => (
              <ListGroupItem key={index}>
                <span className='fw-bold float-start'>{index + 1}</span> <span>{player.playerName}</span> <span className='float-end'> {player.assists}  Assists</span>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ToastBody>
      </Toast>
    </div>
  );
}
