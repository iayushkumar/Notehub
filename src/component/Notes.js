import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Notesitem from './Notesitem';
import Addnote from './Addnote';
import { useNavigate} from "react-router-dom"; 

export default function Notes() {
  const first = useContext(noteContext);
  const { Notes, fetchnotes,editNote} = first;
  const navigate = useNavigate();

  const [Note, setNote] = useState({ id:'', etitle: '', edescription: '', etag: '' });

  useEffect(() => {
  if(localStorage.getItem('token'))
  {
    console.log(localStorage.getItem('token'));
    fetchnotes();
  }
   else
   {
   navigate('/Login')
   }

       // eslint-disable-next-line
  }, []);


  const ref = useRef(null);
  const refclose = useRef(null);

  const updatenote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description, etag:currentnote.tag});
    // Implement your update logic here
    // You might want to open the modal for editing, for example.
  }



  const handleonclick = (e) => {
    e.preventDefault();
    ref.current.click();

    editNote(Note.id,Note.etitle,Note.edescription,Note.etag);
  }

  const onchange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  }

  return (
    <div className="row my-3 mx-2">
      <Addnote />
      <h2>Your Notes:</h2>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Enter Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={Note.etitle} aria-describedby="emailHelp" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" value={Note.edescription} name="edescription" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" value={Note.etag} name="etag" onChange={onchange} />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button refClose={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={Note.etitle.length<5||Note.edescription.length<5} type="button" onClick={handleonclick} className="btn btn-primary">update Note</button>
            </div>
          </div>
        </div>
      </div>



      {Array.isArray(Notes) ? (
        Notes.map((Note) => (
          <Notesitem key={Note.id} updatenote={updatenote} note={Note} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
