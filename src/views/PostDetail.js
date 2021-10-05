import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default class PostDetail extends Component {
    constructor() {
        super();
        this.state = {
            post: {},
            redirect: null,
            comments: [],
            likes: null
        }
    }

    componentDidMount = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/posts/${this.props.my_match.params.id}/`)
        const data = await res.json()
        this.setState(
            { post: data }
        )
        this.getComments()
        this.getLikes()
    }

    getLikes = async()=>{
        const res = await fetch(`http://127.0.0.1:8000/api/posts/${this.props.my_match.params.id}/likes/`)
        const data = await res.json()
        console.log(data)
        this.setState(
            {likes: data}
        )
    }

    getComments = async () => {
        const res = await fetch(`http://127.0.0.1:8000/api/posts/${this.props.my_match.params.id}/comment/`)
        const data = await res.json()
        this.setState(
            { comments: data }
        )
    }

    removeComments = async (c_id) => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await fetch(`http://127.0.0.1:8000/api/posts/${this.props.my_match.params.id}/comment/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            body: JSON.stringify({
                comment_id: c_id,
              })
        });
        const data = await res.json()
        console.log(data)

    }

    likePost = async() => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await fetch(`http://127.0.0.1:8000/api/posts/${this.props.my_match.params.id}/like/`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
        });
        const data = await res.json()
        console.log(data)
    }

    getCommentList = (cart) => {
        let uniqueCart = [];

        for (let item of cart) {
            uniqueCart.push(item);
        }
        return uniqueCart
    }

    handleDelete = async () => {
        const token = JSON.parse(localStorage.getItem('user')).token;
        const res = await fetch(`http://127.0.0.1:8000/api/posts/delete/${this.props.my_match.params.id}/`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,
            },
            
        })
        const data = await res.json()
        console.log(data)
        this.setState({ redirect: true })

    }

    render() {
        const p = this.state.post
        if (this.state.redirect) {
            return <Redirect to='/blog' />
        }
        return (
            <div className="card col-8 mb-3">
                <h5 className="card-header">{p.title}</h5>
                <div className="card-body">
                    <h5 className="card-title">{p.content}</h5>
                    <p className="card-text">By {p.author} on {p.date_posted}</p>
                    <p className="text-end"><b>Likes:</b> {this.state.likes}</p>
                </div>
                <div className="container">

                    <Link to={`/blog/update/${p.id}`} className="btn btn-secondary">Update</Link>
                    <Link to={`/blog/${p.id}/comment/add`} className="btn btn-primary">Add Comment</Link>
                    


                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Delete
                    </button>
                    <button type="button" onClick={()=>this.likePost()} className="btn btn-info">Like</button>


                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Delete Post - Are you sure?</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    This action cannot be reversed. Are you sure you want to delete?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" onClick={() => this.handleDelete()} data-bs-dismiss="modal" className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="text-end container">
                    <h1>Comments</h1>
                    {(this.state.comments).map(comment => (
                        <div key={comment.id} className="d-flex justify-content-end">
                            <div className="">
                                <p>{comment.content} by {comment.user}</p>
                            </div>
                            <div className="px-3">
                                <button type="button" onClick={() => this.removeComments(comment.id)}className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
