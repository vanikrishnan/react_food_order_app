import React, { useContext } from 'react'
import '../styles.css'
import { ItemContext } from './Home'
import { Button, ButtonGroup } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { BiRupee } from 'react-icons/bi'

function RenderCard({card, index}) {
    const itemsDetails = useContext(ItemContext)
    const findIndex = itemsDetails.cartState.cartDetails.length > 0 ? itemsDetails.cartState.cartDetails.findIndex(item => item.id === index): -1;
    const count = (findIndex >= 0 && itemsDetails.cartState.cartDetails[findIndex]) ? itemsDetails.cartState.cartDetails[findIndex].count: 0;

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
                <Button variant="secondary" className="rounded-pill"><GrFormSubtract size="1.25em" onClick={() => itemsDetails.cartDispatch({type: 'remove', index})}/></Button>
                <Button variant="secondary" className="rounded-pill text-dark">{count}</Button>
                <Button variant="secondary" className="rounded-pill"><GrFormAdd size="1.25em" onClick={() => itemsDetails.cartDispatch({type: 'add', card, index})}/></Button>
              </ButtonGroup>
              : <Button className="rounded-pill" onClick={() => itemsDetails.cartDispatch({type: 'add', card, index})}>Add</Button>} 
            </div>
        </Card.Body>
        </Card>
    )
}

export default RenderCard;