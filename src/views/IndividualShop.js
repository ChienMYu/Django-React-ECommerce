import React, { Component } from 'react'

export default class IndividualShop extends Component {
    constructor(){
        super();
        this.state = {
            product:{},
            image: {},
        }
    }

    componentDidMount = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/products/${this.props.match.params.product_id}`)
        const data = await res.json();
        const imageres = await fetch(`http://127.0.0.1:8000/media/${this.props.match.params.product_id}.jpg`)
        const imageBlob = await imageres.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        this.setState({
            product: data,
            image: imageObjectURL,
        })
    }

    // addCart = async (event) => {
    //     event.preventDefault()
    //     const token = JSON.parse(localStorage.getItem('user')).token;
    //     const username = JSON.parse(localStorage.getItem('user')).username;
    //     const res = await fetch(`http://127.0.0.1:8000/api/products/add/`,{
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization" : `Token ${token}`
    //         },
    //         body: JSON.stringify({
    //             "product": this.state.product.product_id,
    //             "username": username
    //         })
    //     })
    //     const data = await res.json()
    //     console.log(data)
    // } 

    render() {
        const p = this.state.product
        return (
            
            <div className="card col-8">
                <img src={this.state.image} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.product_type}</p>
                    <p className="card-text">${p.price}</p>
                    <button onClick={()=>this.props.addToCart(p)}className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        )}

}
