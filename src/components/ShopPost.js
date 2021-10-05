import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class ShopPost extends Component {
    constructor() {
        super();
        this.state = {
            image: {},
        }
    }

    componentDidMount = async () => {
        const imageres = await fetch(`http://127.0.0.1:8000/media/${this.props.product.product_id}.jpg`)
        const imageBlob = await imageres.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        this.setState({
            image: imageObjectURL,
        })

    }

    // addCart = async (event) => {
    //     event.preventDefault()
    //     const token = JSON.parse(localStorage.getItem('user')).token;
    //     const username = JSON.parse(localStorage.getItem('user')).username;
    //     const res = await fetch(`http://127.0.0.1:8000/api/products/add/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Token ${token}`
    //         },
    //         body: JSON.stringify({
    //             "product": this.props.product.product_id,
    //             "username": username
    //         })
    //     })
    //     const data = await res.json()
    //     console.log(data)
    // }

    render() {
        const p = this.props.product
            return (
                <div className="card col-3 text-decoration-none text-dark">
                    <img src={this.state.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <Link to={`/shop/${p.product_id}`} className="text-decoration-none text-dark">
                            <h5 className="card-title">{p.title}</h5>
                            <p className="card-text">{p.product_type}</p>
                            <p className="card-text">${p.price}</p>
                        </Link>

                        <button onClick={() => this.props.addToCart(p)} className="btn btn-primary">Add to Cart</button>
        
                    </div>
                </div>

            )
        
    }
}
