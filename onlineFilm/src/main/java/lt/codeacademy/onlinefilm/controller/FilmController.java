package lt.codeacademy.onlinefilm.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.onlinefilm.dto.Film;
import lt.codeacademy.onlinefilm.exception.data.ExceptionResponse;
import lt.codeacademy.onlinefilm.service.FilmService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static lt.codeacademy.onlinefilm.AppPath.*;

@RestController
@RequestMapping(FILMS)
@OpenAPIDefinition(tags = {
        @Tag(name = "Film Controller", description = "OnlineFilm film controller")
})
public class FilmController {

    private final FilmService filmService;


    public FilmController(FilmService filmService) {
        this.filmService = filmService;
    }

    @Operation(tags = " Film Controller", summary = "Get all films")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All films returned successfully", content = {@Content(schema = @Schema(implementation = Film.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Film> getFilms() {
        return filmService.getFilms();
    }

    @Operation(tags = " Film Controller", summary = "Add film")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "New film add successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(value = CREATE_FILM, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public void addFilm(@RequestBody Film film) {
        filmService.addFilmOrUpdate(film);
    }

    @Operation(tags = " Film Controller", summary = "Get film")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Film founded successfully", content = {@Content(schema = @Schema(implementation = Film.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = FILM, produces = MediaType.APPLICATION_JSON_VALUE)
    public Film getFilm(@PathVariable(filmId) UUID id) {
        return filmService.getFilm(id);
    }

    @Operation(tags = " Film Controller", summary = "Update film")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Film updated successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PutMapping(value = FILM, consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateFilm(@RequestBody Film film, @PathVariable(filmId) UUID id) {
        film.setId(id);
        filmService.addFilmOrUpdate(film);
    }

    @Operation(tags = " Film Controller", summary = "Delete film")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Film deleted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @DeleteMapping(value = FILM)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFilm(@PathVariable(filmId) UUID id) {
        filmService.deleteFilm(id);
    }

    @Operation(tags = " Film Controller", summary = "Search films by category")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Film found successfully", content = {@Content(schema = @Schema(implementation = Film.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = SEARCH, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Film> searchByTitleOrCategory(@RequestParam String query) {
        return filmService.getFilmsByTitleOrCategory(query);
    }
}
