package lt.codeacademy.onlinefilm.repository;

import lt.codeacademy.onlinefilm.entity.FilmEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;
public interface FilmRepository extends JpaRepository<FilmEntity, UUID> {

    List<FilmEntity> findByTitleLikeOrCategory(String title, String category);

}
