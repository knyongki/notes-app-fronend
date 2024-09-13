import './styles/style.css';
import './script/components/index.js';
import Utils from './script/utils.js';
import home from './script/view/home.js';
import archived from './script/view/archived.js';
import NotesApi from '../src/script/data/remote/notes-api.js';
import noteDetail from './script/view/note-detail.js';
import Swal from 'sweetalert2';

document.addEventListener('DOMContentLoaded', () => {
  initializeEventListeners();
  loadHome();
});

function initializeEventListeners() {
  const addNoteButton = document.getElementById('addNoteButton');
  const noteModal = document.getElementById('noteModal');

  const openNoteModal = () => {
    noteModal.open();
  };

  const handleNoteAdded = async (event) => {
    const { title, content } = event.detail;
    const response = await NotesApi.insertNote(title, content);
    Swal.fire({
      icon: 'success',
      title: response,
      showConfirmButton: false,
      timer: 1500,
    });
    home();
  };

  if (!addNoteButton.dataset.listenerAdded) {
    addNoteButton.addEventListener('click', openNoteModal);
    addNoteButton.dataset.listenerAdded = 'true';
  }

  if (!noteModal.dataset.listenerAdded) {
    noteModal.addEventListener('note-added', handleNoteAdded);
    noteModal.dataset.listenerAdded = 'true';
  }
}

export function loadHome() {
  const noteListContainer = document.getElementById('noteListContainer');
  Utils.showElement(noteListContainer);

  const appBar = document.querySelector('app-bar');
  Utils.showElement(appBar);

  const addNoteButton = document.getElementById('addNoteButton');
  Utils.showElement(addNoteButton);

  const noteDetailContainer = document.getElementById('noteDetailContainer');
  Utils.hideElement(noteDetailContainer)

  home();
}

export function loadArchived() {
  const noteListContainer = document.getElementById('noteListContainer');
  Utils.showElement(noteListContainer);

  const appBar = document.querySelector('app-bar');
  Utils.showElement(appBar);
  
  const addNoteButton = document.getElementById('addNoteButton');
  Utils.hideElement(addNoteButton);
  const noteDetailContainer = document.getElementById('noteDetailContainer');
  Utils.hideElement(noteDetailContainer);

  archived();
}

export function lodaDetailNote(noteId) {
  const noteListContainer = document.querySelector('note-list');
  Utils.hideElement(noteListContainer);

  const appBar = document.querySelector('app-bar');
  Utils.hideElement(appBar);

  const addNoteButton = document.getElementById('addNoteButton');
  Utils.hideElement(addNoteButton);

  const noteDetailContainer = document.getElementById('noteDetailContainer');
  Utils.showElement(noteDetailContainer);

  noteDetail(noteId);
}
