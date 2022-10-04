import HTTP from "./index";

const getFilms = () => HTTP.get('/film');
const addFilm = (data) => HTTP.post('/film/create', data);
const getFilm = (filmId) => HTTP.get(`/film/${filmId}`);
const searchFilmByTitleOrCategory = (query) => HTTP.get("/film/search", {params: {query: query}});

export {
    getFilms,
    addFilm,
    getFilm,
    searchFilmByTitleOrCategory
};