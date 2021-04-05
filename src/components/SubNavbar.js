import React from 'react';
import { IconContext } from 'react-icons';
import { Navbar, Nav } from 'react-bootstrap'
import { BiCalendarEvent } from 'react-icons/bi'
import { RiFilter2Fill } from 'react-icons/ri'
import '../styles.css'

function SubNavbar() {

    return (
        <IconContext.Provider value={{ size: "1.5em", color: "#ffc107" }}>
        <div>
                <Navbar collapseOnSelect expand="lg" className="bg-white">
                    <Navbar.Text>
                    Lunch
                    </Navbar.Text>
                    <Navbar.Text>
                    Buffet
                    </Navbar.Text>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav"  className="justify-content-end">
                    <Nav>
                    <Navbar.Text>
                    <BiCalendarEvent />8th Nov
                    </Navbar.Text>
                    </Nav>
                    <Nav>
                    <Navbar.Text>Sort
                    <RiFilter2Fill />
                    </Navbar.Text>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
      </div>
      </IconContext.Provider>
    )
}

export default SubNavbar;