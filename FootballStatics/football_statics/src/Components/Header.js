import React, { useState } from 'react';
import { Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'reactstrap';

export default function Header({ setSelectedLeague }) {
    const [englandDropdownOpen, setEnglandDropdownOpen] = useState(false);
    const [spainDropdownOpen, setSpainDropdownOpen] = useState(false);
    const [italyDropdownOpen, setItalyDropdownOpen] = useState(false);
    const [franceDropdownOpen, setFranceDropdownOpen] = useState(false);
    const [turkeyDropdownOpen, setTurkeyDropdownOpen] = useState(false);

    const toggleEngland = () => setEnglandDropdownOpen((prevState) => !prevState);
    const toggleSpain = () => setSpainDropdownOpen((prevState) => !prevState);
    const toggleItaly = () => setItalyDropdownOpen((prevState) => !prevState);
    const toggleFrance = () => setFranceDropdownOpen((prevState) => !prevState);
    const toggleTurkey = () => setTurkeyDropdownOpen((prevState) => !prevState);




    return (
        <Container>
            <Row>
                <Col md="auto" >
                    <img style={{ width: "180px", height: "180px" }} src="/assets/images/logo.png" alt="Logo" />
                </Col>
                <Col className='mt-2' md="auto">
                    <div className="England d-flex pe-5 ps-5 pt-5">
                        <Dropdown className='dropdownOpen' isOpen={englandDropdownOpen} toggle={toggleEngland}>
                            <DropdownToggle className='dropdownToggle' style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)", fontWeight:"bolder" }}  caret>England󠁧</DropdownToggle>
                            <DropdownMenu style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)" }}>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("EPL")}>Premier League</DropdownItem>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("EFLC")}>Championship</DropdownItem>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("EFLONE")}>EFL League One</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col className='mt-2' md="auto">
                    <div className="Spain d-flex pe-5 ps-5 pt-5">
                        <Dropdown className='dropdownOpen' isOpen={spainDropdownOpen} toggle={toggleSpain}>
                            <DropdownToggle className='dropdownToggle' style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)", fontWeight:"bolder" }} caret>Spain</DropdownToggle>
                            <DropdownMenu style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)" }}>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("LL")}>Primera División</DropdownItem>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("LL2")}>Segunda División</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col className='mt-2' md="auto">
                    <div className="Italy d-flex pe-5 ps-5 pt-5">
                        <Dropdown className='dropdownOpen' isOpen={italyDropdownOpen} toggle={toggleItaly}>
                            <DropdownToggle className='dropdownToggle' style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)", fontWeight:"bolder" }}  caret>Italy</DropdownToggle>
                            <DropdownMenu style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)" }}>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("SA")}>Serie A</DropdownItem>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("SB")}>Serie B</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col className='mt-2' md="auto">
                    <div className="France d-flex pe-5 ps-5 pt-5">
                        <Dropdown className='dropdownOpen' isOpen={franceDropdownOpen} toggle={toggleFrance}>
                            <DropdownToggle className='dropdownToggle' style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)", fontWeight:"bolder" }}  caret>France</DropdownToggle>
                            <DropdownMenu style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)" }}>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("L1")}>Ligue 1</DropdownItem>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("L2")}>Ligue 2</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                <Col className='mt-2' md="auto">
                    <div className="Turkey d-flex pe-5 ps-5 pt-5">
                        <Dropdown className='dropdownOpen' isOpen={turkeyDropdownOpen} toggle={toggleTurkey}>
                            <DropdownToggle className='dropdownToggle' style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)", fontWeight:"bolder" }}  caret>Turkey</DropdownToggle>
                            <DropdownMenu style={{backgroundColor : "RGB(255, 222, 89)", color: "RGB(31, 31, 31)" }}>
                                <DropdownItem className='dropItem' onClick={() => setSelectedLeague("TSL")}>Super League</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </Col>
                
            </Row>
        </Container>

    );
}
