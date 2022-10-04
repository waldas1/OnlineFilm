package lt.codeacademy.onlinefilm.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.onlinefilm.dto.Comments;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "COMMENTS")
public class CommentsEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    private String date;
    @Column(nullable = false)
    private String comment;
    private String username;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "films_id")
    private FilmEntity filmEntity;

    public static CommentsEntity convert(Comments comments) {
        FilmEntity films = FilmEntity.convert(comments.getFilm());

        return new CommentsEntity(comments.getId(),
                comments.getDate(),
                comments.getComment(),
                comments.getUsername(),
                films);
    }
}
