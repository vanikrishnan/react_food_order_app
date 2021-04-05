import React, { useReducer } from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import OrderDetails from './OrderDetails'
import NavBar from './NavBar'
import App from '../App';

export const ItemContext = React.createContext()
export const AmountContext = React.createContext()

  const fetchState = {
    loading: true,
    items: [],
    error: ''
  }

  const initialState = {
    cartDetails: []
  }

  const addItem = (state, card, id) => {
    console.log(id, "add item", card)
    const { itemname, price } = card
    const cart = {
      id,
      itemname,
      price,
      count: 1
    } 
    const existingProductIndex = state.cartDetails.findIndex(item => item.id === id)
    if (existingProductIndex >= 0) {
    const cartItems = state.cartDetails.slice();
    const existingProduct = cartItems[existingProductIndex]
    const updateExistingProduct = {
          ...existingProduct, count: existingProduct.count + cart.count
        }
    cartItems[existingProductIndex] = updateExistingProduct;
    return {cartDetails: cartItems}
    }
    else {
      return {cartDetails: [...state.cartDetails, cart]}
    }
  }

  const removeItem = (state, id) => {
    console.log(id, "remove item")
    const existingProductIndex = state.cartDetails.findIndex(item => item.id === id)
    if (existingProductIndex >= 0) {
      const cartItems = state.cartDetails.slice();
      console.log(cartItems, "cartItems");
      const existingProduct = cartItems[existingProductIndex]
      if (existingProduct.count - 1 === 0) {
        cartItems.splice(existingProductIndex, 1)
      console.log(cartItems,"removed state.cartDetails")
      return {cartDetails: cartItems}
      }
      else {
      console.log('else')
      const updateExistingProduct = {
        ...existingProduct, count: existingProduct.count - 1
      }
      cartItems[existingProductIndex] = updateExistingProduct;
     return {cartDetails: cartItems}
    }
    }
    else {
      return {cartDetails: [...state.cartDetails]}
    }
  }

  const countReducer = (state, action) => {
    switch(action.type) {
      case 'add': 
       return addItem(state, action.card, action.index)
      case 'remove':
       return removeItem(state, action.index)
      default: 
        return state;
    }
  }

const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                error: '',
                items: [...fetchState.items, ...action.payload]
            }
        case 'FETCH_ERROR':
        return {
            loading: false,
            error: 'Error While Fetching',
            items: []
        }
        default : 
        return state;

    }
}

const calculateTotal = (cartArr) => {
    let sum = 0;
    for (let i = 0; i < cartArr.length; i++) {
        sum = sum + (cartArr[i].count * cartArr[i].price)
    }
    console.log('Total', sum)
    return sum;
}

function Home() {
const [fetchedState, fetchDispatch] = useReducer(reducer, fetchState)
const [cartState, cartDispatch] = useReducer(countReducer, initialState)

const totalAmount = calculateTotal(cartState.cartDetails)
console.log(cartState.cartDetails, totalAmount, "totalAmount","Home")

    return (
        <Router>
        <NavBar />
        <div>
    <Switch>
      <ItemContext.Provider value={{itemsState: fetchedState, dispatchItems: fetchDispatch, cartState: cartState, cartDispatch: cartDispatch}}>
        <AmountContext.Provider value={totalAmount}>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/checkout">
        <OrderDetails />
      </Route>
      </AmountContext.Provider>
      </ItemContext.Provider>
    </Switch>
    </div>
    </Router>
    )
}

export default Home