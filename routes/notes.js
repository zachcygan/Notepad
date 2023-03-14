const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { readAndAppend, readFromFile, readAndDelete } = require('../helpers/fsUtils');


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

notes.delete('/:id', (req, res) => {
    const deleteRequest = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            
            parsedData.forEach((note, i) => {
                if (deleteRequest === note.id) {
                    parsedData.splice(i, 1);
                }
            })

            let json = JSON.stringify(parsedData, null, 2);

            fs.writeFile('./db/db.json', json, err => {
                if (err) {
                    console.error(err);
                    res.status(500).send(err)
                } else {
                    console.log('❌Delete request handled❌')
                    res.status(200).send('successful deletion')
                }
            })
        }
    });    
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