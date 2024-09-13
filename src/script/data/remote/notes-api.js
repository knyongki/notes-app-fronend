import Swal from 'sweetalert2';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
  static insertNote = async (title, body) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ title, body }),
      };
      const response = await fetch(`${BASE_URL}/notes`, options);
      const responseJson = await response.json();

      return responseJson.message;
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static getNotes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/notes`);
      const responseJson = await response.json();

      if (responseJson.error) {
        this.showResponseMessage(response.message);
      } else {
        return responseJson;
      }
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static getArchved = async () => {
    try {
      const response = await fetch(`${BASE_URL}/notes/archived`);
      const responseJson = await response.json();

      if (responseJson.error) {
        this.showResponseMessage(response.message);
      } else {
        return responseJson;
      }
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static getSingleNote = async (noteId) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`);
      const responseJson = await response.json();

      if (responseJson.error) {
        this.showResponseMessage(response.message);
      } else {
        return responseJson.data;
      }
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static archiveNote = async (noteId) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();

      if (responseJson.error) {
        this.showResponseMessage(responseJson.message);
      } else {
        console.log(responseJson.message);
        return responseJson.message;
      }
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static unarchiveNote = async (noteId) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseJson = await response.json();

      if (responseJson.error) {
        this.showResponseMessage(responseJson.message);
      } else {
        console.log(responseJson.message);
        return responseJson.message;
      }
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        this.showResponseMessage(responseJson.message);
      } else {
        console.log(responseJson.message);
        return responseJson.message;
      }
    } catch (error) {
      this.showResponseMessage(error);
    }
  };

  static showResponseMessage = (message = 'Check your internet connection') => {
    Swal.fire({
      title: 'The Internet?',
      text: message,
      icon: 'question',
    });
  };
}

export default NotesApi;
