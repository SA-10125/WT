import React, { useState, useEffect } from 'react'
import RateLimitedui from '../components/RateLimitedui.jsx';
import NoteCard from '../components/NoteCard.jsx';
// import axios from 'axios'; //for the api calls to backend
import toast from 'react-hot-toast';
import api from "../lib/axios.js"
import NotesNotFound from "../components/NotesNotFound.jsx"

const HomePage = () => {
//Explanations:
  //states: represent dynamic (component specific) data
  //    when a state updates, react re-renders the component to maintain up to date alignment with the data and view
  //    (enables reactive UI updates without manual DOM manipulation)
  //    example:
        // function Counter() {
        //   const [count, setCount] = useState(0); //useState(0) initializes the value

        //   return (
        //     <button onClick={() => setCount(count + 1)}> //setCount triggers to re-render (component ig) and UI auto reflects new count
        //       Count: {count}
        //     </button>


  //use effects: manages side effects that arent UI related like API calls, listeners, timers, etc
  //  State → Triggers UI re-render
  //  useEffect → Triggers operational behavior after rendering
  //so use effect happens after the render, whatever functions should happen after UI renders
  //now you cant call functions like API calls etc while the UI is rendering 
  //cause at any point, what is being rendered needs to remain certain and predictable
  //so useEffect runs after the UI renders, then this might trigger UI to render again, which might 
  // trigger useEffect again and so on, hence everything might be constantly being refreshed by the JS (if the useEffect changes the state which calls that useEffect (like recursion sorta))
  // useEffect(() => {// do something here}, [dependencies]);
  // //here the function is what to do, the dependencies is what triggers the function to run.
  //theres 3 execution models of useEffect. 
  //  A. run on every render 
  //    useEffect(()=>{//blah}); //(rarely needed)
  //  B. run on first load (when first loaded)
  //    useEffect(()=>{//blah},[]); //(initial startup logics, connecting to things, etc)
  //  C. run whenever something changes
  //    useEffect(() => {console.log(`Count changed to: ${count}`);}, [count]);
  //    useEffect(() => {//blah}, [dependencies]); //runs when dependencies changes

  //example usage of State and useEffect:
  function Users() { //gets the users when program first runs and renders it.
    const [users, setUsers] = useState([]); //first, users are empty
    useEffect(() => { //when program first runs, i.e page first loads, fetch users from api call
      fetch("http://localhost:5001/api/users") //fetch returns a promise that resolves into a response object.
        .then(res => res.json()) //if call worked take response and calls the res.json() function (returns a promise)
        .then(data => setUsers(data)) //then once res.json()'s promise is resolved, the resolved value (here, data) and calls setUsers(data)
        .catch(err => console.error(err)); //if error when promise resolved, call console.log(error)
    }, []); // run only once when the component loads
    //(remember, each .then block reieves the resolved value of the previous, we could also say 
    // .then(blah => blah.json())
    // .then(blehuf => console.log(blehuf))
    //) (whatever var we give, is what is resolved after the promise)
    //here, setUsers is a state setter function created by useState (useState and useEffects are react hooks (A React hook is simply a built-in function that lets you add “React behavior” (state, lifecycle, logic sharing, etc.) inside a normal JavaScript function component.) 
    // Normal JavaScript variables do not trigger a UI update. a state does.)
    // in const [value, setValue] = useState(initialValue);, value is current state value and setValue is a function to update it.
    //so setUsers tells React: please re-render this component with a new value for the users state slot.
    // so instead of having users be a regular array and then .appending or anything (cause that wouldnt trigger js UI updates)
    // we use a react State and intiialize it to an empty array, then we load the new data into the array with setUsers(newArray) and this triggers UI update cause of how state works.

    return (<div> {users.map(u => <p key={u.id}>{u.name}</p>)} </div>);
  } //when react encounters functions, it runs them and the jsx in them is rendered. (funcs dont have to be called)
  //now when a state is updated, the function that the state is in, gets called again (to reload ALL the jsx's in it including ones that may be affected by the change)
  //function in jsx return a component. either a div or a button or smthn. (the states in the funcs are tied to that i.e when the state changes (when setValue is called, it schedules a re-render), the function is called again and that returned object reloads)

//end of explanation

  const [isRateLimited, setRateLimited] = useState(false); //is it ratelimited at any point? if it is, we need to show ratelimited content, else we dont
  const [notes, setNotes] = useState([]); //a state, initially an empty array (contains current notes)
  const [loading, setLoading] = useState(true) //loading state, set to initially true, (is it currently fetching stuff from backend or is it not?)
  // (above useState is set to initially true because) the moment we visit the homepage, we want to load/fetch the notes
  //the loading useState will be set to false once we are done loading. (and set to true when we start loading again)


//to fetch the notes:
  useEffect(()=>{
    const fetchNotes=async ()=>{
      try { //if we get notes, we setNotes(fetched notes)
        //heres how you do it with fetch
        // const res = await fetch("http://localhost:5001/api/mynotes"); //getting response from api (in json)
        // const data=await(res.json());
        // console.log(data)
        //heres how you do it with axios
        // const res=await axios.get("http://localhost:5001/api/mynotes");
        const res=await api.get("/mynotes"); //we dont have to type out full url cause we have created an axios instance with the base url in ../lib/axios.js
        //console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) { //error meaning either show rate limited content or show a error msg (using toast)
        console.log("Error fetching notes", error);
        if(error.response?.status === 429){ //if rate limited by backend api
          setRateLimited(true); //so now itll refresh the element in the DOM and that time, in the check ({isRateLimited && <RateLimitedui />} {/* if isRateLimited, return that component */}), it shows the ratelimited element
        }
        else{
          toast.error("Error fetching notes");
        }
      } finally{ //(wether notes fetched succesfully or not)
        setLoading(false); //since im done loading, its no longer loading so loading state is false 
      }
    }
    fetchNotes()
  },[])

//more explenations:
//  CORS: Cross-Origin Resources Sharing 
//  (its a browser security rule) (when a website tries to get data from an API or smthn, browser might block it for security reasons)
//  so rn we are at localhost:5173 and trying to load stuff from localhost:5001, so browser says first we need to make sure the api allows this
//  so now cd backend and ```npm install cors```
// so now im going to the backend and adding a middleware in server.js (app.use(cors()))




  return (
    <div className="min-h-screen">

      {isRateLimited && <RateLimitedui />} {/* if isRateLimited, return that component */}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* lets check the loading state, if not, show notes, if yes, show loading... 
        we also wanna see if we're rate limited, if not, show notes*/}
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div>} 
        
        {!loading && notes.length==0 && !isRateLimited && <NotesNotFound/>}
        {/* above line says if theres no notes and he is not ratelimited (unless loading, cause while loading, notes.length will be 0), just show a line that says no notes. */}

        {notes.length>0 && !isRateLimited && ( /* show title and content for all notes in a nice css way*/
          // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{notes.map(note=>(<div>{note.title} | {note.content} </div>))} </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (<NoteCard key={note._id} note={note} setNotes={setNotes} />))}
            {/* when a note is deleted, we want the notes to refresh/update again. hence we are passing 
            the setNotes function to the NoteCard. */}
          {/* a component that we create is loaded for each note (in this grid manner thanks to the inline tailwind css) */}
        </div>
        )}
    </div>
    </div>
  )
}

export default HomePage
