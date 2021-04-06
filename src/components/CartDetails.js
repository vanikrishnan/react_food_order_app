import React, {useContext} from 'react'
import '../styles.css'
import { CartContext, AmountContext } from './Home'
import { Link } from 'react-router-dom'
import { BiRupee } from 'react-icons/bi'
// import { useHistory } from 'react-router'
import '../styles.css'


function CartDetails() {
    // const history = useHistory()   
    
    let totalAmount = 0;
    const cartData = useContext(CartContext)
    const amount = useContext(AmountContext)
    const isItemExisits =  cartData.cartState.cartDetails && cartData.cartState.cartDetails.length > 0 ? true: false
    console.log(isItemExisits,"isItemExisits", cartData.cartState.cartDetails)

    if (isItemExisits) {
     totalAmount = amount;
    console.log(amount,"totalAmount")
    }

    // const navigateCheckout = () => {
    //     console.log("navigate")
    //     // history.push('/checkout')
    //       return <Link to={
    //          {
    //         pathname: "/checkout", 
    //         data: {
    //          from: cartData
    //         }
    //     }
    //     } />
    // }

    return (
        <div className="card-details-align">
            {isItemExisits ? (cartData.cartState.cartDetails.map((item, index) => (cartData.cartState.cartDetails.length -1 === index) ? <h5 key={item.id}>{item.count} X {item.itemname}</h5> 
            : <h5 key={item.id}>{item.count} X {item.itemname},</h5>)) : <h5>No Cart Items</h5>}
        <h5>Total: <BiRupee size="1.2em"/>{totalAmount}</h5>
        <Link to="/checkout"
        // {
        //      {
        //     pathname: "/checkout", 
        //     data: {
        //      from: cartData
        //     }
        // }
        // }
        >Checkout</Link>
        {/* <Button className="rounded-pill" onClick={() => {
            console.log("navigate");
        <Link to={
            {
            pathname: "/checkout", 
            data: {
             from: cartData
            }
            }
        } />}}>Checkout</Button> */}
        </div>        
    )
}

export default CartDetails;