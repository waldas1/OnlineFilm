package lt.codeacademy.onlinefilm.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.onlinefilm.dto.Film;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "FILMS")
public class FilmEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    @Column(columnDefinition = "VARCHAR(1000)", updatable = false)
    private String filmPic;
    private String filmVideo;
    private String category;
    private String title;
    private String releaseDate;
    private String country;
    @Column(columnDefinition = "VARCHAR(10000)", updatable = false)
    private String description;

    @OneToMany(mappedBy = "filmEntity", cascade = CascadeType.ALL)
    private Set<CommentsEntity> commentsEntities;

    public FilmEntity(UUID id, String filmPic, String filmVideo, String category, String title, String releaseDate, String country, String description) {
        this.id = id;
        this.filmPic = filmPic;
        this.filmVideo = filmVideo;
        this.category = category;
        this.title = title;
        this.releaseDate = releaseDate;
        this.country = country;
        this.description = description;
    }

    public static FilmEntity convert(Film film) {
        return new FilmEntity(film.getId(),
                film.getFilmPic(),
                film.getFilmVideo(),
                film.getCategory(),
                film.getTitle(),
                film.getReleaseDate(),
                film.getCountry(),
                film.getDescription());
    }
}
