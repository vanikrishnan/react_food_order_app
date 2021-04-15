import React, { useEffect, useReducer, useState } from 'react'
import { Route, Switch, BrowserRouter as Router, useRouteMatch, useHistory } from 'react-router-dom'
import OrderDetails from './OrderDetails'
import NavBar from './NavBar'
import SubNavbar from './SubNavbar'
import FoodItems from './FoodItems'
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jsonwebtoken'
import { Button, Modal  } from 'react-bootstrap'


export const ItemContext = React.createContext()
export const AmountContext = React.createContext()
export const DateContext = React.createContext();
export const CartContext = React.createContext();
export const UserContext = React.createContext()

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
  switch (action.type) {
    case 'triggerDateChange':
      return action.date;
    default:
      return state;
  }
}

const searchCartItems = (defaultItems, searchText) => {
  console.log(searchText, "searchText")
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
  const { path, url } = useRouteMatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("path", path, "url", url)
  let username, email = ''
  let cartItems = []
  let exp = null
  const history = useHistory()

  const reducer = (state, action) => {
    switch (action.type) {
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
      case 'SORT':
        return sortCartItems(state, action.category, action.order)
      case 'SEARCH':
        return searchCartItems(state.defaultItems, action.searchText)
      default:
        return state;

    }
  }

  const [fetchedState, fetchDispatch] = useReducer(reducer, fetchState)


  const addItem = (state, card) => {
    console.log("add item", card.itemname)
    const { itemname, price } = card
    const cart = {
      // id,
      itemname,
      price,
      count: 1
    }
    const existingProductIndex = state.cartDetails.findIndex(item => item.itemname === itemname)
    if (existingProductIndex >= 0) {
      const cartItems = state.cartDetails.slice();
      const existingProduct = cartItems[existingProductIndex]
      const updateExistingProduct = {
        ...existingProduct, count: existingProduct.count + cart.count
      }
      cartItems[existingProductIndex] = updateExistingProduct;
      return { cartDetails: cartItems }
    }
    else {
      return { cartDetails: [...state.cartDetails, cart] }
    }
  }

  const removeItem = (state, card) => {
    console.log(card.itemname, "remove item")
    const { itemname } = card
    const existingProductIndex = state.cartDetails.findIndex(item => item.itemname === itemname)
    if (existingProductIndex >= 0) {
      const cartItems = state.cartDetails.slice();
      console.log(cartItems, "cartItems");
      const existingProduct = cartItems[existingProductIndex]
      if (existingProduct.count - 1 === 0) {
        cartItems.splice(existingProductIndex, 1)
        console.log(cartItems, "removed state.cartDetails")
        return { cartDetails: cartItems }
      }
      else {
        console.log('else')
        const updateExistingProduct = {
          ...existingProduct, count: existingProduct.count - 1
        }
        cartItems[existingProductIndex] = updateExistingProduct;
        return { cartDetails: cartItems }
      }
    }
    else {
      return { cartDetails: [...state.cartDetails] }
    }
  }

  const countReducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return addItem(state, action.card)
      case 'remove':
        return removeItem(state, action.card)
      default:
        return state;
    }
  }
  const extractJWTToken = (token) => {

    jwt.verify(token, process.env.REACT_APP_TOKEN_SECRET, (err, user) => {

      if (err) {
        console.log(err)
      }

      if (user) {
        username = user.username
        email = user.email
        cartItems = user.cartDetails.length > 0 ? user.cartDetails : []
        exp = user.exp
      }

    })

  }

  if (localStorage.getItem('token'))
    extractJWTToken(localStorage.getItem('token'))

    useEffect(() => {
        const expirationTime = ((exp * 1000)) // converting exp into millisec since Date.now() in millisec
        //  2 mins before expiration ((exp * 1000) - 120000) for millisec (120 sec(2 minutes) * 1000)
        if (Date.now() > (expirationTime)) {  
          handleShow();
        }
      return () => {
        console.log("In Cleanup")
      }
    })

    if (cartItems.length > 0)
    initialState.cartDetails = cartItems;

  const [cartState, cartDispatch] = useReducer(countReducer, initialState)
  const [date, dateDispatch] = useReducer(dateReducer, currentDate)

  const totalAmount = calculateTotal(cartState.cartDetails)
  console.log(cartState.cartDetails, totalAmount, "totalAmount", "Home")

  const handleClick = () => {
    localStorage.clear()
    history.push('/')
  }

  return (
    <ItemContext.Provider value={{ itemsState: fetchedState, dispatchItems: fetchDispatch }}>
      <div>
        <CartContext.Provider value={{ cartState: cartState, cartDispatch: cartDispatch }}>
          <AmountContext.Provider value={totalAmount}>
            <DateContext.Provider value={{ date: date, dateDispatch: dateDispatch }}>
              <UserContext.Provider value={{ username: username, email: email, cartItems: cartItems }}>
                <NavBar />
                <Router>
                  <Switch>
                    <Route exact path={`${path}/`}>
                      <SubNavbar />
                      <FoodItems />
                    </Route>
                    <Route exact path={`${path}/checkout`}>
                      <OrderDetails />
                    </Route>
                  </Switch>
                </Router>
              </UserContext.Provider>
            </DateContext.Provider>
          </AmountContext.Provider>
        </CartContext.Provider>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alert !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Token expired. Relogin to Continue</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClick}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </ItemContext.Provider>
  )
}

export default React.memo(Home)