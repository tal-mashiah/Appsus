'use strict'
import storageService from '../../services/storageService.js'

export default {
    getNotes,
    getNoteById,
    editNoteTxt
}

let gNotes = [
    {
        id:1,
        type: "NoteText",
        isPinned: true,
        info: {
            title: "You can Do this!",
            txt: "Do not be afraid of fear"
        }
    },
    {
        id:2,
        type: "NoteImg",
        info: {
            url: "https://media-cdn.tripadvisor.com/media/photo-s/0e/37/31/3b/mount-kilimanjaro-view.jpg",
            title: "Nice view from the kilimanjaro",
            txt: "That trip was fucking amazing!"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id:3,
        type: "NoteTodos",
        info: {
            title: "To do list",
            todos: [
                { txt: "Go buy some milk", doneAt: 1577232800513, isDone: false },
                { txt: "Visit your grandma", doneAt: 1577289500513, isDone: true }
            ]
        }
    },
    {
        id:1,
        type: "NoteText",
        isPinned: true,
        info: {
            title: "Credit card pin code:",
            txt: "5792"
        }
    },
    {
        id:2,
        type: "NoteImg",
        info: {
            url: "https://qph.fs.quoracdn.net/main-qimg-225232d1b893f689e7d24ad42e6a0de7",
            title: "Itachi and Sasuke",
            txt: "Best moment in naruto"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id:3,
        type: "NoteTodos",
        info: {
            title: "Things to do each day:",
            todos: [
                { txt: "Eat a Banana", doneAt: 1577289800513, isDone: false },
                { txt: "Go to the gym", doneAt: 1577281200513, isDone: true }
            ]
        }
    }
];

function getNotes() {
    if (storageService.load('notes')) {
        gNotes = storageService.load('notes');
    } else {
        storageService.store('notes', gNotes);
    }
    return Promise.resolve([...gNotes]);
}

function editNoteTxt(txt,contentType,note) {
    let copyNote = JSON.parse(JSON.stringify(note));
    copyNote.info[contentType] = txt;
    gNotes = gNotes.map(note => copyNote.id === note.id ? copyNote : note);
    storageService.store('emails', gNotes);
    return Promise.resolve(copyNote);
}

function getNoteById(NoteId) {
    if (storageService.load('notes')) gNotes = storageService.load('notes');
    const note = gNotes.find(note => note.id == NoteId);
    return Promise.resolve(note);
}