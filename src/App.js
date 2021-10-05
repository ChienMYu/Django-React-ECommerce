import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import News from './views/News';
import Blog from './views/Blog';
import PostDetail from './views/PostDetail';
import CreatePost from './views/CreatePost';
import UpdatePost from './views/UpdatePost';
import Shop from './views/Shop';
import IndividualShop from './views/IndividualShop';
import Cart from './views/Cart';
import Login from './views/Login';
import Register from './views/Register';
import CreateComment from './views/CreateComment';
import MyPosts from './views/MyPosts';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      isLoggedIn: false,
      user: null,
    }

  }
  // componentDidMount = () => {
  //   console.log(this.state.user)
  // }

  handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password1.value
    const res = await fetch(`http://127.0.0.1:8000/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "username": username, "password": password })
    })
    const data = await res.json()
    const user = {
      token: data.token,
      username,
    }
    if (user.token) {
      this.setState({
        isLoggedIn: true,
        user: user,
      })
      localStorage.setItem('user', JSON.stringify(user))
      this.getCart();
    }

  }

  handleLogout = () => {
    localStorage.removeItem('user');
    this.setState({
      isLoggedIn: false,
      user: null,
      cart: []
    })
  }
  
  emptyCart = () => {
    this.setState({cart:[]})
  }


  addToCart = (product) => {
    if (this.state.isLoggedIn) {
      this.addToCartAPI(product.product_id);
    }
    this.setState({
      cart: this.state.cart.concat(product)
    })
  }
  removeFromCart = (product) => {
    let newCart = [...this.state.cart]
    for (let i = newCart.length - 1; i >= 0; i--) {
      if (product.product_id === newCart[i].product_id) {
        newCart.splice(i, 1);
        break
      }
    }
    if (this.state.isLoggedIn) {
      this.removeFromCartAPI(product.product_id)
    }
    this.setState({ cart: newCart })
  }

  removeFromCartAPI = async (p_id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const res = await fetch(`http://127.0.0.1:8000/api/cart/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({
        product_id: p_id
      })
    });
    const data = await res.json()
    console.log(data)
  }

  addToCartAPI = async (p_id) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const res = await fetch(`http://127.0.0.1:8000/api/cart/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify({
        product_id: p_id
      })
    });
    const data = await res.json()
    console.log(data)
  }

  sumTotalCart = (cartList) => {
    let total = 0;
    for (let item of cartList) {
      total += parseFloat(item.price)
    }
    return total.toFixed(2)
  }

  getCart = async () => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    const res = await fetch(`http://127.0.0.1:8000/api/cart/`, {
      method: "GET",
      headers: { "Authorization": `Token ${token}` }
    });
    const data = await res.json()
    this.setState({ cart: data })
  }

  componentDidMount = () => {
    if (localStorage.getItem('user')) {
      this.getCart();
    }

  }

  render() {
    return (

      <div>
        <Nav user={this.state.user} cart={this.state.cart} sumTotalCart={this.sumTotalCart} handleLogout={this.handleLogout} />

        <Switch>
          <Route exact path='/' render={() => <MyPosts />} />
          <Route exact path='/shop' render={() => <Shop addToCart={this.addToCart} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/shop/:product_id' render={({ match }) => <IndividualShop match={match} addToCart={this.addToCart} isLoggedIn={this.state.isLoggedIn} />} />
          <Route exact path='/cart' render={() => <Cart emptyCart={this.emptyCart} removeFromCart={this.removeFromCart} sumTotalCart={this.sumTotalCart} cart={this.state.cart} isLoggedIn={this.state.isLoggedIn} />} />
          {/* {
            this.state.isLoggedIn ?
              <> */}
          <Route exact path='/news' render={() => <News />} />
          <Route exact path='/blog' render={() => <Blog />} />
          <Route exact path='/home' render={() => <MyPosts isLoggedIn={this.state.isLoggedIn}/>} />
          <Route exact path='/blog/create' render={() => <CreatePost />} />
          <Route exact path='/blog/:id' render={({ match }) => <PostDetail my_match={match} />} />
          <Route exact path='/blog/update/:id' render={({ match }) => <UpdatePost my_match={match} />} />
          <Route exact path='/blog/:id/comment/add' render={({ match }) => <CreateComment my_match={match} />} />
          {/* </>
              :
              <> */}
          <Route exact path='/login' render={() => <Login handleLogin={this.handleLogin} />} />
          <Route exact path='/register' render={() => <Register />} />

          {/* </>
          } */}



        </Switch>
      </div>
    )
  }
}

