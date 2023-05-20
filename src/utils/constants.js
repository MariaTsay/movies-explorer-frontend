const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const regexName = /^[a-zA-Z0-9-а-яА-Я\s]+$/;

const SERVER_ERROR_MSG =
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const NOTHINGFOUND_ERROR_MSG = 'Ничего не найдено';

export {
    regexEmail,
    regexName,
    SERVER_ERROR_MSG,
    NOTHINGFOUND_ERROR_MSG
}