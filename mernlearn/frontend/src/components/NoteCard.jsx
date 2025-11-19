import React from 'react'
import { Link } from 'react-router-dom'
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import {formatDate} from "../lib/utils.js"
import api from "../lib/axios.js"

const NoteCard = ({note, onDelete, setNotes}) => {

  const handleDelete = async(e,id)=>{ //e here stands for event
    e.preventDefault(); //here, since the button is in the <Link>, so the default behaviour is redirecting to `/note/${note._id}`
    //so prevent default prevents that when delete button clicked.
    if(!window.confirm("Sure you wanna delete the note?")){return;} //if they say no, then return and dont delete anything
    try {
      await api.delete(`/mynotes/${id}`);
      setNotes((prev)=>prev.filter(note=>note._id!=id)) //set notes to all notes except the one that has been deleted (by filtering by id!=deletedID) 
      //the above line is so that the content refreshes and updates to reflect the deletion in the database.
      toast.success("Note deleted successfuly.");
    } catch (error) {
      console.log("Error deleting note",error);
      toast.error("Failed to delete note.");
    }
  }

  return (
    //notice the to is a dynamic link to the NoteDetailPage of that id of note
    <Link to={`/note/${note._id}`} 
     className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"> 
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button className="btn btn-ghost btn-xs text-error" onClick={(e)=>handleDelete(e,note._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NoteCard
