import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';

const LeagueTable = ({ selectedLeague }) => {


  const [leagueData, setLeagueData] = useState();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const response = await fetch(`http://localhost:3000/${selectedLeague}`);
      const data = await response.json();


      // alınan veriyi state'e at
      setLeagueData(data);

    };

    fetchData();
  }, [selectedLeague])



  useEffect(() => {

    const processLeagueData = () => {

      if (!leagueData) {
        return;
      }

      const newTeamStatsMap = new Map();

      leagueData.matches.forEach(match => {

        updateTeamStats(newTeamStatsMap, match.team1, match.score.ft[0], match.score.ft[1]);
        updateTeamStats(newTeamStatsMap, match.team2, match.score.ft[1], match.score.ft[0]);
      });

      const teamsArray = Array.from(newTeamStatsMap.values());

      const sortedTableData = teamsArray.sort((a, b) => {
        if (a.points !== b.points) {
          return b.points - a.points;
        } else {
          return b.goalDifference - a.goalDifference;
        }
      });

      setTableData(sortedTableData);
    };

    const updateTeamStats = (map, teamName, goalsFor, goalsAgainst) => {
      if (!map.has(teamName)) {
        map.set(teamName, {
          teamName,
          playedGames: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          points: 0,
        });
      }


      const teamStats = map.get(teamName);
      teamStats.playedGames += 1;
      teamStats.goalsFor += parseInt(goalsFor, 10);
      teamStats.goalsAgainst += parseInt(goalsAgainst, 10);
      teamStats.goalDifference = teamStats.goalsFor - teamStats.goalsAgainst;

      if (goalsFor > goalsAgainst) {
        teamStats.wins += 1;
        teamStats.points += 3;
      } else if (goalsFor < goalsAgainst) {
        teamStats.losses += 1;
      } else {
        teamStats.draws += 1;
        teamStats.points += 1;
      }

      map.set(teamName, teamStats);
    };

    processLeagueData();
    
  }, [leagueData, selectedLeague])





  return (
    <div>
      <Table bordered style={{ borderRadius: "30px" }}>
        <thead style={{ backgroundColor: "RGB(255, 222, 89)" }} className='table'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Pl</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>F</th>
            <th>A</th>
            <th>GD</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {/* sıralı verileri tablo içine render et */}
          {tableData.map((team, index) => (
            <tr style={{ borderRadius: "30px" }} className='table-light rounded' key={index}>
              <td>{index + 1}</td>
              <td>{team.teamName}</td>
              <td>{team.playedGames}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>{team.goalsFor}</td>
              <td>{team.goalsAgainst}</td>
              <td>{team.goalDifference}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LeagueTable;