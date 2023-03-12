const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
let db = require('../db/db.json')

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

// notes.delete('/:id', (req, res) => {
//     const deleteRequest = req.params.id;

//     // TALK TO ANTHONY
//     // TAKEN FROM https://stackoverflow.com/questions/65015000/how-do-i-use-express-js-app-delete-to-remove-a-specific-object-from-an-array
//     db = db.filter(({ id }) => id !== deleteRequest)

//     var json = JSON.stringify(db);

//     fs.writeFile('./db/db.json', json, err => {
//         if (err) {
//             console.error(err);
//         }
//         // file written successfully
//     });
// });

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