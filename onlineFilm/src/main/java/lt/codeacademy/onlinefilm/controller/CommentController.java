package lt.codeacademy.onlinefilm.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.onlinefilm.dto.Comments;
import lt.codeacademy.onlinefilm.dto.Film;
import lt.codeacademy.onlinefilm.exception.data.ExceptionResponse;
import lt.codeacademy.onlinefilm.service.CommentService;
import lt.codeacademy.onlinefilm.service.FilmService;
import lt.codeacademy.onlinefilm.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static lt.codeacademy.onlinefilm.AppPath.*;

@RestController
@RequestMapping(COMMENTS)
@OpenAPIDefinition(tags = {
        @Tag(name = "Comment Controller", description = "OnlineFilm comment controller")
})
public class CommentController {

    private final CommentService commentService;
    private final FilmService filmService;
    private final UserService userService;

    public CommentController(CommentService commentService, FilmService filmService, UserService userService) {
        this.commentService = commentService;
        this.filmService = filmService;
        this.userService = userService;
    }

    @Operation(tags = "Comment Controller", summary = "Get all comments")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All comments returned successfully", content = {@Content(schema = @Schema(implementation = Comments.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = FILM, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Comments> getAllComments(@PathVariable(filmId) UUID id) {
        return commentService.getComments(id);
    }

    @Operation(tags = "Comment Controller", summary = "ADD comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment added successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(value = FILM, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void addComment(@RequestBody Comments comments, @PathVariable(filmId) UUID id, @AuthenticationPrincipal String user) {
        Film film = filmService.getFilm(id);
        comments.setFilm(film);
        comments.setDate(LocalDate.now().toString());
        //comments.setUser(user);//take from context holder
        comments.setUsername(user);
        commentService.createNewCommentOrUpdate(comments);
    }

    @Operation(tags = "Comment Controller", summary = "Update comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment updated successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PutMapping(value = COMMENT, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateComment(@RequestBody Comments comments, @PathVariable(commentId) UUID id) {
        comments.setId(id);
        comments.setUsername(commentService.getComment(id).getUsername());
        comments.setFilm(commentService.getComment(id).getFilm());

        commentService.createNewCommentOrUpdate(comments);
    }

    @Operation(tags = "Comment Controller", summary = "Delete comment")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment deleted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @DeleteMapping(value = COMMENT)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteComment(@PathVariable(commentId) UUID id) {
        commentService.deleteById(id);
    }
}
