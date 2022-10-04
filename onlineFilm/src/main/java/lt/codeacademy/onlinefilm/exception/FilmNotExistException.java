package lt.codeacademy.onlinefilm.exception;

import java.util.UUID;

public class FilmNotExistException extends RuntimeException{

    private final UUID filmId;

    public FilmNotExistException(UUID filmId){
        this.filmId = filmId;
    }

    public UUID getFilmId(){
        return filmId;
    }
}
