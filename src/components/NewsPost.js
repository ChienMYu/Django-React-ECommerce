import React, { Component } from 'react'

export default class NewsPost extends Component {
    render() {
        const a = this.props.article;
        return (
            <a className="col-12 col-lg-4 col-md-6 text-decoration-none text-dark" href={a.url} target="_blank" rel="noreferrer">
                <div className="card">
                    <img src={a.urlToImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{a.title}</h5>
                        <p className="card-text">{a.description}</p>
                        <p className="card-text">{a.source.name} - By {a.author}</p>
                        
                    </div>
                </div>
            </a>
        )
    }
}
