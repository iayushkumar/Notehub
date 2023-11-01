const express = require('express');
const router = express.Router();
const notes = require('../models/Notes');
const fetchuser = require('../middleware/middleware');
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');


// Route 1 for fetching notes form the user
router.get('/getuserinfo', fetchuser, async (req, res) => {
  try {
    // Assuming that you are using user details from the authenticated user (req.User)
    const userNotes = await notes.find({ user: req.User.id });

    console.log(req.User.id);
    res.json(userNotes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


//Route 2 for adding notes to the user

router.post('/addnotes',[
body('title','check email').exists() ,
body('description','your password is empty').isLength({ min: 5 }) ],fetchuser,async (req,res)=>
{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {title,description,tag}=req.body;

  try {

    const  note= await notes.create({
      title,
      description,
      tag,
      user:req.User.id
  });
    
  res.json(note);


  } catch (error) {
    
    res.status(500).json({ error: "Internal server error. Please try again later." });
    
  }
})


//update note 

router.put('/updateNote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};

  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

 
  let note = await notes.findById(req.params.id);
  try{
   
    // console.log(note);
  
    if (!note) {
      return res.status(404).send("Not found");
    }
  

    if (note.user.toString() !== req.User.id) {
      return res.status(401).send("Not Allowed");
    }
    const updatedNote = await notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    res.json( {updatedNote} );
  }
  catch(error)
  {
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }


});



router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
   
  let note = await notes.findById(req.params.id);
  try{
   
    if (!note) {
      return res.status(404).send("Not found");
    }
  

    if (note.user.toString() !== req.User.id) {
      return res.status(401).send("Not Allowed");
    }
    const updatedNote = await notes.findByIdAndDelete(req.params.id);

    res.json( {updatedNote} );
  }
  catch(error)
  {
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }


});

















module.exports=router;