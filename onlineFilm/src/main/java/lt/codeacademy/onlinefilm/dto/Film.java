package lt.codeacademy.onlinefilm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.onlinefilm.entity.FilmEntity;

import javax.persistence.Column;
import javax.validation.constraints.Size;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Film {
    private UUID id;
    private String filmPic;
    private String filmVideo;
    private String category;
    private String title;
    private String releaseDate;
    private String country;
    @Size(max = 10000)
    private String description;


    public static Film convert(FilmEntity entity) {
        return new Film(entity.getId(),
                entity.getFilmPic(),
                entity.getFilmVideo(),
                entity.getCategory(),
                entity.getTitle(),
                entity.getReleaseDate(),
                entity.getCountry(),
                entity.getDescription());
    }
}
