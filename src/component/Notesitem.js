import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export default function NotesItem(props) {
  const { note,updatenote } = props;
  const first = useContext(noteContext);
  const { deleteNote } = first;

  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-pen-to-square mx-2"
            onClick={() =>updatenote(note) }></i>
            <i className="fa-sharp fa-solid fa-trash mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
