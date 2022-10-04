package lt.codeacademy.onlinefilm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lt.codeacademy.onlinefilm.entity.FileEntity;

import java.io.InputStream;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class File {
    private UUID id;
    private String name;
    private String mediaType;
    private InputStream inputStream;
    private byte[] bytes;

    public static File convert(FileEntity entity, InputStream inputStream){
        return new File(entity.getId(),
                entity.getName(),
                entity.getMediaType(),
                inputStream,
                entity.getBytes());
    }
}
