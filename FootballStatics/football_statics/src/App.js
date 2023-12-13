import './App.css';
import { Col, Container, Navbar, Row } from 'reactstrap'
import Header from './Components/Header'
import LeagueTable from './Components/LeagueTable';
import Fixtures from './Components/Fixtures';
import GoalTable from './Components/GoalTable';
import AssistTable from './Components/AssistTable';
import UpdatePlayer from './Components/UpdatePlayer';
import { useState, useEffect } from 'react';

function App() {
  const [selectedLeague, setSelectedLeague]=useState("EPL");
  const [leagueHeader, setLeagueHeader]= useState("");
  const[playerUpdateSwitch, setPlayerUpdateSwitch]=useState("");


  useEffect(()=>{
    if (selectedLeague==="EPL") {
      setLeagueHeader("English Premier League");
    }
    else if (selectedLeague==="EFLC") {
      setLeagueHeader("EFL Championship")
    }
    else if (selectedLeague==="EFLONE") {
      setLeagueHeader("EFL League One")
    }
    else if (selectedLeague==="LL") {
      setLeagueHeader("Primera División")
    }
    else if (selectedLeague==="LL2") {
      setLeagueHeader("Segunda División")
    }
    else if (selectedLeague==="SA") {
      setLeagueHeader("Serie A")
    }
    else if (selectedLeague==="SB") {
      setLeagueHeader("Serie B")
    }
    else if (selectedLeague==="L1") {
      setLeagueHeader("Ligue 1")
    }
    else if (selectedLeague==="L2") {
      setLeagueHeader("Ligue 2")
    }
    else if (selectedLeague==="TSL") {
      setLeagueHeader("Turkish Super League")
    }

  },[selectedLeague])

  return (
    <div style={{ textAlign: "center"}}>
      <Navbar style={{ backgroundColor: "RGB(31, 31, 31)" }} full="true">
        <Header selectedLeague={selectedLeague} setSelectedLeague={setSelectedLeague}  />
        <Col  className="f-end inputs">
            <UpdatePlayer setPlayerUpdateSwitch={setPlayerUpdateSwitch} selectedLeague={selectedLeague}/>
          </Col>
      </Navbar>
      <div style={{height:"10px", backgroundColor:"rgb(254, 215, 61)", width:"100%", shadow: "0px 0px 12px rgba(255,255,255,0.5)"}}></div>

      <h1 style={{textShadow: "0px 0px 12px rgba(255,255,255,0.5)", color:"rgb(254, 215, 61)"}} className='mb-3 mt-2'> {leagueHeader} </h1>

      <Container fluid className='float-start' full="true">
        <Row className=' ms-0' >
          <Col md="4" className="leagueTable mt-2">
            <LeagueTable  selectedLeague={selectedLeague} />
          </Col>
          <Col  md="4" className="fixtures">
            <Fixtures selectedLeague={selectedLeague} />
          </Col>


          <Col md="4" className="statics">
            <Row>
              <GoalTable playerUpdateSwitch={playerUpdateSwitch} selectedLeague={selectedLeague} />
            </Row>
            <Row>
              <AssistTable playerUpdateSwitch={playerUpdateSwitch} selectedLeague={selectedLeague}/>
            </Row>
          </Col>

          
        </Row>
      </Container>


    </div>
  );
}

export default App;
