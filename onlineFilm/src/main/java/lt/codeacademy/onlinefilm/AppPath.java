package lt.codeacademy.onlinefilm;

public interface AppPath {
    String filmId = "filmId";
    String commentId = "commentId";
    String TITLE = "title";
    String CATEGORY = "category";

    //paths
    String FILMS = "/film";
    String CREATE_FILM = "/create";
    String FILM = "/{" + filmId + "}";
    String SEARCH = "/search";
    String SEARCHBYTITLE = SEARCH + "/{" + TITLE + "}";
    String SEARCHBYCATEGORY = SEARCH + "/{" + CATEGORY + "}";
    String COMMENTS = "/comments";
    String COMMENT = "/{" + commentId + "}";
    String REGISTRATION = "/registration";
    String LOGIN = "/login";
    String FILES =  "/files";
    String METADATA = "/metadata";

}
