import React, { Component } from 'react'
import BlogPost from '../components/BlogPost';

export default class Blog extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        }
    }


    componentDidMount= async() => {
        const res = await fetch("http://127.0.0.1:8000/api/posts/")
        const data = await res.json();
        console.log(data)
        this.setState(
            {posts: data}
        )
    }
    render() {
        return (
            <div className="container">
                {this.state.posts.map((p, i)=> <BlogPost post={p} key={i}/>)}
            </div>
        )
    }
}
