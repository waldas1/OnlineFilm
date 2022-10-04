package lt.codeacademy.onlinefilm.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class Login {

    private final String username;
    private final String fullName;
    private final List<String> roles;

    public Login(User user) {
        this.username = user.getUsername();
        this.fullName = user.getFullName();
        this.roles = user.getRoles().stream().map(Role::getName).toList();
    }
}
