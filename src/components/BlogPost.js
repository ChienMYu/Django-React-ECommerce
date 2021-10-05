import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class BlogPost extends Component {

    render() {
        const p = this.props.post 
        return (
            <div className="card col-8 mb-3">
                <h5 className="card-header">
                    <Link to = {`/blog/${p.id}`}>{p.title}</Link>
                </h5>
                <div className="card-body">
                    <h5 className="card-title">{p.content}</h5>
                    <p className="card-text">By {p.author} on {p.date_posted}</p>
                </div>
            </div>

        )
    }
}
