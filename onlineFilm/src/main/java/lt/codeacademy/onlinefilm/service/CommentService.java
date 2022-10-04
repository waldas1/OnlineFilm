package lt.codeacademy.onlinefilm.service;

import lt.codeacademy.onlinefilm.dto.Comments;
import lt.codeacademy.onlinefilm.entity.CommentsEntity;
import lt.codeacademy.onlinefilm.exception.CommentNotExistException;
import lt.codeacademy.onlinefilm.repository.CommentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comments> getComments(UUID id) {
        return commentRepository.getCommentsEntityByFilmEntityId(id)
                .stream()
                .map(Comments::convert)
                .toList();
    }

    public void createNewCommentOrUpdate(Comments comments) {
        comments.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));

        commentRepository.save(CommentsEntity.convert(comments));
    }

    public Comments getComment(UUID id) {
        return commentRepository.findById(id)
                .map(Comments::convert)
                .orElseThrow(() -> new CommentNotExistException(id));
    }

    public void deleteById(UUID id) {
        commentRepository.deleteById(id);
    }
}
