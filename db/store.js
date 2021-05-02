const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

// uuidv4(); ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const readAll = () => {
    let file = readFileAsync('db/db.json', 'utf-8')
    // console.log(file)
    return file;
}

const writeNewFile = body => {
    return writeFileAsync('db/db.json', JSON.stringify(body));
}

const returnAll = () => {
    return readAll().then((notes) => {
        // console.log(notes)
        let parsedNotes = [];

        try {
            parsedNotes = parsedNotes.concat(JSON.parse(notes));
        } catch(err) {
            parsedNotes = [];
            console.log(err)
        }

        // console.log(parsedNotes)
        return parsedNotes;
    });
}

const createNote = note => {
    if (note.title === "" || note.text === "") {
        return ('Note title and text are blank')
    };

    let newNote = { ...note, id: uuidv4() };
    return returnAll()
        .then(notes => {
            return [ ...notes, newNote ];
        })
        .then(newArray => {
            writeNewFile(newArray)
        })
        .then(() => {
            return newNote;
        })
}

const deleteOne = (id) => {
    
    return returnAll()
        .then(notes => {
            return notes.filter(note => {
                return note.id !== id
            });
        })
        .then(newArray => {
            writeNewFile(newArray)
        })
        // .then(location.reload())
}

module.exports = {
    readAll: readAll,
    writeNewFile: writeNewFile,
    returnAll: returnAll,
    createNote: createNote,
    deleteOne: deleteOne
}