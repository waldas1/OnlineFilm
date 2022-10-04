package lt.codeacademy.onlinefilm.exception;

import java.util.UUID;

public class CommentNotExistException extends RuntimeException{

    private final UUID commentId;

    public CommentNotExistException(UUID commentId) {
        this.commentId = commentId;
    }

    public UUID getCommentId() {
        return commentId;
    }
}
