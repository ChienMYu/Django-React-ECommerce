import React, { Component } from 'react'

export default class UpdatePost extends Component {

    createComment = async (event) => {
        event.preventDefault()
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await fetch(`http://127.0.0.1:8000/api/posts/update/${this.props.my_match.params.id}/`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Token ${token}`,
            },
            body: JSON.stringify({
                "title": event.target.title.value,
                "content": event.target.content.value,
                "author" : 1 
            })//currently hard-coded to author 1 since there is no login Auth, we will change this when we add it
        })
        const data = await res.json()
        console.log(data)
    }

    render() {
        return (
            <form onSubmit={this.createComment} className="container border">
                <h1>Update Post</h1>
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <input type="text" className="form-control" name="Content" placeholder="Type comment here" />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
                
         
        )
    }
}
