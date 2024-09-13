import NotesApi from '../data/remote/notes-api.js';
import { loadArchived, loadHome } from '../../app.js';
import Swal from 'sweetalert2';
import Utils from '../utils.js';

const noteDetail = async (noteId) => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteLoadingElement = noteListContainerElement.querySelector('#note-loading');
  const noteDetailContainerElement = document.querySelector('#noteDetailContainer');

  Utils.showElement(noteLoadingElement);
  Utils.hideElement(noteDetailContainerElement);

  let note;

  try {
    note = await NotesApi.getSingleNote(noteId);

    const renderNoteDetail = (note) => {
      noteDetailContainerElement.innerHTML = `
      <div class="note-detail-page">
        <button id="backButton">X</button>
        <h2>${note.title}</h2>
        <p class="created-at">${note.createdAt}</p>
        <div class="action-button">
          <button id="archiveButton">${note.archived ? 'Unarchive' : 'Archive'}</button>
          <button id="deleteButton">Delete</button>
        </div>
        <p>${note.body}</p>
      </div>
    `;
    };

    renderNoteDetail(note);
  } catch (error) {
    console.error('Error fetching notes:', error);
    noteDetailContainerElement.innerHTML = '<p>Error loading notes. Please try again later.</p>';
  } finally {
    Utils.hideElement(noteLoadingElement);
    Utils.showElement(noteDetailContainerElement);
  }

  document.getElementById('backButton').addEventListener('click', () => {
    noteDetailContainerElement.innerHTML = '';
    if (note.archived == true) {
      loadArchived();
    } else {
      loadHome();
    }
  });

  document.getElementById('archiveButton').addEventListener('click', async () => {
    if (note.archived) {
      const response = await NotesApi.unarchiveNote(note.id);
      alertMessage(response);
    } else {
      const response = await NotesApi.archiveNote(note.id);
      alertMessage(response);
    }
    noteDetail(note.id);
  });

  document.getElementById('deleteButton').addEventListener('click', async () => {
    const response = await NotesApi.deleteNote(note.id);
    alertMessage(response);
    loadHome();
  });

  const alertMessage = (message) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  }
};

export default noteDetail;
