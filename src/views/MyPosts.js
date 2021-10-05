import React, { Component } from 'react'
import MyBlogPost from '../components/MyBlogPost';

export default class MyPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }


    componentDidMount = async () => {
        if (this.props.isLoggedIn === true) {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const res = await fetch("http://127.0.0.1:8000/api/myposts/", {
                method: "GET",
                headers: { "Authorization": `Token ${token}` }
            })
            const data = await res.json();
            console.log(data)
            this.setState(
                { posts: data }
            )
        }

    }
    render() {
        return (
            <div className="container">
                {this.state.posts.map((p, i) => <MyBlogPost post={p} key={i} />)}
            </div>
        )
    }
}
