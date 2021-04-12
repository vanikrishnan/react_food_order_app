import React, { useContext, useCallback } from 'react';
import { Navbar, Nav, Form, FormControl, InputGroup, Button } from 'react-bootstrap'
import { FaEarlybirds, FaUserCircle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { HiSearch } from "react-icons/hi";
import { ItemContext, CartContext, UserContext } from './Home'
import { debounce } from 'lodash'
import '../styles.css'
import { useHistory } from 'react-router';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import axios from "axios";
import jwt from 'jsonwebtoken'

function NavBar() {
    const history = useHistory()
    if (!localStorage.getItem('token'))
        history.push('/')
    const itemsDetails = useContext(ItemContext)
    const userDetails = useContext(UserContext)
    console.log(itemsDetails, "Navbar", userDetails, "userDetails")
    let username, email
    const cartData = useContext(CartContext)
    const cartDetails = cartData.cartState.cartDetails;

    const extractJWTToken = (token) => {

        jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET, (err, user) => {

            if (err) console.log(err)

            if (user) {
                username = user.username
                email = user.email
            }

        })

    }

    extractJWTToken(localStorage.getItem('token'))

    const logoutUser = () => {
        axios
            .get('http://localhost:4000/users/logout', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                console.log(response, "response");
                localStorage.clear();
                history.push('/')
            })
            .catch((err) => {
                console.log(err);
                return err;
            });
    }

    const handleLogout = () => {

        if (cartDetails.length > 0) {
            const postObj = {
                email: userDetails.email,
                cartDetails
            }
            axios
                .post('http://localhost:4000/users/updateUser', postObj, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then((response) => {
                    if (response)
                        logoutUser()
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        } else
            logoutUser()
    }

    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Title as="h3">Popover</Popover.Title> */}
            <Popover.Content as="h6">
                <div>Hi {userDetails.username}</div>
                <Button onClick={handleLogout}>Logout</Button>
            </Popover.Content>
        </Popover>
    )

    const TriggerPopover = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <FaUserCircle color="white" />
        </OverlayTrigger>
    )

    const searchHandler = debounce(e => {
        console.log(e.target.value, "in debounce");
        itemsDetails.dispatchItems({ type: 'SEARCH', searchText: e.target.value })
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
                                <InputGroup.Text id="basic-addon1" className="bg-warning"><HiSearch color="white" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" className="mr-sm-2" onChange={(e) => searchHandler(e)} />
                        </InputGroup>
                    </Form>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <TriggerPopover />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </IconContext.Provider>
    )
}

export default NavBar;