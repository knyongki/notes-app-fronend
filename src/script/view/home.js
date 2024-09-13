import { lodaDetailNote } from '../../app.js';
import NotesApi from '../data/remote/notes-api.js';
import Utils from '../utils.js';

const home = async () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteLoadingElement = noteListContainerElement.querySelector('#note-loading');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  Utils.showElement(noteLoadingElement);
  Utils.hideElement(noteListElement);

  try {
    const notes = await NotesApi.getNotes();

    const renderNotes = (notes) => {
      noteListElement.innerHTML = '';

      if (notes.status === 'success') {
        notes.data.forEach((note) => {
          const noteItemElement = document.createElement('note-item');
          noteItemElement.note = note;
          noteListElement.appendChild(noteItemElement);
        });
      }
    };

    renderNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    noteListElement.innerHTML = '<p>Error loading notes. Please try again later.</p>';
  } finally {
    Utils.hideElement(noteLoadingElement);
    Utils.showElement(noteListElement);
  }

  noteListContainerElement.addEventListener('note-clicked', (event) => {
    const noteId = event.detail;
    lodaDetailNote(noteId);
  });
};

export default home;
