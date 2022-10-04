package lt.codeacademy.onlinefilm.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.onlinefilm.dto.User;
import lt.codeacademy.onlinefilm.dto.Login;
import lt.codeacademy.onlinefilm.exception.data.ExceptionResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lt.codeacademy.onlinefilm.AppPath.LOGIN;

@RestController
@RequestMapping(LOGIN)
@OpenAPIDefinition(tags = {
        @Tag(name = "Login Controller", description = "OnlineFilm login controller")
})
public class LoginController {

    @Operation(tags = "Login Controller", summary = "Login user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment added successfully", content = {@Content(schema = @Schema(implementation = Login.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping
    public Login login(@AuthenticationPrincipal User user) {
        return new Login(user);
    }
}
