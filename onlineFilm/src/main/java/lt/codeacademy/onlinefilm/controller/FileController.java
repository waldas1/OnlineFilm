package lt.codeacademy.onlinefilm.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.onlinefilm.exception.data.ExceptionResponse;
import lt.codeacademy.onlinefilm.service.FileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static lt.codeacademy.onlinefilm.AppPath.FILES;
import static lt.codeacademy.onlinefilm.AppPath.METADATA;


@RestController
@RequestMapping(FILES)
@OpenAPIDefinition(tags = {
        @Tag(name = "File Controller", description = "OnlineFilm file controller")
})
public class FileController {
    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @Operation(tags = "File Controller", summary = "Save file in file system and metadata in db")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "file saved successfully"),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
    })
    @PostMapping(METADATA)
    public void saveFileMetadataInDb(@RequestParam MultipartFile multipartFile) {
        fileService.saveFileInFileSystemAndMetadataInDb(multipartFile);
    }
}
