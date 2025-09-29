import React from 'react';
import ReactDOM from "react-dom/client";

const element=(
  <div>
  <h2>Hello</h2>
  <p>2+2={2+2}</p>
  <Inlinestyle />
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(element); 
//what this does: it creates a root and renders the element inside the root 
//needed because in react we dont have direct access to the DOM
//we use a virtual DOM and react takes care of updating the real DOM
//we can only access the real DOM through the root
//we can only have one root in a react app
//we can have multiple elements inside the root

//now create an index.html file inside src
//now see App.tsx


//JSX: JavaScript XML
//is a special syntax that allows us to write HTML-like code inside JavaScript
//it looks like HTML but its JSX syntax extension. ppl like it cause its more consice than using HTML and JS seperately.
//JSX code is compiled/transformed to regular JS code by a tool called Babel
//see slides pls

//rules for converting HTML to JSX:
//there should be a single root element inside which you can place all your elements.
  //in this case, div. can also use section or anything really. essentially there should be only one element that the react can use to start.
  //if you want, use a react fragment <> </> instead as your single root element.
//close all tags.
//use camelCase for attribute names

//use className instead of class
//use htmlFor instead of for

//see embedding expressions in JSX (see slides full.)
//you can use any JS expression inside JSX by wrapping it in curly braces {} in JSX
//look into what that constant element is.
//can try instead of the element we have used:
  //const name="John"
  //const element=<h1>Hello, {name}</h1>
  //ReactDOM.createRoot(document.getElementById('root')).render(element);

//also
  //const root=ReactDOM.createRoot(document.getElementById('root'));
  //root.render(element);
//can also do it like this. but the one we used is more concise instead of chumma assigning variable.
//render means read.

//event handling and forms will be done in U3. (its there in slides tho)
//(wont get Qs in exam for U2)

//see JSX rendering in slides.

//JQuery and webworks etc are not there in syllabus but there might be some pics of them in slides. can ignore.

//I missed 1 hour. till styling. missed missed event stuff and buttons and all. pls do! imp!

/*look into component scope styling. */
/* <div style={{color:'red'}}> inline styling.</div> */

//tailwind css omg!
//chakra it seems. 

//hooks+CSS 
function Inlinestyle(){
  return(
  <div>
    <p style={{color:'red'}}> Para 1</p>
    <h2> Heading 2</h2>
  </div>);
}
ReactDOM.createRoot(document.getElementById('root')).render(element); 