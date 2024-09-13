class NoteModal extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');

    this.render();
  }

  connectedCallback() {
    this._shadowRoot.querySelector('#closeModal').addEventListener('click', () => {
      this.close();
    });

    this._shadowRoot.querySelector('#noteForm').addEventListener('submit', (event) => {
      event.preventDefault();
      // Handle form submission
      const title = this._shadowRoot.querySelector('#noteTitle').value;
      const content = this._shadowRoot.querySelector('#noteContent').value;
      this.dispatchEvent(
        new CustomEvent('note-added', {
          detail: { title, content },
          bubbles: true,
          composed: true,
        })
      );
      this.close();
    });
  }

  _updateStyle() {
    this._style.textContent = `
      .modal {
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.4);
      }
      .modal-content {
        background-color: #fefefe;
        margin: 5% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
      }
      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      .close:hover,
      .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }
      form {
        display: flex;
        flex-direction: column;
      }
      label {
        margin-top: 10px;
      }
      input, textarea {
        margin-top: 5px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      button {
        margin-top: 15px;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: black;
        color: white;
        cursor: pointer;
      }
      button:hover {
        background-color: #45a049;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="modal" id="noteModal">
        <div class="modal-content">
          <span id="closeModal" class="close">&times;</span>
          <h2>Tambah Catatan Baru</h2>
          <form id="noteForm">
            <label for="noteTitle">Judul:</label>
            <input type="text" id="noteTitle" name="noteTitle" required>
            <label for="noteContent">Konten:</label>
            <textarea id="noteContent" name="noteContent" required></textarea>
            <button type="submit">Simpan</button>
          </form>
      </div>
    `;
  }

  open() {
    this._shadowRoot.querySelector('#noteTitle').value = '';
    this._shadowRoot.querySelector('#noteContent').value = '';
    this._shadowRoot.querySelector('.modal').style.display = 'block';
  }

  close() {
    this._shadowRoot.querySelector('.modal').style.display = 'none';
  }
}

customElements.define('note-modal', NoteModal);
