import noteContext from './noteContext';
import { useState } from 'react';
const NoteState=(props)=>{

const url="http://localhost:4000";


const [Notes, setNotes] = useState([]);


//fetch note
const fetchnotes = async () => {
  
  const response = await fetch(`${url}/api/notes/getuserinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
  });

  const json = await response.json();
  setNotes(json);
}


//add a note add a note add a note add a note add a note
const addNote= async (title,description,tag)=>
{ 
  const response = await fetch(`${url}/api/notes/addnotes`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "auth-token" : localStorage.getItem('token')
    },
  
    body: JSON.stringify({title,description,tag}),
  });
  const json = response.json(); 
  console.log(json);
  //todo api call
  const note= {
    "_id": "6528fa1befa55348365bc5d4",
    "user": "65277edd20bba98152d1eaa5",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2023-10-13T08:04:43.504Z",
    "__v": 0
  }
 setNotes(Notes.concat(note));
}

 
//delete a note //delete a note  //delete a note
const deleteNote= async (id)=>
{

  const response = await fetch(`${url}/api/notes/deleteNote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "auth-token" :localStorage.getItem('token')
    },
  
   
  });
  const json= response.json(); 

  console.log(json)
    console.log("delete it",id);
const Newnote=Notes.filter(  (note)=>{return note._id!==id;})

  setNotes(Newnote);
}


//Edit a note   //Edit a note  //Edit a note
const editNote = async (id, title, description, tag) => {
  
  const response = await fetch(`${url}/api/notes/updateNote/${id}`, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "auth-token" :localStorage.getItem('token')
    },
  
    body: JSON.stringify({title,description,tag}),
  });
  const json= response.json(); 
  console.log(json);
  
let newNotes=JSON.parse(JSON.stringify(Notes));

  // Update the local 'Notes' array
  for (let index = 0; index < newNotes.length; index++) {
    let element = newNotes[index];

    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }

  
  }
  setNotes(newNotes);
};

 
  return (
    <noteContext.Provider value={{Notes,setNotes,addNote,deleteNote,editNote,fetchnotes}}> 
    {props.children}
    </noteContext.Provider>
  )
}


export default NoteState;