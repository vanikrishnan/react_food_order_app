import React, { useReducer, useCallback, useState } from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import OrderDetails from './OrderDetails'
import NavBar from './NavBar'
import App from '../App';
import debounce from 'lodash.debounce';

export const ItemContext = React.createContext()
export const AmountContext = React.createContext()
export const DateContext = React.createContext(); 
export const CartContext = React.createContext();

  const fetchState = {
    loading: true,
    items: [],
    error: ''
  }

  const initialState = {
    cartDetails: []
  }

  const currentDate = new Date();

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

  const sortCartItems = (items, category, order) => {
    if (order === 'asc') {
        if (category === 'itemname') {
        items.sort((a, b) => {
            const item1 = a.itemname.toLowerCase();
            const item2 = b.itemname.toLowerCase();
            return (item1 > item2) ? 1 : ((item1 < item2) ? -1 : 0)
        })
        console.log(items, "asc itemname")
        return {
          loading: false,
          error: '',
          items: items
        }
    }
        else {
        items.sort((a, b) => {
            return a[category] - b[category]
        })
        console.log(items, "asc price")
        return {
          loading: false,
          error: '',
          items: items
        }
    }
    } else {
        if (category === 'itemname') {
        items.sort((a, b) => {
            const item1 = a.itemname.toLowerCase();
            const item2 = b.itemname.toLowerCase();
            return (item1 < item2) ? 1 : ((item1 > item2) ? -1 : 0)
        })
        console.log(items, "desc itemname")
        return {
          loading: false,
          error: '',
          items: items
        }
    }
        else {
        items.sort((a, b) => {
            return b[category] - a[category]
        })
        console.log(items, "desc price")
        return {
          loading: false,
          error: '',
          items: items
        }
    }
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

const dateReducer = (state, action) => {
  switch(action.type) {
    case 'triggerDateChange': 
    return action.date;
    default: 
    return state;
  }
}

function Home() {
  const [searchValue, setSearchValue] = useState('')

  const debounceSearch = useCallback(debounce((items,searchValue) => {
      return {
        loading: false,
        error: '',
        items: items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).includes(searchValue)
      })
    })
      }
  }, 1000), [] )

  const searchCartItems = async(items, searchText) => {
  console.log(searchText,"searchText")
    setSearchValue(searchText);
    const filteredResult = await debounceSearch(items, searchText);
    console.log(filteredResult,"filteredResult")
    return filteredResult;
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
        case 'SORT':
        return sortCartItems(state.items, action.category, action.order)
        case 'SEARCH':
        return searchCartItems(state.items, action.searchText)
        default : 
        return state;

    }
}

const [fetchedState, fetchDispatch] = useReducer(reducer, fetchState)
const [cartState, cartDispatch] = useReducer(countReducer, initialState)
const [date, dateDispatch] = useReducer(dateReducer, currentDate)

const totalAmount = calculateTotal(cartState.cartDetails)
console.log(cartState.cartDetails, totalAmount, "totalAmount","Home")

    return (
      <ItemContext.Provider value={{itemsState: fetchedState, dispatchItems: fetchDispatch}}>
        <Router>
        <NavBar />
        <div>
    <Switch>
        <CartContext.Provider value={{cartState: cartState, cartDispatch: cartDispatch}}>
        <AmountContext.Provider value={totalAmount}>
        <DateContext.Provider value = {{date: date, dateDispatch: dateDispatch}}>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/checkout">
        <OrderDetails />
      </Route>
      </DateContext.Provider>
      </AmountContext.Provider>
      </CartContext.Provider>
    </Switch>
    </div>
    </Router>
    </ItemContext.Provider>
    )
}

export default Home