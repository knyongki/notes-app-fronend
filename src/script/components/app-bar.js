import { loadHome, loadArchived } from '../../app.js';

class AppBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _isArchivedPage = false;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
        width: 100%;
        color: white;
        background-color: #000;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
      }

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 24px 20px;
      }

      .app-name {
        margin: 0;
        font-size: 1.5rem;
      }

      .archive-button, .home-button {
        background-color: #ff5722;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 0.8rem;
        cursor: pointer;
        border-radius: 5px;
      }

      .archive-button:hover, .home-button:hover {
        background-color: #e64a19;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this._checkPage();
    this.render();
  }

  _checkPage() {
    this._isArchivedPage = window.location.pathname.includes('archived');
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
      <div>
        <h1 class="app-name">Notes App</h1>
        <button class="${
          this._isArchivedPage ? 'home-button' : 'archive-button'
        }" id="toggleButton">
          ${this._isArchivedPage ? 'Home' : 'Archived'}
        </button>
      </div>
    `;

    this._addEventListeners();
  }

  _addEventListeners() {
    const toggleButton = this._shadowRoot.getElementById('toggleButton');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        if (this._isArchivedPage) {
          this._isArchivedPage = false;
          loadHome();
        } else {
          this._isArchivedPage = true;
          loadArchived();
        }
        this.render();
      });
    }
  }
}

customElements.define('app-bar', AppBar);
