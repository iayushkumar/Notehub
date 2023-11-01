import React from 'react';
import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitem from "./Notesitem";


export default function Addnote() {
    const first = useContext(noteContext);
    const { addNote } = first;

    const [Notes, setNotes] = useState({ title: "", description: "", tag: "" });

    const handleonclick = (e) => {
        e.preventDefault();
        addNote(Notes.title,Notes.description,Notes.tag)
        setNotes({title: "", description: "", tag: ""})
    }


    const onchange = (e) => {
        setNotes({ ...Notes, [e.target.name]: e.target.value })

    }
    return (

        <div className='container my-3'>
            <h2>Enter your Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Enter Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={Notes.title} onChange={onchange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={Notes.description} onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag"  value={Notes.tag} onChange={onchange} />
                </div>

                <button disabled={Notes.title.length<5||Notes.description.length<5} type="submit" className="btn btn-primary" onClick={handleonclick}>Add Note</button>
            </form>

        </div>

    )
}
