import React, { useState, useEffect } from 'react';
import FavoritePost from '../components/FavoritePost';
import { Navigate, useParams } from 'react-router-dom';

export default function SearchResults() {
    const [redirect, setRedirect ] = useState(false)
    const { searchInput } = useParams()


    const [state, setState] = useState({
        posts: [],
        users: []
      })
    
      useEffect(async () => { // useEffect mimics the mount step from rcc. useEffect takes in 2 things: a function, and a list of dependancies
        const res = await fetch(`http://127.0.0.1:5000/api/search/${searchInput}`); // Anytime you want to fetch from Flask, you have to create an API endpoint in your Flask's route.py under the corresponding template directory
        const data = await res.json();
        console.log(data)
    
        if (data.status === 'ok') { // status is a key in the dictionary we are returning from fetching our Flask data. In Flask, we made an if statement that if there was no post, the value of our key status is "not ok", else "ok"
          const postResults = data.posts
          const userResults = data.users
            setState({
                posts: postResults,
                users: userResults
            })
        }
        else {
            setRedirect(true)
        }
        
      }, []) 
  
    return redirect? (
        <Navigate to='/failed-search' />
    )
    :
    (
        <>
        <h1>Search Results for: {searchInput} </h1>
        <div>
            <h3>Users</h3>
            {state.users.map((u, i) => <Post key={i} users={u}  user={user} addToFavorites={addToFavorites} />)}
        </div>
        <div className='justify-content-around' >
        <h1 style={{position:'relative'}}>{username}'s Profile</h1>
        {state.posts.map((p, i) => <Post key={i} post={p}  user={user} addToFavorites={addToFavorites} />)}
      </div>
      </>
  )
}
