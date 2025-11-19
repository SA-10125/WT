import React from 'react'
import { ArrowLeftIcon } from "lucide-react";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
// import axios from 'axios';
import api from "../lib/axios.js" //since we have created axios instance in there with the baseURL anyways (so we dont have to type out the URL everytime)

const CreatePage = () => {

  const [title, setTitle] = useState(""); //to keep track of user inputs
  const [content, setContent] = useState(""); //to keep track of user inputs
  const [loading, setLoading] = useState(false)

  const navigate=useNavigate() //comes from react-router

  //now that weve build ui, lets build this func
  const handleSubmit= async (e)=>{ //e stands for event
    e.preventDefault(); //dont refresh/reload page on submit
    // console.log(title);
    // console.log(content);
    //we wanna send a post request to the api saying bro make this note and catch the response it gives.
    if(!title.trim() || !content.trim()){toast.error("all fields are required");return;} //if someting missing, error and stop (trim meaning remove extra spaces on left and right)
    //if values are fine

    setLoading(true) //now were communicating with backend so loading until we are done communicating
    try {
      // await axios.post("http://localhost:5001/api/mynotes",{title:title,content:content}); 
      //instead of typing this whole line above everytime, we can create an axios instance in the lib folder in axios.js
      await api.post("/mynotes",{title:title,content:content});
      toast.success("Note created successfully.");
      navigate("/") //send him back to Homepage
    } catch (error) {
      console.log("Error creating note", error)
      if(error.response.status==429){ //if rate limited
        toast.error("Slow down, youve been rate limited for creating notes too quickly.",{duration:4000,icon:"💀"}); 
      }
      else{toast.error("Failed to create note.");}
      
    }
    setLoading(false) //were done communicating with backend so loading no longer true
  }

//ui jazz including form (which calls setTitle and setContent and calls handleSubmit when submitted)
  return (
     <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title} //take title
                    onChange={(e) => setTitle(e.target.value)} //e stands for event (a variable) (says get value from the form and setTitle)
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content} //take content
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="card-actions justify-end">
                    <button type="submit" className="btn btn-primary" disabled={loading}> {/* if loading, disable the submit button, else enable it */}
                    {loading ? "Creating..." : "Create Note"} {/* if loading, say loading... */}
                  </button>
                  </div>
                </div>
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
