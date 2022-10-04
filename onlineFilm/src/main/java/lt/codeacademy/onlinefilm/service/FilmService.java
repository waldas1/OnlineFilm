package lt.codeacademy.onlinefilm.service;

import lt.codeacademy.onlinefilm.dto.Film;
import lt.codeacademy.onlinefilm.entity.FilmEntity;
import lt.codeacademy.onlinefilm.exception.FilmNotExistException;
import lt.codeacademy.onlinefilm.repository.FilmRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FilmService {

    private final FilmRepository filmRepository;

    public FilmService(FilmRepository filmRepository) {
        this.filmRepository = filmRepository;
    }

    public List<Film> getFilms() {
        return filmRepository.findAll().stream()
                .map(Film::convert)
                .toList();
    }

    public void addFilmOrUpdate(Film film) {
        String replacePath = film.getFilmVideo().replace("watch?v=", "embed/");
        String newPath = replacePath + "?autoplay=1&muted=1";
        film.setFilmVideo(newPath);
        filmRepository.save(FilmEntity.convert(film));
    }

    public Film getFilm(UUID id) {
        return filmRepository.findById(id)
                .map(Film::convert)
                .orElseThrow(() -> new FilmNotExistException(id));
    }

    public void deleteFilm(UUID id) {
        filmRepository.deleteById(id);
    }

    public List<Film> getFilmsByTitleOrCategory(String query) {
        String title = "%" + query + "%";
        return filmRepository.findByTitleLikeOrCategory(title, query)
                .stream()
                .map(Film::convert)
                .toList();
    }
}
