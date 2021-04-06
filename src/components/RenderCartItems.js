import React, {useContext} from 'react'
import { Button, ButtonGroup, ListGroupItem } from 'react-bootstrap'
import { GrFormAdd, GrFormSubtract } from 'react-icons/gr'
import { CartContext } from './Home'
import { BiRupee } from 'react-icons/bi'

function RenderCartItems({cart}) {
    const cartData = useContext(CartContext)
    // const findIndex = cartData.cartState.cartDetails.length > 0 ? cartData.cartState.cartDetails.findIndex(item => item.id === cart.id): -1;
    // const cartItem = (findIndex >= 0 && cartData.cartState.cartDetails[findIndex]) ? cartData.cartState.cartDetails[findIndex]: 0;

    return (
        <>
        <ListGroupItem>
            <div className="cart-details-align">
            <h5>{cart.itemname}</h5>
            <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" className="rounded-pill sub"><GrFormSubtract onClick={() => cartData.cartDispatch({type: 'remove', index: cart.id})}/></Button>
                <Button variant="secondary" className="text-dark">{cart.count}</Button>
                <Button variant="secondary" className="rounded-pill add"><GrFormAdd onClick={() => cartData.cartDispatch({type: 'add', card: cart, index: cart.id})}/></Button>
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