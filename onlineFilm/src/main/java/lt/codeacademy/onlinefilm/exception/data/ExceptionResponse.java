package lt.codeacademy.onlinefilm.exception.data;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
public class ExceptionResponse {
    private final String message;

    private final int status;
    private final long timeStamp;

    public ExceptionResponse(String message, HttpStatus status){
        this.message=message;
        this.status=status.value();
        timeStamp = LocalDateTime.now().atZone(ZoneId.systemDefault()).toEpochSecond();
    }
}
