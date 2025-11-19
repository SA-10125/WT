import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import api from "../lib/axios.js"
import toast from 'react-hot-toast';

const NoteDetailPage = () => {

  const [note,setNote]=useState(null);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  
  const navigate=useNavigate //for redirection
  
  const {id} = useParams() //this is to get the id from the link (name of variable is id since link is "/notes/:id")
//get the note details from the thing and as the user keeps entering, keep updating the note accordingly (essnetially, real time update functionality)
  useEffect(()=>{ //get the notes
    const fetchNote = async()=>{
      try {
        const res= await api.get(`/notes/${id}`) //get the note from the backend.
        setNote(res.data) //we dont have to json parse since axios is chill like that 
      } catch (error) {
        console.log("Error fetching Note",error);
        toast.error("Failed to fetch note."); //not adding ratelimit check, you can add if you want im ded
      }
    }
  },[id])

  const handleDelete= async()=>{
    if(!window.confirm("Sure you wanna delete the note?")){return;} //if they say no, then return and dont delete anything
    try {
      await api.delete(`/mynotes/${id}`);
      setNotes((prev)=>prev.filter(note=>note._id!=id)) //set notes to all notes except the one that has been deleted (by filtering by id!=deletedID) 
      //the above line is so that the content refreshes and updates to reflect the deletion in the database.
      toast.success("Note deleted successfuly.");
    } catch (error) {
      console.log("Error deleting note",error);
      toast.error("Failed to delete note.");
    }}


  const handleSave=async()=>{
    if(!title.trim() || !content.trim()){toast.error("all fields are required");return;} //if someting missing, error and stop (trim meaning remove extra spaces on left and right)
    //if values are fine
    setSaving(true);
    try {
      await api.put(`/notes/${id}`,note) //put request to backend to update note.
      toast.success("Note updated successfully.")
      navigate("/") //send them back home

    } catch (error) {
      console.log("Error saving note",error)
      if(error.response.status==429){ //if rate limited
        toast.error("Slow down, youve been rate limited for changing notes too quickly.",{duration:4000,icon:"💀"}); 
      }
      else{toast.error("Failed to update note.");}
    }
    finally{setSaving(false)} //we are done saving regardless of wether it saved properly or not.
  }
  

  if(loading){
    return(<div>loading bro pls wait.</div>)
  }

  return ( //some cool UI idc im copy pasting.
    <div>
       <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title} //get the title
                  onChange={(e) => setNote({ ...note, title: e.target.value })} //if he changes the title from the loaded one, update note with setNote (idk what ...note is)
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content} //get the content
                  onChange={(e) => setNote({ ...note, content: e.target.value })} //if he changes the content from the loaded one, update note with setNote (idk what ...note is)
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}> {/* button disabled if we are in the saving state*/}
                  {saving ? "Saving..." : "Save Changes"} {/* if in saving state, show saving... else show save changes*/}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default NoteDetailPage
