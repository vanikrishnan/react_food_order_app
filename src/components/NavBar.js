import React, { useContext, useCallback} from 'react';
import { Navbar, Nav, Form, FormControl, InputGroup } from 'react-bootstrap'
import { FaEarlybirds, FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { HiSearch } from "react-icons/hi";
import { ItemContext } from './Home'
import { debounce } from 'lodash'
import '../styles.css'
import { useHistory } from 'react-router';

function NavBar() {
    const history = useHistory()
    if (!localStorage.getItem('token')) 
    history.push('/')
    const itemsDetails = useContext(ItemContext)
    console.log(itemsDetails, "Navbar")

    const handleClick = () => {
        alert(`Helo vani`)
    }

    const searchHandler = debounce(e => {
            console.log(e.target.value, "in debounce");
            itemsDetails.dispatchItems({type: 'SEARCH', searchText: e.target.value})
    }, 1000)

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
                    <FormControl type="text" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" className="mr-sm-2" onChange={(e) => searchHandler(e)}/>
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