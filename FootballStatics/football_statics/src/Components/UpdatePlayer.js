import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, ToastBody } from 'reactstrap';

export default function UpdatePlayer({ selectedLeague, setPlayerUpdateSwitch }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [editedPlayerName, setEditedPlayerName] = useState("");
  const [editedGoal, setEditedGoal] = useState("");
  const [editedAssist, setEditedAssist] = useState("");
  const [activePlayers, setActivePlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/${selectedLeague}`);
        const fetchedData = await response.json();
        setActivePlayers(fetchedData.players);
      } catch (error) {
        console.log('Fetch error:', error);
      }
    };
    fetchData();
  }, [selectedLeague]);


  const activePlayerNames = activePlayers.map((player) => player.playerName);


  const UpdatePlayerStatistics = () => {
    toggle();

    fetch(`http://localhost:3000/${selectedLeague}`)
      .then(response => response.json())
      .then(data => {
        // Access the players array
        const players = data.players;

        // Find and update the player data (for example, player with ID 3)
        const updatedPlayers = players && players.map(player => {
          if (player.playerName === editedPlayerName) {
            // Update goals and assists
            player.goals = editedGoal; // Update goals to the new value
            player.assists = editedAssist; // Update assists to the new value
          }
          return player;
        });

        // Use the updated data to make the PUT request
        fetch(`http://localhost:3000/${selectedLeague}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,

            ...data.selectedLeague,
            players: updatedPlayers,

          }),
        });

        setPlayerUpdateSwitch(true);

      })

      .catch(error => console.error("Error updating player data:", error));
      setEditedAssist();
      setEditedGoal();
      };

  return (
    <div>
      <Button className='rounded-pill py-4 fs-6 updateButton' onClick={toggle}>
        Edit Player 🛠️
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader style={{ backgroundColor: "rgb(254, 215, 61)", color: "rgb(31, 31, 31)" }} tag="h4" toggle={toggle}>
          Edit Player Statistics
        </ModalHeader>
        <ModalBody style={{ color: "rgb(254, 215, 61)", backgroundColor: "rgb(31, 31, 31)", fontWeight: "bold" }} >
          <ToastBody className='py-2'>
            <FormGroup className='py-2'>
              <Label for="playerName">Player Name</Label>
              <Input
                value={editedPlayerName}
                type="select"
                id="playerName"
                onChange={(e) => setEditedPlayerName(e.target.value)}
              >
                {activePlayerNames.map((playerName, index) => (
                  <option key={index} value={playerName}>
                    {playerName}
                  </option>
                ))}
              </Input>
              <Label for="goals">Goals</Label>
              <Input value={editedGoal} type="text" id="goals" onChange={(e) => setEditedGoal(e.target.value)} />
              <Label for="assists">Assists</Label>
              <Input
                value={editedAssist}
                type="text"
                id="assists"
                onChange={(e) => setEditedAssist(e.target.value)}
              />
            </FormGroup>

          </ToastBody>
        </ModalBody>
        <ModalFooter style={{ color: "rgb(254, 215, 61)", backgroundColor: "rgb(31, 31, 31)", fontWeight: "bold" }} className="d-flex justify-content-center align-items-center">
          <Button style={{ backgroundColor: "RGB(48, 104, 68)" }} onClick={UpdatePlayerStatistics}>
            Update Player
          </Button>
          <Button style={{ backgroundColor: "RGB(195, 1, 1)" }} onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
