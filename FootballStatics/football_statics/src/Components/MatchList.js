import { useState, useEffect } from 'react';
import React from 'react';
import {
  Button,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Accordion,
  Row,
  Col,
  Container,
  FormGroup,
  Input,
} from 'reactstrap';


const MatchList = ({ selectedRound, playersArray, _setData, _data, roundMatches, accordionState, setMatches, selectedLeague }) => {
  const [open, setOpen] = useState(accordionState)
  const [editedHomeGoals, seteditedHomeGoals] = useState("");
  const [editedAwayGoals, seteditedAwayGoals] = useState("");
  const [editedHomeTeam, setEditedHomeTeam] = useState("");
  const [editedAwayTeam, setEditedAwayTeam] = useState("");
 

  useEffect(() => {
    setOpen(accordionState);
  }, [accordionState]);

  const toggle = (id) => {
    setOpen((prevOpen) => (prevOpen === id ? 0 : id));
  };



  const UpdateMatch = () => {
    console.log("mac guncellendi")
    const editedWeek = roundMatches.map((match) => {
      if (match.team1 === editedHomeTeam && match.team2 === editedAwayTeam) {
        return {
          ...match,
          team1: editedHomeTeam,
          team2: editedAwayTeam,
          score: {
            ft: [
              editedHomeGoals,
              editedAwayGoals
            ]
          }
        }
      } else {
        return match;
      }
    })
    setMatches(editedWeek)
    const allMatches = _data.map((i) => {
      if (i.round === roundMatches[0].round) {
        if (i.team1 === editedHomeTeam && i.team2 === editedAwayTeam) {
          return {
            round: selectedRound,
            team1: editedHomeTeam,
            team2: editedAwayTeam,
            score: {
              ft: [
                editedHomeGoals,
                editedAwayGoals
              ]
            }
          }
        } else { return i }

      } else { return i }
    })

    _setData(allMatches)


    fetch(`http://localhost:3000/${selectedLeague}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matches: allMatches,
        players: playersArray
      }),
    });


  }





  const setTeams = (t1, t2) => {
    setEditedHomeTeam(t1)
    setEditedAwayTeam(t2)

  }

  return (
    <div >

      <Accordion open={open} toggle={toggle}>
        {roundMatches.map((matchFixture, index) => (
          <AccordionItem onClick={() => setTeams(matchFixture.team1, matchFixture.team2)} key={index}>
            <AccordionHeader className='text-center' style={{ width: "100%" }} targetId={`${index}_accordion`}>
              <Container className='p-0' style={{ width: "100%" }}>
                <Row className='text-center'>
                  <Col className='col-3 d-flex align-items-center justify-content-center'>
                    <span style={{ fontSize: "small" }} className={matchFixture.score.ft[0] > matchFixture.score.ft[1] ? 'fw-bold' : ''}> {matchFixture.team1} </span>
                  </Col>
                  &nbsp;
                  <Col className='col-2 d-flex align-items-center justify-content-center'><Input placeholder={matchFixture.score.ft[0]} className={matchFixture.score.ft[0] > matchFixture.score.ft[1] ? 'form-control form-control-md placeholderI ps-2 py-1 border-2 border-success' : matchFixture.score.ft[0] < matchFixture.score.ft[1] ? 'form-control form-control-md placeholderI ps-2 py-1 border-2 border-danger' : 'form-control form-control-md placeholderI ps-2 py-1 border-2 border-warning'} disabled /> </Col>
                  <Col className='col-1 d-flex align-items-center justify-content-center'><span style={{ fontSize: "small" }} className='fw-bold'>-</span></Col>
                  <Col className='col-2 d-flex align-items-center justify-content-center'><Input placeholder={matchFixture.score.ft[1]} className={matchFixture.score.ft[0] < matchFixture.score.ft[1] ? 'form-control form-control-md placeholderI ps-2 py-1 border-2 border-success' : matchFixture.score.ft[0] > matchFixture.score.ft[1] ? 'form-control form-control-md placeholderI ps-2 py-1 border-2 border-danger' : 'form-control form-control-md placeholderI ps-2 py-1 border-2 border-warning'} disabled /> </Col>
                  &nbsp;
                  <Col className='col-3 d-flex align-items-center justify-content-center'>
                    <span style={{ fontSize: "small" }} className={matchFixture.score.ft[0] < matchFixture.score.ft[1] ? 'fw-bold' : ''}> {matchFixture.team2} </span>
                  </Col>
                </Row>
              </Container>
            </AccordionHeader>

            <AccordionBody accordionId={`${index}_accordion`}>
              <Row>
                <Col className="col-4">
                  <FormGroup>
                    <Input value={matchFixture.team1} style={{ fontSize: "smaller" }} placeholder={matchFixture.team1} disabled name="city" />
                  </FormGroup>
                </Col>
                <Col className="col-2">
                  <FormGroup>
                    <Input style={{ fontSize: "smaller" }} id={`${index}_editedGoals1`} name="score1" onChange={(e) => seteditedHomeGoals(e.target.value)} />
                  </FormGroup>
                </Col>
                <Col className="col-2">
                  <FormGroup>
                    <Input style={{ fontSize: "smaller" }} id={`${index}_editedGoals2`} name="score2" onChange={(e) => seteditedAwayGoals(e.target.value)} />
                  </FormGroup>
                </Col>
                <Col className="col-4">
                  <FormGroup>
                    <Input value={matchFixture.team2} disabled style={{ fontSize: "smaller" }} placeholder={matchFixture.team2} />
                  </FormGroup>
                </Col>
              </Row>
              <Button id={`${index}_updateButton`} onClick={UpdateMatch} className='btn btn-warning'>Edit Match</Button>

            </AccordionBody>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  );
};

export default MatchList;