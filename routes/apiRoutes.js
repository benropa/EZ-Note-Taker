// setting up dependencies
const express = require('express');
const router = express.Router();

// class object for database
const db = require('../db/databaseClass');

// generating random id
const uuid = require('uuid');

const notes = require('../db/db.json');

// set up to get notes
router.get('/api/notes', async function (req, res) {
    const notes = await db.readNotes();
    res.json(notes);
});

// Code to add a note to the db.json file
router.post('/api/notes', async function (req, res) {
    const currentNotes = await db.readNotes();
    let newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text,
    };

    await db.addNote([...currentNotes, newNote]);

    return res.send(newNote);
});

// code needed to delete files
router.delete('/api/notes/:id', async function (req, res) {
    //delete note by id
    const noteToDelete = req.params.id;

    const currentNotes = await db.readNotes();

    //generates a new array without deleted notes
    const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);
    // display
    await db.deleteNote(newNoteData);

    return res.send(newNoteData);
});

module.exports = router;

