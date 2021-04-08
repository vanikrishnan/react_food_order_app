import React, { useReducer } from 'react'
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom'
import OrderDetails from './OrderDetails'
import NavBar from './NavBar'
import App from '../App';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './LoginPage'
import Register from './Register'

export const ItemContext = React.createContext()
export const AmountContext = React.createContext()
export const DateContext = React.createContext(); 
export const CartContext = React.createContext();

  const fetchState = {
    loading: true,
    error: '',
    items: [],
    defaultItems: []
  }

  const initialState = {
    cartDetails: []
  }

  const currentDate = new Date();

  const sortCartItems = (state, category, order) => {
    const { items, defaultItems } = state
    if (order === 'asc') {
        if (category === 'itemname') {
        console.log(items, "asc itemname")
        return {
          loading: false,
          error: '',
          items: items.sort((a, b) => {
            const item1 = a.itemname.toLowerCase();
            const item2 = b.itemname.toLowerCase();
            return (item1 > item2) ? 1 : ((item1 < item2) ? -1 : 0)
        }),
          defaultItems
        }
    }
        else {
        console.log(items, "asc price")
        return {
          loading: false,
          error: '',
          items: items.sort((a, b) => {
            return a[category] - b[category]
        }),
          defaultItems
        }
    }
    } else {
        if (category === 'itemname') {
        console.log(items, "desc itemname")
        return {
          loading: false,
          error: '',
          items: items.sort((a, b) => {
            const item1 = a.itemname.toLowerCase();
            const item2 = b.itemname.toLowerCase();
            return (item1 < item2) ? 1 : ((item1 > item2) ? -1 : 0)
        }),
          defaultItems
        }
    }
        else {
        console.log(items, "desc price")
        return {
          loading: false,
          error: '',
          items: items.sort((a, b) => {
            return b[category] - a[category]
        }),
          defaultItems
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

const searchCartItems =  (defaultItems, searchText) => {
  console.log(searchText,"searchText")
    if (searchText) {
      console.log("Inside if in search")
    return {
      loading: false,
      error: '',
      items: defaultItems.filter(item => {
        return Object.keys(item).some(key => {
          return (typeof item[key] === 'string') ? String(item[key].toLowerCase()).includes(searchText.toLowerCase()) : String(item[key]).includes(searchText)
        })
      }),
      defaultItems
    }
  }
    else
    return {
      loading: false,
      error: '',
      items: defaultItems,
      defaultItems
    }
  }

function Home() {

  const updateCount = (state, cart) => {
    const { items, defaultItems } = state
    const {id, count} = cart
    const existingItemIndex = items.findIndex((item, index) => index === id)
    if (existingItemIndex >= 0) {
      const copyExistingItems = items.slice();
      const existingItem = copyExistingItems[existingItemIndex];
      const updateExistingItem = {
        ...existingItem, count: count
      }
      copyExistingItems[existingItemIndex] = updateExistingItem;
      console.log(existingItemIndex, copyExistingItems[existingItemIndex], "Update count")
      return {
        loading: false,
        error: '',
        items: copyExistingItems,
        defaultItems
      }
    }
  }

  const reducer = (state, action) => {
    switch(action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: false,
                error: '',
                items: [...fetchState.items, ...action.payload],
                defaultItems: [...fetchState.items, ...action.payload]
            }
        case 'FETCH_ERROR':
        return {
            loading: false,
            error: 'Error While Fetching',
            items: [],
            defaultItems: []
        }
        case 'UPDATE_COUNT':
        return updateCount(state, action.cart)
        case 'SORT':
        return sortCartItems(state, action.category, action.order)
        case 'SEARCH':
        return searchCartItems(state.defaultItems, action.searchText)
        default : 
        return state;

    }
}

const [fetchedState, fetchDispatch] = useReducer(reducer, fetchState)


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
  fetchDispatch({type: 'UPDATE_COUNT', cart: updateExistingProduct})
  return {cartDetails: cartItems}
  }
  else {
    fetchDispatch({type: 'UPDATE_COUNT', cart})
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
    fetchDispatch({type: 'UPDATE_COUNT', cart: {id: existingProduct.id, count: 0}})
    return {cartDetails: cartItems}
    }
    else {
    console.log('else')
    const updateExistingProduct = {
      ...existingProduct, count: existingProduct.count - 1
    }
    cartItems[existingProductIndex] = updateExistingProduct;
   fetchDispatch({type: 'UPDATE_COUNT', cart: updateExistingProduct})
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

const [cartState, cartDispatch] = useReducer(countReducer, initialState)
const [date, dateDispatch] = useReducer(dateReducer, currentDate)


const totalAmount = calculateTotal(cartState.cartDetails)
console.log(cartState.cartDetails, totalAmount, "totalAmount","Home")

    return (
        <ItemContext.Provider value={{itemsState: fetchedState, dispatchItems: fetchDispatch}}>
        <Router>
        <div>
    <Switch>
        <CartContext.Provider value={{cartState: cartState, cartDispatch: cartDispatch}}>
        <AmountContext.Provider value={totalAmount}>
        <DateContext.Provider value = {{date: date, dateDispatch: dateDispatch}}>
        <Route exact path="/">
      <LoginPage />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
      <Route exact path="/home">
      <NavBar />
        <App />
      </Route>
      <Route exact path="/checkout">
      <NavBar />
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

export default React.memo(Home)