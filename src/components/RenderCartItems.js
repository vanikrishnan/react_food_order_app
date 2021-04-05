import React, {useContext} from 'react'
import { Button, ButtonGroup, ListGroupItem } from 'react-bootstrap'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { ItemContext } from './Home'
import { BiRupee } from 'react-icons/bi'

function RenderCartItems({cart}) {
    const itemsDetails = useContext(ItemContext)
    // const findIndex = itemsDetails.cartState.cartDetails.length > 0 ? itemsDetails.cartState.cartDetails.findIndex(item => item.id === cart.id): -1;
    // const cartItem = (findIndex >= 0 && itemsDetails.cartState.cartDetails[findIndex]) ? itemsDetails.cartState.cartDetails[findIndex]: 0;

    return (
        <>
        <ListGroupItem>
            <div className="cart-details-align">
            <h5>{cart.itemname}</h5>
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" className="rounded-pill"><GrFormSubtract onClick={() => itemsDetails.cartDispatch({type: 'remove', index: cart.id})}/></Button>
                <Button variant="secondary" className="rounded-pill text-dark">{cart.count}</Button>
                <Button variant="secondary" className="rounded-pill"><GrFormAdd onClick={() => itemsDetails.cartDispatch({type: 'add', card: cart, index: cart.id})}/></Button>
              </ButtonGroup>
            </div>
        <div className="cart-details-align">
            <span>{cart.count} X {cart.price}</span>
            <span><BiRupee />{cart.count * cart.price}</span>
        </div>
        </ListGroupItem>
        </>
    )
}

export default RenderCartItems