import React, { Component } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Redirect } from 'react-router-dom';

const client_ID = process.env.REACT_APP_CLIENT_ID
const secret_key = process.env.REACT_APP_SECRET

export default class Cart extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null
        }
    }

    emptyCartAPI = async() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await fetch('http://127.0.0.1:8000/api/cart/empty/', {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        const data = await res.json()
        console.log(data)
    }

    getUniqueCart = (cart) => {
        let uniqueCart = [];
        let ids = new Set();
        for (let item of cart) {
            if (!ids.has(item.product_id)) {
                uniqueCart.push(item);
                ids.add(item.product_id)
            }
        }
        return uniqueCart
    }

    getQuantity = (cartItem, cartList) => {
        let count = 0;
        for (let item of cartList) {
            if (cartItem.product_id === item.product_id) {
                count++;
            }
        }
        return count
    }


    // componentDidMount = async () => {
    //     if (this.props.isLoggedIn === true) {
    //         const username = JSON.parse(localStorage.getItem('user')).username
    //         console.log(username)
    //         const res = await fetch(`http://127.0.0.1:8000/api/cart/${username}`)
    //         const data = await res.json();

    //         this.setState({
    //             cart_id: data
    //         })
    //         console.log(this.state.cart_id)
    //         for (let x of data) {
    //             let product_id = x.product
    //             const productres = await fetch(`http://127.0.0.1:8000/api/products/${product_id}`)
    //             const productdata = await productres.json();
    //             this.setState({
    //                 cart: this.state.cart.concat(productdata)
    //             })

    //         }

    //     }
    // }

    // deleteCart = async (product) => {
    //     const token = JSON.parse(localStorage.getItem('user')).token;
    //     const username = JSON.parse(localStorage.getItem('user')).username;
    //     let cart_id = null
    //     for (let cartitem of this.state.cart_id) {
    //         console.log(cartitem)
    //         if (product.product_id === cartitem.product) {
    //             cart_id = cartitem.cart_id
    //             break
    //         }
    //     }
    //     let newCart = [...this.state.cart]
    //     for (let i = newCart.length - 1; i >= 0; i--) {
    //         if (product.product_id === newCart[i].product_id) {
    //             newCart.splice(i, 1);
    //             break
    //         }
    //     }
    //     this.setState({ cart: newCart })
    //     console.log(cart_id)
    //     const res = await fetch(`http://127.0.0.1:8000/api/cart/${username}/delete/${cart_id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Authorization": `Token ${token}`,
    //         }
    //     })
    //     const data = await res.json()
    //     console.log(data)


    // }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/shop' />
        } else {
            return (
                <>{this.props.cart.length > 0 ? (
                    <div className="container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getUniqueCart(this.props.cart).map(p => (
                                    <tr key={p.product_id}>
                                        <td>{p.product_id}</td>
                                        <td>{p.product_type}</td>
                                        <td>{this.getQuantity(p, this.props.cart)}</td>
                                        <td>{p.price}</td>
                                        <td>${(this.getQuantity(p, this.props.cart) * p.price).toFixed(2)}</td>
                                        <td>
                                            <button onClick={() => this.props.removeFromCart(p)} className="btn btn-danger">Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>



                        <PayPalScriptProvider options={{ "client-id": client_ID }}>
                            <PayPalButtons
                                style={{ layout: "horizontal" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [{
                                            amount: {
                                                value: this.props.sumTotalCart(this.props.cart),
                                            }
                                        }]
                                    })
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        this.emptyCartAPI();
                                        this.props.emptyCart();
                                        this.setState({redirect: true});
                                        alert('Transaction completed by ' + details.payer.name.given_name)
                                        
                                    })
                                }}
                            />


                        </PayPalScriptProvider>



                    </div>
                ) : (
                    <div className="container">
                        <h1>Your cart is empty </h1>
                    </div>

                )}
                </>
            )

        }
    }
}
