import React, { Component } from 'react'

export default class Article extends Component {
    // instead of writing out the full html of a card for each article in News.js, we created this component file, "Article.js" where we put the html
    render() {
        const a = this.props.article // assigning this.props.article to "a" so we don't have to type the full route every time we call it below
        return (
            // the first <a> tag was originally a <div>, but in order to make the entire article card a clickable link, we changed it to an <a>
            <a href={a.url} target='_blank' className="card text-decoration-none text-dark mb-3" style={{ width: '18rem', }}> {/* style has to be a dictionary in JSX 
            Class mb-3 stands for margin bottom 3 */}
                <img src={a.urlToImage} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{a.title}</h5>
                    <h6>{a.author ? a.author : 'unknown'} - {a.source.name}</h6> {/* JSX does uses ternary operators in place if statements in the form of - condition ? trueResult : falseResult */}
                    <p className="card-text">{a.description}</p>
                </div>
            </a>
        )
    }
}
