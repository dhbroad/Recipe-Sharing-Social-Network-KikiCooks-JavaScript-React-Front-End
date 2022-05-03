import React, { Component } from 'react'
import Article from '../components/Article';

export default class News extends Component {
    constructor(){ // constructing is setting up the initial state 
        super(); // when we inherit (extend) from another class, in this case "Component" we have to run the constructor of that as well, using super();
        this.state = { // setting the initial state (When in a class component (RCC) we have to use this.parameterName to define variables)
            articles: [] // This is empty, because at the initial state, there are no articles to show, but then we do a "fetch" down below and update the state. so articles will re-render
        }
    }

    componentDidMount = async () => { // has to be an asynchronous function, because we are fetching data and waiting for the response
        // if you are working with a free api, it is important to comment out your fetch command when writing out your code for the first time, so you don't reach your daily limit of data calls
        const res = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=4ba2cb57066b49e2b7a8f20f5e0f65c6`);
        const data = await res.json(); // json() converts the response "res" into data that we can work with
        console.log(data)
        const myArticles = data.articles // "articles" is an existing key in the dictionary we got from our fetch. We knew this because we console logged the data to see how it was structured
        //and then we assigned the data that's inside the articles key to a variable called myArticles, that we can use below. This key is not the same key from above called "articles" as well
        this.setState({ // This will update the state and trigger the re-render
            articles: myArticles // we are referencing our own key, also called articles, and assigning the "myArticles" data we just got from our fetch
        })
    }

    render() {
        console.log(this.state.articles)
        return (
            <div className='row justify-content-around'> {/* justify-content-around divides the space on the page and distributes it between the object on the page */}
                {/* Note again, we can not do for loops in JSX, but we can still use .map() */}
                {this.state.articles.map((a, i)=><Article key={i} article={a}/>)} {/* passing in each article as a prop into our Article.js component and each needs a unique key, so we are using the index */}
                {/* instead of writing out the full html of a card for each item in our articles, we created a new component called "Article.js" where we put the html*/}
                
            </div>
        )
    }
}
