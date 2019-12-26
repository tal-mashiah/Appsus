import eventBusService from "../../services/eventBusService.js";
import NoteTextModal from '../../notes/cmps/NoteTextModal.jsx';
import NoteImgModal from '../../notes/cmps/NoteImgModal.jsx';
import NoteTodosModal from '../../notes/cmps/NoteTodosModal.jsx'
import noteService from '../../notes/services/noteService.js'

export default class NoteModal extends React.Component {
    eventKiller = null;

    state = { display: false, note: null }

    componentDidMount() {
        this.eventKiller = eventBusService.on('showNoteModal', (note) => {
            this.setState({ display: true, note: note })
        });
    }

    componentWillUnmount() {
        this.eventKiller && this.eventKiller();
    }

    closeModal = () => {
        this.setState({ display: false })
    }

    editTxtNote = (txt,contentType) => {
        noteService.editNoteTxt(txt,contentType,this.state.note).then(note=>{
            this.setState({ note });
        })
        this.componentDidMount()
    }

    DynamicCmp = (note) => {
        switch (note.type) {

            case 'NoteText':
                return <NoteTextModal note={note} onCloseModal={this.closeModal} editTxtNote={this.editTxtNote}></NoteTextModal>
            case 'NoteImg':
                return <NoteImgModal note={note} onCloseModal={this.closeModal}></NoteImgModal>
            case 'NoteTodos':
                return <NoteTodosModal note={note} onCloseModal={this.closeModal}></NoteTodosModal>

            default:
                return //...some default error view
        }
    }

    render() {
        console.log(this.state.note)
        if (!this.state.display) return null;
        return <div>{this.DynamicCmp(this.state.note)}</div>
    }
}





//     render() {
//         let note = this.state.note;
//         if (!this.state.display) return null;
//         return <div className="note-modal-container"  >
//             <div>{note.info.title}</div>
//             <ul>
//                 {note.info.todos.map((todo, i) =>
//                     <li key={i}>
//                         <input type="checkbox" onChange={this.handleClick}></input> <span className={todo.isDone ? 'todo-done' : ''}>{todo.txt} - {new Date(todo.doneAt).toLocaleString()}</span>
//                     </li>)}
//             </ul>
//         </div >
//     }
// } 