import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom'; // Need to import useParams to use the variable of the route /instagram/:postId <--variable




export default function SinglePost({ user, addToFavorites }) {
    const [redirect, setRedirect ] = useState(false)
    const { postId } = useParams() // useParams() gives us back a dictionary with the postId: '#'. Doing { postId } descructures the dictionary and we get back the number at that postId, because we are calling the postId key by it's name, so we get it's value


    const [post, setPost] = useState({}) // Sets the initial state (an empty dictionary). You render the empty dictionary with the return statement that contains your html (JSX), then it mounts with useEffect, which updates our state, so we re-render and show the post we asked for

    useEffect(async ()=>{ // useEffect mimics the mount step from rcc. useEffect takes in 2 things: a function, and a list of dependancies
        const res = await fetch(`http://127.0.0.1:5000/api/posts/${postId}`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        const data = await res.json();
        console.log(data)
        
        if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
            setPost(data.post)
        }
        else {
            setRedirect(true)
        }
    }, []) // <- our list of dependancies is as an empty list so it will only run once because nothing will ever change in it so we don't have to mount again. Just like in rcc, you only ever mount once
    
    return redirect? // syntax for if statements in JSX -> condition ? (resultIfTrue) : (resultIfFalse)
    (
        <Navigate to='/' />
    )
    :
    (
        
        // Note: all the class= need to be changed to className= when copying from html to JSX
        <>
        <div>
        <button onClick={()=>addToFavorites(post)}>Add To Favorites</button>
        <div className="card" style={{ width: '50rem' }}>
            <img src={post.image} className="card-img-top" alt={post.title} />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.caption}</p>
                <p className="card-text">{post.username}</p>
                <p className="card-text">{post.ingredient1}</p>
                <p className="card-text">{post.ingredient2}</p>
                <p className="card-text">{post.ingredient3}</p>
                <p className="card-text">{post.ingredient4}</p>
                <p className="card-text">{post.ingredient5}</p>
                <p className="card-text">{post.directions}</p>
            </div>
        </div>
        {
            post.user_id === user.id?
            <>
            <button color='primary' variant='contained'>Update</button>
            <button color='error' variant='contained'>Delete</button>
            </> :
            null
        }
        </div>
        </>

    )
}
