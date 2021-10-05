import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">{this.props.user?`Hello, ${this.props.user.username}`:"Hello, Guest"}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                            </li>

                            {/* {
                                this.props.isLoggedIn ?
                                    <> */}
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/news"><i className="fas fa-newspaper"></i> Newspaper</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/blog">Blog</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={() => this.props.handleLogout()} to="/home">Logout</Link>
                                        </li>
                                    {/* </>
                                    :
                                    <> */}
                                        <div className="d-inline-flex justify-content-end">
                                            <Link className="" to="/register">
                                                <button className="btn btn-primary">Register</button>
                                            </Link>
                                            <Link className="" to="/login">
                                                <button className="btn btn-success">Login</button>
                                            </Link>
                                        </div>
                                    {/* </>
                            } */}


                            <li className="nav-item">
                                <Link className="nav-link" to="/blog/create">Create Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/shop"><i className="fas fa-store"></i> Shop</Link>
                            </li>
                            <li className="nav-item justify-items-end">
                                <Link className="nav-link" to="/cart"><i className="fas fa-cart-plus"></i>
                                    {this.props.cart.length}|{this.props.sumTotalCart(this.props.cart)}</Link>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
        )
    }
}
