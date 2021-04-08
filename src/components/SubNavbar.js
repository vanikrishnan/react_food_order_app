import React, { useContext } from 'react';
import { IconContext } from 'react-icons';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Navbar, Nav, Button } from 'react-bootstrap'
// import { BiCalendarEvent } from 'react-icons/bi'
import { RiFilter2Fill } from 'react-icons/ri'
import { DateContext, ItemContext } from './Home'
import '../styles.css'
import DatePicker from "react-datepicker";
import * as moment from 'moment'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

function SubNavbar() {
    const dateContext = useContext(DateContext)
    const itemsDetails = useContext(ItemContext)
    const selectedDate = moment(dateContext.date).format("Do MMM");

    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Title as="h3">Popover</Popover.Title> */}
            <Popover.Content as="h6">
                <div>By Price <FiArrowUp onClick={() => itemsDetails.dispatchItems({type: 'SORT', category: 'price', order: 'asc'})}/> <FiArrowDown onClick={() => itemsDetails.dispatchItems({type: 'SORT', category: 'price', order: 'desc'})}/></div>
                <div>By Item <FiArrowUp onClick={() => itemsDetails.dispatchItems({type: 'SORT', category: 'itemname', order: 'asc'})}/> <FiArrowDown onClick={() => itemsDetails.dispatchItems({type: 'SORT', category: 'itemname', order: 'desc'})}/></div>
            </Popover.Content>
        </Popover>
    )

    const TriggerPopover = () => (
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <Button><RiFilter2Fill /></Button>
        </OverlayTrigger>
    )
    
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
                    <DatePicker selected={dateContext.date} minDate={new Date()} onChange={date => dateContext.dateDispatch({type: 'triggerDateChange', date})} />
                    {selectedDate}
                    </Navbar.Text>
                    </Nav>
                    <Nav>
                    <Navbar.Text>Sort
                    <TriggerPopover />
                    {/* <RiFilter2Fill /> */}
                    </Navbar.Text>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
      </div>
      </IconContext.Provider>
    )
}

export default SubNavbar;