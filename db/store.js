const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

// uuidv4(); ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

const readFileAsync = util.promisify(fs.readFile);

const readAll = () => {
    let file = readFileAsync('db/db.json', 'utf-8')
    // console.log(file)
    return file;
}

const store = {

    returnAll: function() {
        return readAll().then((notes) => {
            // console.log(notes)
            let parsedNotes = [];

            try {
                parsedNotes = parsedNotes.concat(JSON.parse(notes));
            } catch(err) {
                parsedNotes = [];
                console.log(err)
            }

            console.log(parsedNotes)
            return parsedNotes;
        });
    }

}

module.exports = store;