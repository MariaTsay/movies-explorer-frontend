export class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    async getMovies() {
        const res = await fetch(`${this._baseUrl}`, {
            method: 'GET',
        })
        return this._handleResponse(res);
    }
}

//создание экземпляра класса MoviesApi
export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});