import React, { Component } from 'react'
import ShopPost from '../components/ShopPost';

export default class Shop extends Component {
    constructor(){
        super();
        this.state = {
            products: []
        }
    }

    componentDidMount= async() => {
        const res = await fetch("http://127.0.0.1:8000/api/products/")
        const data = await res.json();
        this.setState({
            products:data
        })
    }

    // importImage = async () => {
    //     const res = await fetch(`http://127.0.0.1:8000/media/.jpg`)
    //     const data = await res.json();

    // }

    render() {
        return (
            <div className="container"> 
                <div className="row">
                    {this.state.products.map((p, i) => <ShopPost addToCart={this.props.addToCart} isLoggedIn ={this.props.isLoggedIn} product={p} key={i}/>)}
                </div>
            </div>
        )
    }
}
