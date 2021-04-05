import React from 'react';
import { Navbar, Nav, Form, FormControl, InputGroup } from 'react-bootstrap'
import { FaEarlybirds, FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { HiSearch } from "react-icons/hi";
import '../styles.css'

function NavBar() {

    const handleClick = () => {
        alert(`Helo vani`)
    }

    return (
        <IconContext.Provider value={{ size: "1.5em" }}>
        <div>
                <Navbar collapseOnSelect expand="lg" className="bg-warning justify-content-around navbar-fixed-top">
                    <Navbar.Brand>
                    <FaEarlybirds />
                    </Navbar.Brand>
                    <Form inline>
                    <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1" className="bg-warning"><HiSearch color="white"/></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl type="text" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" className="mr-sm-2" />
                    </InputGroup>
                    </Form>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav"  className="justify-content-end">
                    <Nav>
                    <FaUserCircle onClick={handleClick} color="white"/>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
      </div>
      </IconContext.Provider>
    )
}

export default NavBar;