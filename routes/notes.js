const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');


notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.get('/:id', (req, res) => {
    const requestedId = req.params.id;
  
    if (requestedId) {
        for(let i = 0; i < db.length; i++) {
            const currentId = db[i].id;
            if (requestedId === currentId) {
                return res.json(db[i])
            }
        }
    }

    return res.json('No id Found')
});

notes.delete('/:id', async (req, res) => {
    let db = require('../db/db.json');
    
    const deleteRequest = req.params.id;
    console.log(deleteRequest)

    db.forEach((note, i) => {
        if (deleteRequest === note.id) {
            db.splice(i, 1)
        }
    })

    let json = JSON.stringify(db, null, 2);

    fs.writeFile('./db/db.json', json, err => {
        if (err) {
            console.error(err);
            res.status(500).send(err)
        } else {
            console.log('Deleted request handled')
            res.status(200).send('successful deletion')
        }
    })

});

notes.post('/', (req, res) => {
    console.log(req.body);
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const note = {
            status: 'success',
            body: newNote,
        };

        res.json(note);
    } else {
        res.json('Error in saving note');
    }
});

module.exports = notes;