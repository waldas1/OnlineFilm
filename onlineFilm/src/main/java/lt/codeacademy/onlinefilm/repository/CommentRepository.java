package lt.codeacademy.onlinefilm.repository;

import lt.codeacademy.onlinefilm.dto.Comments;
import lt.codeacademy.onlinefilm.entity.CommentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


public interface CommentRepository extends JpaRepository<CommentsEntity, UUID> {

    List<CommentsEntity> getCommentsEntityByFilmEntityId(UUID id);

}
