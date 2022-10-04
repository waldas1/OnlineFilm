package lt.codeacademy.onlinefilm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.onlinefilm.entity.CommentsEntity;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comments {
    private UUID id;
    private String date;
    @NotBlank
    private String comment;
    private String username;
    private Film film;



    public static Comments convert(CommentsEntity entity) {

        Film film = Film.convert(entity.getFilmEntity());

        return new Comments(entity.getId(),
                entity.getDate(),
                entity.getComment(),
                entity.getUsername(),
                film);
    }
}
