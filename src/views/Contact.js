import React, { useState, useEffect } from 'react'; // Don't need to import from Component like when we use rcc, but we do need useState and useEffect hooks to mimic rcc using rfc (react functional components)

const Contact = () => {

    const [age, setAge] = useState(1) // The initial state for an rfc is whatever is in the parenthesis of useState(). It always returns the actual state (the variable that will set that state) and the function to update the state
    // age is what we are defining as our initial state and is immutable. setAge is a function we will create to update our state

    // In order to have multiple variables, we need to set another state
    const [name, setName] = useState('A Site By David Broadwater') //The initial state can also be a function: useState(() => {bodyOfFunctionGoesInHere}) which is helpful if the thing you are returning takes a minute to compute, so it doesn't have to compute it every time it re-renders



    useEffect(()=>{ // For now, we are solely using the useEffect method to mimic our mounting effect from rcc
        // useEffect takes in a function and an array. The function is a callback function and will run anytime something in the array changes
        console.log('i have mounted')}
        , [])


    return ( // In RFC, we don't have a render() method. What gets rendered is whatever gets returned
        <div>
            {console.log('i have rendered')}
            <h1>{name}</h1> {/* name is just a variable in this case, so we don't have to do this.state.name like in rcc */}
            {/* <h1>{age}</h1> */}
            {/* <button onClick={()=>setAge(age+1)}>+</button>
            <button onClick={()=>setName(name+'ha')}>+</button> You can add text (concatenate) to an existing string */}
        </div>
    )
};
export default Contact;