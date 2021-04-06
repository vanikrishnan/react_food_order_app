import React, { useContext } from 'react'
import '../styles.css'
import { CartContext } from './Home'
import { Button, ButtonGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { BiRupee } from 'react-icons/bi'

function RenderCard({card, index}) {
    const cartData = useContext(CartContext)
    const findIndex = cartData.cartState.cartDetails.length > 0 ? cartData.cartState.cartDetails.findIndex(item => item.id === index): -1;
    const count = (findIndex >= 0 && cartData.cartState.cartDetails[findIndex]) ? cartData.cartState.cartDetails[findIndex].count: 0;

    return (
        <Card style={{ width: '16rem' }} className="mt-3 mr-3 food-items">
        <Card.Body>
            <Card.Title className="card-details-align">
                <div>
                {card.itemname}
                </div>
                <div>
                <BiRupee size="1.2em"/>{card.price}
                </div>
            </Card.Title>
            <div>
            {count !== 0 ? 
                <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" className="rounded-pill sub"><GrFormSubtract size="1.25em" onClick={() => cartData.cartDispatch({type: 'remove', index})}/></Button>
                <Button variant="secondary" className="text-dark">{count}</Button>
                <Button variant="secondary" className="rounded-pill add"><GrFormAdd size="1.25em" onClick={() => cartData.cartDispatch({type: 'add', card, index})}/></Button>
              </ButtonGroup>
              : <Button className="rounded-pill" onClick={() => cartData.cartDispatch({type: 'add', card, index})}>Add</Button>} 
            </div>
        </Card.Body>
        </Card>
    )
}

export default RenderCard;