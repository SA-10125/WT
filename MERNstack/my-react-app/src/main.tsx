// import React from 'react';
// import ReactDOM from "react-dom/client";

// const element=(
//   <div>
//   <h2>Hello</h2>
//   <p>2+2={2+2}</p>
//   <Inlinestyle />
//   </div>
// );

// cd MERNstack
// cd my-react-app
// Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
// npm run dev

// ReactDOM.createRoot(document.getElementById('root')!).render(element); 
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
// function Inlinestyle(){
//   return(
//   <div>
//     <p style={{color:'red'}}> Para 1</p>
//     <h2> Heading 2</h2>
//   </div>);
// }
// ReactDOM.createRoot(document.getElementById('root')).render(element); 


//I missed a couple classes. please learn this jazz ;-;
//this is the stuff i missed in the exam also.

//Complex components:
//combining components to make complex components.
//advantage is composability/compactness/reusability.
//approach: identify the major visual elements and break them into induvidual componeents.
//zoned out until transfer properteis. do do. 
//transferPropsTo is deprecated. use spread operator {...props} instead and values can be given explicitly.
//export, import, writing explicitly, look into.

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';

// function SrchResult(){
//  return(
//  <div>
//  <ResImage/>
//  <ResCaption/>
//  <ResLink/>
//  </div>);
// }

// function ResImage(){
//  return(
//  <div>
//  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png" alt="image bro."/>
//  </div>);
// }

// function ResCaption(){
//  return(
//  <div>
//  <p>Caption bro.</p>
//  </div>);
// }

// function ResLink(){
//  return(
//  <div>
//  <a href="https://doodles.google/" target="_blank" rel="noreferrer"> Link bro. </a>
//  </div>);
// }

// ReactDOM.createRoot(document.getElementById('root')).render(<SrchResult/>);

//this is a complex component made of smaller components.
//we can reuse these smaller components in other complex components also.
//we can also pass props to these components to make them more dynamic.
//like we can pass the image url, caption text, link url as props to the respective components.
//then we can use these components to create different search results with different data.
//this is the power of components and props in react.
//we can create a library of reusable components and use them to build complex UIs easily.
//we can also use third party component libraries like material UI, ant design etc to get pre-built components.

//look into keyword props. its supposed to have been done before.

//here tho links and images are static. so we cant make templates out of it. This is the limitation of using static values like this.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Result({src,text,link,linktext}){
  return(
    <div>
      <Img src={src} />
      <Caption text={text} />
      <Link link={link} linktext={linktext} />
    </div>
  )
}

function Img({src}){
  return(
    <div>
      <img src={src} alt="image bro."/>
    </div>
  )
}

function Caption({text}){
  return(
    <div>
      <p>{text}</p>
    </div>
  )
}

function Link({link, linktext}){
  return(
    <div>
      <a href={link} target="_blank" rel="noreferrer">{linktext}</a>
    </div>
  )
}

//since we are passing parameters to Result, we cant directly render it. we use another App function to pass the vallues and render result.
function App(){
  return(
    <div>
      <Result
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png"
        text="Caption sis."
        link="https://doodles.google/"
        linktext="Link sis."
      />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);

//map functions exists in JS on arrays. 
//each element in an array can be mapped to a new value which can be a primitive, object or even a react component.
const nums=[1,2,3,4,5]
const doubled=nums.map((number)=>number*2);
console.log(doubled); // [2,4,6,8,10]
//look into keys, how it helps react identify elements in virtual DOM, array index as key, why not to use index as key etc. I missed.
//adding key property, etc etc i missed, pls do.

function NumberList(props){
  const numbers=props.numbers;
  const listItems=numbers.map((num)=>(<li key={num.toString()}>{num*2}</li>));
  return <ul>{listItems}</ul>;
}
const nums2=[1,2,3,4,5];

ReactDOM.createRoot(document.getElementById('root')).render(<NumberList numbers={nums2}/>);
//ive just written this using copilot, im yet to learn or und it. pls do.

//i missed that full keys class atp.

//synthetic events is almost identical to DOM events. it is used for event handling in react.
//uses object called cross browser wrapper (not dependent on any particular browser. provides consistency across all browsers.)
//prevent default and stop propogation look into.

//you pass a function as the event handler.
// <button onClick={handleClick}>Click me</button>
//DOM events use lowercase. React events use camelCase.
//bubbles, cancelable, currentTarget, defaultPrevented, eventPhase, isTrusted, isTrusted, nativeEvent, type, etc. (slides)
//do the counter example.
