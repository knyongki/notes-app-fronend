class NoteItem extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    id: null,
    title: null,
    body: null,
    archived: false,
  };

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }

  _updateStyle() {
    this._style.textContent = `
    h2 {
      margin: unset;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1.5rem;
    }
    
    p {
      margin: unset;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }

    .card {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      padding: 16px;
      background-color: #ffffff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      cursor: pointer;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  `;
  }

  _noteClicked() {
    this.dispatchEvent(new CustomEvent('note-clicked', { detail: this._note.id, bubbles: true }));
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="card">
        <div class="note-title">
          <h2>${this._note.title}</h2>
        </div>
        <div class="note-body">
          <p>${this._note.body}</p>
        </div>
      </div>
    `;

    // Tambahkan event listener untuk klik pada card
    this._shadowRoot.querySelector('.card').addEventListener('click', () => this._noteClicked());
  }
}

customElements.define('note-item', NoteItem);
