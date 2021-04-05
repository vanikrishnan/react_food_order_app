import React, { useContext } from 'react';
import { BiRupee } from 'react-icons/bi'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap'
// import {useLocation} from "react-router-dom"
import { ItemContext, AmountContext } from './Home'
import RenderCartItems from './RenderCartItems';
import '../styles.css'

function OrderDetails() {
    // const location = useLocation()
    const itemsDetails = useContext(ItemContext)
    const cartDetails = itemsDetails.cartState.cartDetails;
    const amount = useContext(AmountContext)

return (
    <div className="container order-details">
        <h4>Your Order Details</h4>
        <div className="row">
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title className="cart-details-align">
                        <h4>Buffet</h4>
                        <h4>Date 14-11-2019</h4>
                    </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                {cartDetails.length > 0  ?  cartDetails.map((cart) => <RenderCartItems key={cart.id} cart={cart}/>)
            : 'No Items' }
                </ListGroup>
                <ListGroup className="list-group-flush">
                <ListGroupItem>
                <div className="cart-details-align">
                <h5>Sub Total</h5>
                <span><BiRupee />{amount}</span>
                </div>
                <div className="cart-details-align">
                <h5>Taxes</h5>
                <span><BiRupee />0.00</span>
                </div>
                </ListGroupItem>
                <ListGroupItem>
                <div className="cart-details-align">
                <h5>Grand Total</h5>
                <span><BiRupee />{amount}</span>
                </div>
                <Button type="button" className="rounded-pill">Confirm Order</Button>
                </ListGroupItem>
                </ListGroup>
            </Card>
            
        {/* <div>
        </div>

        <div>
            {cartDetails.length > 0  ?  cartDetails.map((cart) => <RenderCartItems key={cart.id} cart={cart}/>)
            : 'No Items' }
        </div> */}
        </div>
    </div>
)
}

export default OrderDetails