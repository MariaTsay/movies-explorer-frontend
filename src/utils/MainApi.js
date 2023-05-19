export class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async getUserInfo() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return this._handleResponse(res);
    }

    async setUserInfo(data) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
        return this._handleResponse(res);
    }

    async getSavedMovies() {
        const res = await fetch(`${this._baseUrl}/saved-movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return this._handleResponse(res);
    }

    async saveMovie(data) {
        const res = await fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nameRU: data.nameRU || '',
                nameEN: data.nameEN || '',
                country: data.country || '',
                director: data.director || '',
                duration: data.duration || '',
                year: data.year || '',
                description: data.description || '',
                image: `https://api.nomoreparties.co${data.image.url}` || '',
                trailerLink: data.trailerLink || '',
                thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}` || '',
                movieId: data.id,
            })
        })
        return this._handleResponse(res);
    }

    async deleteMovie(id) {
        const res = await fetch(`${this._baseUrl}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        })
        return this._handleResponse(res);
    }


}

//создание экземпляра класса MainApi
export const mainApi = new MainApi({
    baseUrl: 'https://api.my-movies-explorer.nomoredomains.monster'
});