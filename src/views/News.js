import React, { Component } from 'react'
import NewsPost from '../components/NewsPost';

export default class News extends Component {
    constructor() {
        super();
        // console.log("I was created")
        this.state = {
            articles: []
        }
    }

    componentDidMount= ()=> {
        // console.log("I mounted!")
        this.getNews()
    }

    getNews = (topic) => {
        const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
        fetch(`https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    articles: data.articles
                })
            })
            .catch(error => console.log(error))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const topic = e.target.topic.value;
        e.target.topic.value='';
        this.getNews(topic)
    }

    render() {
        // console.log("I rendered")
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="input-group mb-3">
                    <input type="text" className="form-control" name="topic" placeholder="Search a topic.." aria-label="Search a topic" aria-describedby="button-addon2" />
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
                </form>

                <div className="row">
                    {this.state.articles.map((a, i) => <NewsPost article={a} key={i} />)}
                </div>
            </div>
        )
    }
}
