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
        if (!this.cachedMoives) {
            const res = await fetch(`${this._baseUrl}`, {
                method: 'GET',
            })

            const data = await this._handleResponse(res);

            this.cachedMoives = data;
        }
       
        return this.cachedMoives;
    }

    resetCache() {
        this.cachedMoives = null;
    }
}

//создание экземпляра класса MoviesApi
export const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});