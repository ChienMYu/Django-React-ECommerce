import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class CreateComment extends Component {
    constructor() {
        super();
        this.state = {
            redirect: null,
        }
    }
    createPost = async (event) => {
        event.preventDefault()
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await fetch(`http://127.0.0.1:8000/api/posts/${this.props.my_match.params.id}/comment/add`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Token ${token}`
            },
            body: JSON.stringify({
                "content": event.target.content.value,
            })
        })
        const data = await res.json()
        console.log(data)
        this.setState({
            redirect:true
        })
    } 
    render() {
        if (this.state.redirect) {
            return <Redirect to="/blog/"/>
        }
        return (
            <form onSubmit={(e)=>this.createPost(e)} className="container border">
                <h1>Add Comment</h1>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" name="content" rows="3"></textarea>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        )
    }
}
