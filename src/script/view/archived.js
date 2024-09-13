import NotesApi from '../data/remote/notes-api.js';
import Utils from '../utils.js';

const archived = async () => {
  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteLoadingElement = noteListContainerElement.querySelector('#note-loading');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  Utils.showElement(noteLoadingElement);
  Utils.hideElement(noteListElement);

  try {
    const archivedNotes = await NotesApi.getArchved();

    const renderArchivedNotes = (archivedNotes) => {
      noteListElement.innerHTML = '';

      if (archivedNotes.status == 'success') {
        archivedNotes.data.forEach((note) => {
          const noteItemElement = document.createElement('note-item');
          noteItemElement.note = note;
          noteListElement.appendChild(noteItemElement);
        });
      }
    };

    renderArchivedNotes(archivedNotes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    noteListElement.innerHTML = '<p>Error loading notes. Please try again later.</p>';
  } finally {
    Utils.hideElement(noteLoadingElement);
    Utils.showElement(noteListElement);
  }
};

export default archived;
